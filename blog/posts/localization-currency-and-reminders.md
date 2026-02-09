---
title: "Localization, Currency, and Due Date Reminders for Real Clients"
---

Invoice tools should adapt to the way people already work. In Fast Simple Invoice Maker, that means language support, currency flexibility, and reminder scheduling built into core flows.

## Language support

Invoices can be generated in English or Bahasa Melayu. The app uses a localized string provider tied to the invoice language so document text and date formatting follow the selected locale.

## Currency handling

Currency selection is based on ISO currency data and can default from local device settings. Amount formatting uses the selected currency code, and totals are consistently computed from line items, discount, and tax.

## Reminder scheduling

The notification scheduler is built around due-date lifecycle reminders:

- 3 days before due date
- 1 day before due date
- Due date
- 1, 3, and 7 days overdue

Notifications are only scheduled when all three conditions are true:

- Invoice is unpaid
- Notifications are enabled in app settings
- System notification permission is granted

## Why this is important

These details are not flashy, but they are what make invoicing tools useful in daily business operations. Better localization, cleaner currency handling, and reliable reminders reduce manual follow-up work and help users stay on top of payments.
