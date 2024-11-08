import Stripe from 'https://esm.sh/stripe@12.18.0?target=deno';

export const getStripeClient = () => {
  return new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
    apiVersion: '2023-10-16',
    httpClient: Stripe.createFetchHttpClient(),
  });
};

export const PRICE_IDS = {
  starter: Deno.env.get('STRIPE_PRICE_ID_STARTER'),
  pro: Deno.env.get('STRIPE_PRICE_ID_PRO'),
} as const; 