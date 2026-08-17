export const GRIDMETRICS_FIELD_TEST_CAMPAIGN = 'gridmetrics_field_test_2026_08';

export function gridMetricsFieldTestAppStoreUrl(href, utmCampaign) {
  if (utmCampaign !== GRIDMETRICS_FIELD_TEST_CAMPAIGN) return href;
  const destination = new URL(href);
  if (destination.hostname !== 'apps.apple.com' || !destination.pathname.includes('/id6752292390')) return href;
  destination.searchParams.set('ct', GRIDMETRICS_FIELD_TEST_CAMPAIGN);
  return destination.toString();
}
