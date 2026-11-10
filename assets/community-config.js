/* Supabase project for accounts, comments, photos and saved progress.
   Paste the two values from Supabase: Project Settings > API (Project URL and the anon public key).
   The anon key is meant to be public; row level security in docs/supabase.sql protects the data.
   While these are empty the site still shows Share buttons, and comments say "coming soon". */
export const SUPABASE_URL = 'https://kygpcruzlgtjksngboww.supabase.co';
export const SUPABASE_ANON_KEY = 'sb_publishable_EvtGR-R1n5IZ4s-LEnKfLw_hT6MAqrB';

/* Analytics for the admin dashboard (account page > Admin > Analytics and SEO).
   - vercelAnalytics: set to true after turning on Web Analytics in the Vercel project
     (Project > Analytics > Enable). Cookieless: no consent banner needed.
   - lookerStudioUrl: the "Embed report" URL of a Looker Studio report built on Google Search
     Console (and Vercel or GA data if you like). It is shown inside the admin dashboard.
   - searchConsoleProperty: the property as written in Google Search Console. */
export const ANALYTICS = {
  vercelAnalytics: false,
  lookerStudioUrl: '',
  searchConsoleProperty: 'https://www.motopedia.org/',
};

/* Brand a bike: how companies pay for their logo on Motopedia bikes.
   Payment is by bank transfer to Transitions Lab after the request is approved.
   Bank details are NOT shown on the public site; the admin dashboard puts them in the
   payment email it prepares. Fill them in when known. Prices: leave null for "on request". */
export const BRAND_PAYMENT = {
  currency: 'EUR',
  bank: { holder: 'Transitions Lab', iban: '', bic: '', bank: '', address: '' },
  packages: [
    { id: 'single', name: 'One bike, one logo', what: 'Your logo on one Motopedia 3D bike for 12 months, with your name in the sponsor list.', price: null },
    { id: 'fleet', name: 'Fleet or school', what: 'Your logo and colours on up to three bikes, plus pictures you can use in your own materials.', price: null },
    { id: 'event', name: 'Event or campaign', what: 'A branded bike for an event, launch or campaign, for the period you need.', price: null },
  ],
};
