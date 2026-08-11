export const gridMetricsOctopusExperiment = {
  id: 'gridmetrics_octopus_2026_08',
  campaignToken: 'gridmetrics_octopus_2026_08',
  appStoreBaseUrl: 'https://apps.apple.com/gb/app/gridmetrics/id6752292390',
  providerToken: '126347138',
} as const;

export function appStoreCampaignUrl(experiment: typeof gridMetricsOctopusExperiment) {
  if (!experiment.providerToken) return experiment.appStoreBaseUrl;
  const url = new URL(experiment.appStoreBaseUrl);
  url.searchParams.set('pt', experiment.providerToken);
  url.searchParams.set('ct', experiment.campaignToken);
  url.searchParams.set('mt', '8');
  return url.toString();
}
