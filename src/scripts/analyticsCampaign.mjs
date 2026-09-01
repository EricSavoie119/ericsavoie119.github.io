export const GRIDMETRICS_FIELD_TEST_CAMPAIGN = 'gridmetrics_field_test_2026_08';
export const GRIDMETRICS_FIELD_TEST_LANDING_URL =
  `https://savoie.app/apps/gridmetrics/octopus-agile-cheapest-time-today/?utm_source=x&utm_medium=social&utm_campaign=${GRIDMETRICS_FIELD_TEST_CAMPAIGN}&utm_content=bridge`;

export function gridMetricsFieldTestAppStoreUrl(href, utmCampaign) {
  if (utmCampaign !== GRIDMETRICS_FIELD_TEST_CAMPAIGN) return href;
  const destination = new URL(href);
  if (destination.hostname !== 'apps.apple.com' || !destination.pathname.includes('/id6752292390')) return href;
  destination.searchParams.set('ct', GRIDMETRICS_FIELD_TEST_CAMPAIGN);
  return destination.toString();
}

export const APP_STORE_PROVIDER_TOKEN = '126347138';
const APPLE_CAMPAIGN_TOKEN_LIMIT = 40;

export function appleCampaignToken(value) {
  if (typeof value !== 'string') return undefined;
  const token = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^[_-]+|[_-]+$/g, '')
    .slice(0, APPLE_CAMPAIGN_TOKEN_LIMIT);
  return token || undefined;
}

export function attributedAppStoreUrl(href, utmCampaign) {
  const token = appleCampaignToken(utmCampaign);
  if (!token) return href;

  const url = new URL(href);
  if (url.hostname !== 'apps.apple.com') return href;

  url.searchParams.set('pt', APP_STORE_PROVIDER_TOKEN);
  if (!url.searchParams.has('ct')) url.searchParams.set('ct', token);
  url.searchParams.set('mt', '8');
  return url.toString();
}

export const BLUESKY_APP_CAMPAIGNS = {
  fsim: {
    token: 'fsim_bluesky_2026_08',
    destination: 'https://apps.apple.com/gb/app/fast-simple-invoice-maker/id6752559476',
  },
  infiniteRuler: {
    token: 'infinite_ruler_bluesky_2026_08',
    destination: 'https://apps.apple.com/gb/app/infinite-ruler/id6746876762',
  },
};

export function appStoreCampaignUrl({destination, token}) {
  const url = new URL(destination);
  if (url.hostname !== 'apps.apple.com') throw new Error('Campaign destination must be an App Store URL');
  const campaignToken = appleCampaignToken(token);
  if (!campaignToken) throw new Error('Campaign token must contain letters or numbers');
  url.searchParams.set('pt', APP_STORE_PROVIDER_TOKEN);
  url.searchParams.set('ct', campaignToken);
  url.searchParams.set('mt', '8');
  return url.toString();
}
