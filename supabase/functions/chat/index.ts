import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import OpenAI from 'https://esm.sh/openai@4.20.1';
import { corsHeaders, handleCors } from '../_shared/cors.ts';
import { getSupabaseClient } from '../_shared/supabase.ts';

serve(async (req: Request) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const { message, userId, mountain } = await req.json();
    
    const supabaseClient = getSupabaseClient();
    const openai = new OpenAI({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    });

    // Get response from OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a ski resort assistant providing information about ${mountain || 'ski resorts'}. Provide concise, accurate responses.`
        },
        { 
          role: "user", 
          content: message 
        }
      ],
    });

    const aiResponse = completion.choices[0].message?.content;

    if (!aiResponse) {
      throw new Error('No response from AI');
    }

    // Store in Supabase
    const { error: dbError } = await supabaseClient
      .from('chat_history')
      .insert([{
        user_id: userId,
        user_message: message,
        ai_response: aiResponse,
        mountain,
        created_at: new Date().toISOString(),
      }]);

    if (dbError) throw dbError;

    return new Response(
      JSON.stringify({ 
        message: 'Message processed successfully',
        response: aiResponse,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      },
    );
  }
}); 