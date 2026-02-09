---
title: "Inside the PDF Engine: How Invoices and Receipts Are Rendered"
---

PDF output quality is the product for an invoice app. If the PDF is unreliable, the app is unreliable.

In Fast Simple Invoice Maker, invoice and receipt documents are rendered from SwiftUI views, then converted into PDF data for sharing.

## Rendering approach

The app uses a two-step approach:

1. Try vector PDF rendering first on modern iOS versions.
2. Fall back to a UIKit layer-render pipeline if needed.

That fallback is important because edge cases happen, and users still need a working PDF every time.

## What is included in the document

The generated PDF supports:

- Business and client details
- Itemized rows with quantity, unit price, and total
- Subtotal, discount, tax, and grand total
- Optional notes
- Signature and logo when provided
- Theme-aware styling

There is also a receipt view for paid invoices so users can produce proof-of-payment documents without switching tools.

## Why this architecture helps

A dedicated host view handles rendering and re-rendering when invoice state changes. That means edits, paid-state updates, and watermark preferences can be reflected in fresh output without a brittle manual export flow.

For users, the benefit is simple: fewer failed exports and cleaner documents.
