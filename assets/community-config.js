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
   The bank details are used in the payment email the admin dashboard prepares; they are not
   shown on any page (this file can still be read by anyone who opens it). Prices: leave null for "on request". */
export const BRAND_PAYMENT = {
  currency: 'EUR',
  // Where sponsors pay: Transitions Lab B.V. (Revolut Business). The admin payment email picks
  // the block that matches the currency of the request.
  accounts: {
    EUR: { label: 'Euro (SEPA, Europe)', lines: [['Account holder', 'Transitions Lab B.V.'], ['IBAN', 'NL55 REVO 8648 3647 87'], ['BIC', 'REVONL22'], ['Bank', 'Revolut Bank UAB, Barbara Strozzilaan 201, 1083 HN Amsterdam, Netherlands']] },
    GBP: { label: 'British pounds (UK transfer)', lines: [['Account holder', 'Transitions Lab B.V.'], ['Account number', '97006484'], ['Sort code', '23-01-63']] },
    USD: { label: 'US dollars (SWIFT, worldwide)', lines: [['Account holder', 'Transitions Lab B.V.'], ['IBAN', 'NL55 REVO 8648 3647 87'], ['BIC / SWIFT', 'REVONL22'], ['Intermediary BIC', 'CHASGB2L'], ['Bank', 'Revolut Bank UAB, Barbara Strozzilaan 201, 1083 HN Amsterdam, Netherlands']] },
  },
  holderAddress: 'Stieltjesweg, 2628 CK Delft, Netherlands',
  bank: { holder: 'Transitions Lab B.V.', iban: 'NL55 REVO 8648 3647 87', bic: 'REVONL22', bank: 'Revolut Bank UAB', address: '' },
  packages: [
    { id: 'single', name: 'One bike, one logo', what: 'Your logo on one Motopedia 3D bike for 12 months, with your name in the sponsor list.', price: null },
    { id: 'fleet', name: 'Fleet or school', what: 'Your logo and colours on up to three bikes, plus pictures you can use in your own materials.', price: null },
    { id: 'event', name: 'Event or campaign', what: 'A branded bike for an event, launch or campaign, for the period you need.', price: null },
  ],
};
