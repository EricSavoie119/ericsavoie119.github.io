import assert from 'node:assert/strict';
import {test} from 'node:test';
import {
  appleCampaignToken,
  appStoreCampaignUrl,
  attributedAppStoreUrl,
  BLUESKY_APP_CAMPAIGNS,
  GRIDMETRICS_FIELD_TEST_CAMPAIGN,
  GRIDMETRICS_FIELD_TEST_LANDING_URL,
  gridMetricsFieldTestAppStoreUrl,
} from '../src/scripts/analyticsCampaign.mjs';

test('landing-page campaigns continue into App Store attribution', () => {
  const destination = new URL(attributedAppStoreUrl(
    'https://apps.apple.com/gb/app/beloved/id6752829410',
    'Indie App Catalog / BeLoved current',
  ));
  assert.equal(destination.searchParams.get('pt'), '126347138');
  assert.equal(destination.searchParams.get('ct'), 'indie_app_catalog_beloved_current');
  assert.equal(destination.searchParams.get('mt'), '8');
});

test('campaign attribution leaves unrelated destinations and existing campaign tokens alone', () => {
  const website = 'https://savoie.app/apps/beloved/?utm_campaign=directory';
  assert.equal(attributedAppStoreUrl(website, 'directory'), website);

  const existing = new URL(attributedAppStoreUrl(
    'https://apps.apple.com/app/id6752829410?ct=approved_exact_token',
    'different inbound campaign',
  ));
  assert.equal(existing.searchParams.get('ct'), 'approved_exact_token');
  assert.equal(existing.searchParams.get('pt'), '126347138');
});

test('Apple campaign tokens are deterministic and bounded', () => {
  assert.equal(appleCampaignToken('  Threads: Bread Engineer launch!  '), 'threads_bread_engineer_launch');
  assert.equal(appleCampaignToken('x'.repeat(80))?.length, 40);
  assert.equal(appleCampaignToken(' -- '), undefined);
});

test('Bluesky app campaigns use isolated Apple campaign tokens', () => {
  const fsim = new URL(appStoreCampaignUrl(BLUESKY_APP_CAMPAIGNS.fsim));
  const ruler = new URL(appStoreCampaignUrl(BLUESKY_APP_CAMPAIGNS.infiniteRuler));
  assert.equal(fsim.pathname, '/gb/app/fast-simple-invoice-maker/id6752559476');
  assert.equal(fsim.searchParams.get('ct'), 'fsim_bluesky_2026_08');
  assert.equal(ruler.pathname, '/gb/app/infinite-ruler/id6746876762');
  assert.equal(ruler.searchParams.get('ct'), 'infinite_ruler_bluesky_2026_08');
  for (const destination of [fsim, ruler]) {
    assert.equal(destination.searchParams.get('pt'), '126347138');
    assert.equal(destination.searchParams.get('mt'), '8');
  }
});

test('short-link destination preserves the field-test attribution contract', () => {
  const destination = new URL(GRIDMETRICS_FIELD_TEST_LANDING_URL);
  assert.equal(destination.origin, 'https://savoie.app');
  assert.equal(destination.pathname, '/apps/gridmetrics/octopus-agile-cheapest-time-today/');
  assert.equal(destination.searchParams.get('utm_source'), 'x');
  assert.equal(destination.searchParams.get('utm_medium'), 'social');
  assert.equal(destination.searchParams.get('utm_campaign'), GRIDMETRICS_FIELD_TEST_CAMPAIGN);
  assert.equal(destination.searchParams.get('utm_content'), 'bridge');
});

test('field-test traffic receives a matching Apple campaign token', () => {
  const source = 'https://apps.apple.com/gb/app/gridmetrics/id6752292390?pt=126347138&ct=gridmetrics_octopus_2026_08&mt=8';
  const result = new URL(gridMetricsFieldTestAppStoreUrl(source, GRIDMETRICS_FIELD_TEST_CAMPAIGN));
  assert.equal(result.searchParams.get('ct'), GRIDMETRICS_FIELD_TEST_CAMPAIGN);
  assert.equal(result.searchParams.get('pt'), '126347138');
  assert.equal(result.searchParams.get('mt'), '8');
});

test('unrelated campaigns and apps are unchanged', () => {
  const gridMetrics = 'https://apps.apple.com/gb/app/gridmetrics/id6752292390?ct=monthly';
  const otherApp = 'https://apps.apple.com/gb/app/example/id123456789';
  assert.equal(gridMetricsFieldTestAppStoreUrl(gridMetrics, 'another_campaign'), gridMetrics);
  assert.equal(gridMetricsFieldTestAppStoreUrl(otherApp, GRIDMETRICS_FIELD_TEST_CAMPAIGN), otherApp);
});
