import assert from 'node:assert/strict';
import {test} from 'node:test';
import {
  GRIDMETRICS_FIELD_TEST_CAMPAIGN,
  gridMetricsFieldTestAppStoreUrl,
} from '../src/scripts/analyticsCampaign.mjs';

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
