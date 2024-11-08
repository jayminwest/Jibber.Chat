import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { corsHeaders, handleCors } from '../_shared/cors.ts';
import { getStripeClient } from '../_shared/stripe.ts';
import { getSupabaseClient } from '../_shared/supabase.ts';

serve(async (req: Request) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const { sessionId } = await req.json();
    const stripe = getStripeClient();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session?.metadata?.userId || !session?.metadata?.plan) {
      throw new Error('Invalid session data');
    }

    const supabaseClient = getSupabaseClient();
    const { error: updateError } = await supabaseClient
      .from('profiles')
      .update({
        subscription_status: session.metadata.plan,
        updated_at: new Date().toISOString(),
      })
      .eq('id', session.metadata.userId);

    if (updateError) throw updateError;

    return new Response(
      JSON.stringify({ success: true }),
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