import posthog from 'posthog-js';

const projectToken = 'phc_AEHHm2KQ8upioFfjV9BoVVYFkCFcSKkfNmNpAijPSUHE';
const body = document.body;
const pageType = body.dataset.analyticsPageType ?? 'website';
const pageApp = body.dataset.analyticsApp;

posthog.init(projectToken, {
  api_host: 'https://eu.i.posthog.com',
  ui_host: 'https://eu.posthog.com',
  defaults: '2026-05-30',
  person_profiles: 'identified_only',
  cookieless_mode: 'always',
  persistence: 'memory',
  autocapture: false,
  capture_pageview: false,
  capture_pageleave: true,
  capture_exceptions: false,
  capture_heatmaps: false,
  disable_session_recording: true,
  debug: import.meta.env.DEV,
});

posthog.capture('$pageview', {
  page_type: pageType,
  ...(pageApp ? { app: pageApp } : {}),
});

const captureInteraction = (target: HTMLElement) => {
  const eventName = target.dataset.analyticsEvent
    ?? (target.dataset.appStoreCta ? 'app_store_clicked' : undefined);

  if (!eventName) return;

  const link = target instanceof HTMLAnchorElement ? target : target.closest<HTMLAnchorElement>('a');

  posthog.capture(
    eventName,
    {
      page_type: pageType,
      app: target.dataset.analyticsApp ?? pageApp,
      placement: target.dataset.analyticsPlacement ?? target.dataset.appStoreCta,
      destination: target.dataset.analyticsDestination
        ?? (link ? new URL(link.href, window.location.href).hostname : undefined),
      value: target instanceof HTMLSelectElement ? target.value : undefined,
    },
    { transport: 'sendBeacon', send_instantly: true },
  );
};

document.addEventListener('click', (event) => {
  const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
    '[data-analytics-event], [data-app-store-cta]',
  );

  if (target) captureInteraction(target);
});

document.addEventListener('change', (event) => {
  const target = event.target;
  if (target instanceof HTMLElement && target.matches('[data-analytics-event]')) {
    captureInteraction(target);
  }
});

declare global {
  interface Window {
    posthog: typeof posthog;
  }
}

window.posthog = posthog;
