import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import OpenAI from 'https://esm.sh/openai@4.20.1';
import { corsHeaders, handleCors } from '../_shared/cors.ts';
import { getSupabaseClient } from '../_shared/supabase.ts';

serve(async (req: Request) => {
  // Log incoming request
  console.log('Incoming request:', {
    method: req.method,
    headers: Object.fromEntries(req.headers.entries()),
  });

  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const body = await req.json();
    console.log('Request body:', body);
    
    const { message, userId, mountain, sessionId } = body;
    
    if (!message || !userId) {
      console.error('Validation failed:', { message, userId });
      throw new Error('Missing required fields: message and userId are required');
    }

    const supabaseClient = getSupabaseClient();
    let currentSessionId = sessionId;

    // Create new session if none exists
    if (!currentSessionId) {
      const { data: session, error: sessionError } = await supabaseClient
        .from('chat_sessions')
        .insert({
          user_id: userId,
          title: message.substring(0, 50) + '...',
          mountain,
          created_at: new Date().toISOString(),
          last_message_at: new Date().toISOString()
        })
        .select()
        .single();

      if (sessionError) throw sessionError;
      currentSessionId = session.id;
    }

    // Store user message
    const { error: userMsgError } = await supabaseClient
      .from('chat_messages')
      .insert({
        session_id: currentSessionId,
        user_id: userId,
        role: 'user',
        content: message,
        created_at: new Date().toISOString()
      });

    if (userMsgError) throw userMsgError;

    // Get OpenAI response
    const openai = new OpenAI({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    });

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
      temperature: 0.7,
      max_tokens: 500,
    });

    const aiResponse = completion.choices[0].message?.content;

    if (!aiResponse) {
      throw new Error('No response from AI');
    }

    // Store AI response
    const { error: aiMsgError } = await supabaseClient
      .from('chat_messages')
      .insert({
        session_id: currentSessionId,
        user_id: userId,
        role: 'assistant',
        content: aiResponse,
        created_at: new Date().toISOString()
      });

    if (aiMsgError) throw aiMsgError;

    // Update session last_message_at
    const { error: updateError } = await supabaseClient
      .from('chat_sessions')
      .update({ last_message_at: new Date().toISOString() })
      .eq('id', currentSessionId);

    if (updateError) throw updateError;

    return new Response(
      JSON.stringify({ 
        message: 'Message processed successfully',
        response: aiResponse,
        sessionId: currentSessionId
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      },
    );
  } catch (error: unknown) {
    console.error('Error in chat function:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    
    // Log the full error details
    console.error('Full error details:', {
      error,
      stack: error instanceof Error ? error.stack : undefined,
    });

    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        details: error instanceof Error ? error.stack : undefined
      }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      },
    );
  }
}); 