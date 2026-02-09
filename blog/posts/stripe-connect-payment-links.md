---
title: "Stripe Connect Payment Links: From Invoice to Payment Status"
---

One major focus area for Fast Simple Invoice Maker is reducing the gap between sending an invoice and getting paid.

Today, the app supports Stripe Connect onboarding and payment link generation directly from the invoice PDF screen.

## How the flow works now

- If Stripe is not connected, users can start onboarding from inside the app.
- Once connected, users can generate a Stripe Checkout payment link for a specific invoice amount and currency.
- The link can be copied, shared, or opened in the browser.

The backend is a Cloudflare Worker that handles onboarding, checkout session creation, and payment status endpoints.

## Why Stripe Connect

The implementation is built around connected accounts so payments go to the creator account instead of into a pooled platform balance. That keeps the payout model clean for independent users.

## Paid status checks

When an invoice is opened in the PDF host screen, the app can check payment status and update invoice state when it is paid. This gives users a practical bridge between invoicing and payment tracking without requiring a separate admin panel.

## Roadmap context

The current implementation focuses on secure link generation and status checks. The broader payments spec also outlines future additions like richer paid-state syncing and deeper payment UI on invoice documents.
