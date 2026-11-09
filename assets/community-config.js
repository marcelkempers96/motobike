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
