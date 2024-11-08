import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { corsHeaders, handleCors } from '../_shared/cors.ts';
import { getStripeClient, PRICE_IDS } from '../_shared/stripe.ts';

serve(async (req: Request) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    let body;
    try {
      body = await req.json();
    } catch (e) {
      throw new Error('Invalid request body');
    }

    const { plan, userId, email, returnUrl } = body;

    if (!plan || !userId || !email) {
      throw new Error('Missing required fields: plan, userId, and email are required');
    }

    const priceId = PRICE_IDS[plan as keyof typeof PRICE_IDS];
    if (!priceId) {
      throw new Error(`Invalid plan selected: ${plan}`);
    }

    console.log('Creating checkout session with:', { plan, priceId, userId, email });

    const stripe = getStripeClient();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${returnUrl || 'http://localhost:5173/payment/success'}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${new URL(returnUrl || 'http://localhost:5173').origin}/#pricing`,
      metadata: {
        userId,
        plan,
      },
      customer_email: email,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
    });

    console.log('Checkout session created:', session.id);

    return new Response(
      JSON.stringify({ url: session.url }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json'
        },
        status: 200,
      },
    );
  } catch (error) {
    console.error('Error creating checkout session:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        details: error instanceof Error ? error.stack : undefined
      }),
      { 
        status: 400, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json'
        } 
      },
    );
  }
}); 