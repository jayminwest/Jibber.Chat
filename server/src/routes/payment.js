const express = require('express');
const router = express.Router();
const stripe = require('../config/stripe');
const supabase = require('../config/supabase');

// Constants for Stripe product prices
const PRICE_IDS = {
  pro: process.env.STRIPE_PRICE_ID_PRO,
  premium: process.env.STRIPE_PRICE_ID_PREMIUM
};

// Create checkout session
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { plan, userId } = req.body;

    if (!PRICE_IDS[plan]) {
      throw new Error('Invalid plan selected');
    }

    // Get user data from Supabase
    const { data: userData, error: userError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (userError) throw userError;

    // Create or get Stripe customer
    let customerId = userData.stripe_customer_id;
    
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: userData.email,
        metadata: {
          supabase_user_id: userId
        }
      });
      customerId = customer.id;

      // Update user with Stripe customer ID
      await supabase
        .from('profiles')
        .update({ stripe_customer_id: customerId })
        .eq('id', userId);
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: PRICE_IDS[plan],
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.CLIENT_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/pricing`,
      metadata: {
        userId,
        plan
      }
    });

    return res.status(200).json({
      sessionId: session.id,
      url: session.url
    });
  } catch (error) {
    console.error('Checkout session error:', error);
    return res.status(400).json({
      error: error.message
    });
  }
});

// Handle webhook events
router.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        await handleCheckoutSuccess(session);
        break;
      }
      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        await handleSubscriptionUpdate(subscription);
        break;
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        await handleSubscriptionCancellation(subscription);
        break;
      }
    }

    return res.json({ received: true });
  } catch (error) {
    console.error('Webhook handling error:', error);
    return res.status(400).json({ error: error.message });
  }
});

// Helper functions for webhook handlers
async function handleCheckoutSuccess(session) {
  const { userId, plan } = session.metadata;

  const { error } = await supabase
    .from('profiles')
    .update({ 
      subscription_status: plan,
      stripe_customer_id: session.customer,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId);

  if (error) throw error;
}

async function handleSubscriptionUpdate(subscription) {
  const { data: profile, error: fetchError } = await supabase
    .from('profiles')
    .select('id')
    .eq('stripe_customer_id', subscription.customer)
    .single();

  if (fetchError) throw fetchError;

  const { error: updateError } = await supabase
    .from('profiles')
    .update({ 
      subscription_status: subscription.status === 'active' ? 'pro' : 'free',
      updated_at: new Date().toISOString()
    })
    .eq('id', profile.id);

  if (updateError) throw updateError;
}

async function handleSubscriptionCancellation(subscription) {
  const { data: profile, error: fetchError } = await supabase
    .from('profiles')
    .select('id')
    .eq('stripe_customer_id', subscription.customer)
    .single();

  if (fetchError) throw fetchError;

  const { error: updateError } = await supabase
    .from('profiles')
    .update({ 
      subscription_status: 'free',
      updated_at: new Date().toISOString()
    })
    .eq('id', profile.id);

  if (updateError) throw updateError;
}

module.exports = router;
