export interface AppPageSection {
  eyebrow: string;
  title: string;
  body: string;
  screenshot: string;
  screenshotAlt: string;
  format?: 'phone' | 'widget';
  focusY?: string;
}

export interface AppPage {
  slug: string;
  name: string;
  category: string;
  icon: string;
  accent: string;
  accentDark: string;
  eyebrow: string;
  headline: string;
  subhead: string;
  metaDescription?: string;
  appStoreUrl?: string;
  availability?: 'app-store' | 'coming-soon' | 'pilot';
  privacyUrl?: string;
  supportUrl?: string;
  heroScreenshot: string;
  heroScreenshotAlt: string;
  heroFormat?: 'phone' | 'landscape';
  heroFocusY?: string;
  benefits: [string, string, string];
  sections: AppPageSection[];
  trustEyebrow: string;
  trustTitle: string;
  trustBody: string;
  finalEyebrow: string;
  footnote: string;
  faq: Array<{ question: string; answer: string }>;
}

export const appPages: AppPage[] = [
  {
    slug: 'easymode',
    name: 'Easymode',
    category: 'Productivity',
    icon: '/assets/images/apps/EasyMode/icon.webp',
    accent: '#111111',
    accentDark: '#111111',
    eyebrow: 'Make room for what matters',
    headline: 'Feel on top of life again.',
    subhead:
      'Easymode turns the loose ends competing for your attention into a calm, manageable plan—so you can stop carrying everything in your head.',
    metaDescription:
      'Easymode is a calm life-admin assistant that identifies useful next steps and helps you review reminders, calendar events and drafts before anything changes.',
    heroScreenshot: '/assets/images/apps/EasyMode/product/today-review.webp',
    heroScreenshotAlt: 'Easymode Today showing one life-admin item ready for review and approval',
    benefits: ['Less mental clutter', 'A calmer daily rhythm', 'Keep important things in view'],
    sections: [
      {
        eyebrow: 'A calmer start',
        title: 'Know what deserves your attention.',
        body:
          'Instead of carrying an invisible list all day, open Easymode and work through one useful next step at a time. It reviews supported Gmail messages and separates actionable admin from useful updates and low-value noise.',
        screenshot: '/assets/images/apps/EasyMode/product/today-review.webp',
        screenshotAlt: 'Easymode separating an actionable school payment from worth-knowing email updates',
      },
      {
        eyebrow: 'Confidence before action',
        title: 'Stay in control without doing all the work.',
        body:
          'Open a suggestion to see the source evidence, extracted facts, proposed destination, and what Easymode plans to do. Edit, approve, review later, or dismiss it—the AI can be wrong, and the decision remains yours.',
        screenshot: '/assets/images/apps/EasyMode/product/review-detail.webp',
        screenshotAlt: 'Easymode review detail showing source evidence, date, proposed calendar event, and approval controls',
      },
      {
        eyebrow: 'Momentum without the mess',
        title: 'Let the next step land where it belongs.',
        body:
          'Approved outcomes live where they belong: events in Google Calendar, reminders in Apple Reminders, and editable replies as Gmail drafts. Easymode coordinates the next step and links you back to the destination app.',
        screenshot: '/assets/images/apps/EasyMode/product/plan.webp',
        screenshotAlt: 'Easymode Plan showing approved work in Google Calendar and Apple Reminders',
      },
      {
        eyebrow: 'Your pace, your boundaries',
        title: 'Choose how much help feels right.',
        body:
          'Start with a focused daily review, then decide whether you want more support. Google access and Auto-clear are separate choices you control, protected categories remain excluded, and cleared items stay inspectable.',
        screenshot: '/assets/images/apps/EasyMode/product/settings.webp',
        screenshotAlt: 'Easymode Settings showing separate Google connection controls and trust and privacy options',
      },
    ],
    trustEyebrow: 'Designed around review',
    trustTitle: 'AI assists. You remain responsible.',
    trustBody:
      'Easymode processes connected Gmail content and relevant calendar context through its backend and an AI processing service provider to classify messages, extract next steps, and generate draft replies. Calendar events, reminders, Gmail drafts, and other external changes require your review and approval; optional Auto-clear requires its own opt-in.',
    footnote:
      'Easymode is being prepared for a limited external pilot and is not currently offered for general download. AI suggestions may be incomplete or incorrect; review every proposed outcome before approval.',
    finalEyebrow: 'A little less to carry',
    faq: [
      {
        question: 'What Google data does Easymode use?',
        answer:
          'After separate Google authorization, Easymode can process supported Gmail sender, subject, body, identifiers, and relevant Google Calendar context to identify and prepare useful next steps. The Privacy Notice explains the data, processors, retention, and controls in detail.',
      },
      {
        question: 'Does Easymode send email or change my calendar automatically?',
        answer:
          'No. Gmail replies are created as editable drafts and are never sent automatically. Calendar events and reminders require your approval before Easymode attempts to create them in their destination app.',
      },
      {
        question: 'What is Auto-clear?',
        answer:
          'Auto-clear is an optional, separately enabled setting that can mark only high-confidence, low-risk automated messages as read. Security, money, account changes, deadlines, travel, documents, consequential subscription changes, and human correspondence remain protected by deterministic rules.',
      },
    ],
  },
  {
    slug: 'bread-engineer',
    name: 'Bread Engineer',
    category: 'Food & Drink',
    icon: '/assets/images/icons/BreadEngineer.png',
    accent: '#c96d52',
    accentDark: '#6d3425',
    eyebrow: 'A calmer way to bake bread',
    headline: 'Know what to do. Know when to do it.',
    subhead:
      'Bread Engineer turns a full bread recipe into one clear, adjustable schedule—with the current step, finish time and alarm always close at hand.',
    appStoreUrl: 'https://apps.apple.com/gb/app/bread-engineer/id6738381066',
    heroScreenshot: '/assets/images/apps/BreadEngineer/product/step-timer.webp',
    heroScreenshotAlt: 'Bread Engineer showing the current bread step countdown and timing controls',
    heroFocusY: '-390px',
    benefits: ['One clear current step', 'Timing that stays adjustable', 'Alarms that keep working'],
    sections: [
      {
        eyebrow: 'Before the first mix',
        title: 'See the whole bake before you start.',
        body:
          'Review every stage, duration and ingredient before committing to the recipe. The whole process stays visible from first mix to finished loaf.',
        screenshot: '/assets/images/apps/BreadEngineer/product/step-by-step.webp',
        screenshotAlt: 'The step-by-step stages of a recipe in Bread Engineer',
        focusY: '-24px',
      },
      {
        eyebrow: 'A schedule for your kitchen',
        title: 'Choose a start time. See where the bake lands.',
        body:
          'Choose when you want to begin, see the estimated finish immediately and keep step reminders enabled. Bread Engineer recalculates the plan without pretending dough is perfectly predictable.',
        screenshot: '/assets/images/apps/BreadEngineer/product/adjust-timing.webp',
        screenshotAlt: 'Bread Engineer showing an estimated finish time and step reminder control',
        focusY: '-76px',
      },
      {
        eyebrow: 'Everything for the recipe',
        title: 'Keep the ingredients and timing together.',
        body:
          'Start from one recipe plan with the dough schedule, ingredient weights and every step in context. There is no separate spreadsheet or timer list to reconcile.',
        screenshot: '/assets/images/apps/BreadEngineer/product/recipe-plan.webp',
        screenshotAlt: 'Bread Engineer showing a recipe schedule and ingredient weights',
        focusY: '-44px',
      },
      {
        eyebrow: 'A record of every loaf',
        title: 'Keep what you learned.',
        body:
          'Save completed bakes with your notes and photos, then return to them when you want to repeat a result or change one variable next time.',
        screenshot: '/assets/images/apps/BreadEngineer/product/completed-bake.webp',
        screenshotAlt: 'A completed bake saved in Bread Engineer',
        focusY: '-190px',
      },
    ],
    trustEyebrow: 'Private by design',
    trustTitle: 'Your recipes stay on your device.',
    trustBody:
      'Bread Engineer needs no account and includes no advertising or cross-app tracking. Recipe progress, notes, photos and preferences are stored locally on your device.',
    footnote:
      'Fermentation times are estimates. Use your judgement and observe the dough; ingredients, temperature and technique can change the result.',
    finalEyebrow: 'Bake with less guesswork',
    faq: [
      {
        question: 'Does Bread Engineer use artificial intelligence?',
        answer:
          'No. Its fermentation estimates use deterministic equations and the conditions you enter. The result is a planning aid, not a guarantee.',
      },
      {
        question: 'Do I need an account or subscription?',
        answer: 'No. Bread Engineer works without an account and the current release is free to use.',
      },
      {
        question: 'Will a timer continue if I leave the app?',
        answer:
          'Bread Engineer uses iOS alarms and Live Activities for supported timers. Notification and alarm permissions must be enabled for alerts to appear.',
      },
    ],
  },
  {
    slug: 'beloved',
    name: 'BeLoved',
    category: 'Lifestyle',
    icon: '/assets/images/apps/BeLoved/appstore.png',
    accent: '#f02d55',
    accentDark: '#8f1835',
    eyebrow: 'A home for your love story',
    headline: 'Add your person. Keep every moment close.',
    subhead:
      'BeLoved brings anniversaries, milestones, special dates and a beautiful relationship widget together—so the moments that matter never get lost in the calendar.',
    appStoreUrl: 'https://apps.apple.com/gb/app/beloved/id6752829410',
    heroScreenshot: '/assets/images/apps/BeLoved/product/love-story-couple.webp',
    heroScreenshotAlt: 'BeLoved Love Story showing together, engagement and marriage headline counts with an exact-date timeline',
    benefits: ['Anniversary countdowns', 'Relationship milestones', 'Home Screen widgets'],
    sections: [
      {
        eyebrow: 'Your story at a glance',
        title: 'Count every day together.',
        body:
          'Add your person’s photo, then see your time together, engagement and marriage as headline moments—with the exact dates and next celebration close by.',
        screenshot: '/assets/images/apps/BeLoved/product/love-story-couple.webp',
        screenshotAlt: 'BeLoved showing a relationship photo, three headline duration cards and a dated relationship timeline',
      },
      {
        eyebrow: 'More than anniversaries',
        title: 'Celebrate every milestone.',
        body:
          'Follow meaningful day and week milestones automatically, then add the personal milestones that belong to your relationship alone.',
        screenshot: '/assets/images/apps/BeLoved/product/milestones.webp',
        screenshotAlt: 'A list of upcoming relationship milestones in BeLoved',
      },
      {
        eyebrow: 'The dates only you share',
        title: 'Remember what matters to both of you.',
        body:
          'Keep date nights, firsts, traditions and other special dates beside your anniversary, with a clear view of what is coming next.',
        screenshot: '/assets/images/apps/BeLoved/product/special-dates.webp',
        screenshotAlt: 'A special relationship date saved in BeLoved',
      },
      {
        eyebrow: 'Always close',
        title: 'Put your story on the Home Screen.',
        body:
          'Add a BeLoved widget in the size that fits your Home Screen and keep your favourite photo and time together visible throughout the day.',
        screenshot: '/assets/images/apps/BeLoved/product/widget-setup.webp',
        screenshotAlt: 'BeLoved medium and large photo widgets installed on an iPhone Home Screen',
      },
    ],
    trustEyebrow: 'Personal by design',
    trustTitle: 'Your relationship stays on your device.',
    trustBody:
      'Your relationship details and photo are stored on your device and no account is required. Optional anonymous usage analytics are only enabled after you choose to share them.',
    footnote:
      'Some widget styles and customisation options require BeLoved Premium. Subscription terms are shown in the app before purchase.',
    finalEyebrow: 'Celebrate your story',
    faq: [
      {
        question: 'What can I track in BeLoved?',
        answer:
          'Track your relationship start date, anniversary, engagement or marriage dates, automatic milestones, custom milestones and special dates.',
      },
      {
        question: 'Can I add BeLoved to my Home Screen?',
        answer:
          'Yes. BeLoved includes small, medium and large widget layouts that keep your relationship photo and time together visible at a glance.',
      },
      {
        question: 'Do I need an account?',
        answer:
          'No. BeLoved works without an account, and your relationship details and photo remain on your device.',
      },
    ],
  },
  {
    slug: 'gridmetrics',
    name: 'GridMetrics',
    category: 'Utilities',
    icon: '/assets/images/apps/GridMetrics/1024.png',
    accent: '#2876ff',
    accentDark: '#0a3b99',
    eyebrow: 'A clearer energy forecast for Great Britain',
    headline: 'Know when to use electricity.',
    subhead:
      'GridMetrics turns the next 24 hours of grid and tariff data into one practical recommendation: the cleanest time to run everyday appliances, with price considered when available.',
    appStoreUrl: 'https://apps.apple.com/gb/app/gridmetrics/id6752292390',
    heroScreenshot: '/assets/images/apps/GridMetrics/product/forecast-top.webp',
    heroScreenshotAlt: 'GridMetrics recommending the cleanest upcoming time to use electricity',
    benefits: ['One clear recommendation', '24-hour forecast', 'Carbon first, price aware'],
    sections: [
      {
        eyebrow: 'Price-aware with Pro',
        title: 'Find the cheapest clean window.',
        body:
          'Add Octopus Agile or your own time-of-use rates. GridMetrics keeps carbon first, then shows the price, estimated appliance cost, and potential saving for the recommended window.',
        screenshot: '/assets/images/apps/GridMetrics/product/forecast-tariff.webp',
        screenshotAlt: 'A GridMetrics tariff recommendation with unit price, estimated cost, and saving',
      },
      {
        eyebrow: 'No chart-reading required',
        title: 'See the whole day ahead.',
        body:
          'The 24-hour forecast explains why a window is recommended while still giving you the detail to plan around the rest of your day.',
        screenshot: '/assets/images/apps/GridMetrics/product/forecast-detail.webp',
        screenshotAlt: 'The GridMetrics 24-hour carbon intensity forecast',
      },
      {
        eyebrow: 'At a glance',
        title: 'Check without opening the app.',
        body:
          'Put the same saved recommendation on your Home Screen. The widget keeps the cleanest upcoming window, carbon intensity, and comparison visible whenever you need it.',
        screenshot: '/assets/images/apps/GridMetrics/product/widget.webp',
        screenshotAlt: 'GridMetrics Home Screen widget showing the next clean electricity window',
        format: 'widget',
      },
      {
        eyebrow: 'Live context',
        title: 'See what is powering Britain.',
        body:
          'Check the current generation mix and renewable share when you want the bigger picture behind the recommendation.',
        screenshot: '/assets/images/apps/GridMetrics/product/fuel-mix.webp',
        screenshotAlt: 'The live Great Britain electricity generation mix in GridMetrics',
      },
    ],
    trustEyebrow: 'Private by default',
    trustTitle: 'Useful without an energy account.',
    trustBody:
      'The core carbon forecast is provider-neutral and needs no login. Optional price-aware recommendations support public Octopus Agile prices or manual time-of-use rates.',
    footnote:
      'Forecasts are estimates and may change. GridMetrics is an independent app and is not affiliated with NESO or Octopus Energy.',
    finalEyebrow: 'Make the next load count',
    faq: [
      {
        question: 'Do I need to be an Octopus Energy customer?',
        answer:
          'No. The carbon recommendation works without an energy account. Octopus Agile is one optional source for price-aware recommendations.',
      },
      {
        question: 'Does GridMetrics control my appliances?',
        answer:
          'No. It recommends a time window so you can decide when to run them.',
      },
      {
        question: 'What does GridMetrics Pro add?',
        answer:
          'Pro combines supported tariff prices with the carbon forecast and shows the estimated appliance cost and saving for a recommended window.',
      },
    ],
  },
  {
    slug: 'flip-clock-flow',
    name: 'Flip Clock Flow',
    category: 'Productivity',
    icon: '/assets/images/apps/Flip Clock Flow/appstore.png',
    accent: '#ef455f',
    accentDark: '#8f1d35',
    eyebrow: 'Clock. Focus. Back to what matters.',
    headline: 'Make time feel intentional.',
    subhead:
      'A calm flip clock, focus timer, Live Activities and widgets—with optional Screen Time blocking when you want a stronger boundary.',
    metaDescription:
      'Flip Clock Flow combines an elegant flip clock, focus timer, Live Activities, widgets, themes and optional Screen Time distraction blocking.',
    appStoreUrl: 'https://apps.apple.com/gb/app/flip-clock-flow/id6752408901',
    heroScreenshot: '/assets/images/apps/Flip Clock Flow/product/landscape-clock.webp',
    heroScreenshotAlt: 'Flip Clock Flow immersive landscape clock showing hours, minutes and seconds',
    heroFormat: 'landscape',
    benefits: ['A clock worth leaving open', 'Focus sessions in one tap', 'Optional distraction blocking'],
    sections: [
      {
        eyebrow: 'A quieter display',
        title: 'Let the clock take the room.',
        body:
          'Keep the full dashboard close in portrait, or use the immersive landscape clock when you want the interface to fall away. Choose whether seconds are shown and pick the theme that fits your space.',
        screenshot: '/assets/images/apps/Flip Clock Flow/product/dashboard.webp',
        screenshotAlt: 'Flip Clock Flow portrait dashboard with the clock, focus controls and display options',
      },
      {
        eyebrow: 'Focus without friction',
        title: 'Start a session in one tap.',
        body:
          'Choose 25, 45 or 60 minutes—or set your own duration. A Live Activity keeps the remaining time visible while you work, with an optional notification when the session ends.',
        screenshot: '/assets/images/apps/Flip Clock Flow/product/focus.webp',
        screenshotAlt: 'Flip Clock Flow focus session controls and running focus timer',
      },
      {
        eyebrow: 'Time at a glance',
        title: 'Put the clock on your Home Screen.',
        body:
          'Add a clock widget to your Home Screen or Lock Screen. WidgetKit refreshes the display on its system-managed timeline and carries your selected theme beyond the app.',
        screenshot: '/assets/images/apps/Flip Clock Flow/product/widgets.webp',
        screenshotAlt: 'Flip Clock Flow clock widgets on an iPhone Home Screen and Lock Screen',
      },
      {
        eyebrow: 'A stronger boundary with Pro',
        title: 'Block the distractions you choose.',
        body:
          'Lifetime Pro can shield selected apps, categories and websites while a focus session is running. You stay in control of what is blocked, and the restrictions end with the session.',
        screenshot: '/assets/images/apps/Flip Clock Flow/product/lifetime-pro.webp',
        screenshotAlt: 'Flip Clock Flow Lifetime Pro features including distraction blocking and themes',
      },
    ],
    trustEyebrow: 'Private by design',
    trustTitle: 'Your focus choices stay on your device.',
    trustBody:
      'Flip Clock Flow needs no account. Focus history and Screen Time selections stay on your device, and app, category and website identities are never sent to analytics.',
    footnote:
      'Screen Time blocking requires Lifetime Pro, Apple authorization and the apps, categories or websites you choose. The core clock and focus timer remain free.',
    finalEyebrow: 'Give your attention a place to land',
    faq: [
      {
        question: 'Does Flip Clock Flow block other apps?',
        answer:
          'It can. With Lifetime Pro and Apple Screen Time authorization, you can choose apps, categories and websites to shield while a focus session is running.',
      },
      {
        question: 'Do I need a subscription?',
        answer:
          'No. The core flip clock and focus timer are free. Lifetime Pro is a one-time purchase that unlocks distraction blocking, additional themes, presets and focus history.',
      },
      {
        question: 'Are my Screen Time selections private?',
        answer:
          'Yes. Your selections are represented by Apple-provided private tokens, stay on your device and are not included in analytics.',
      },
      {
        question: 'How often do the widgets update?',
        answer:
          'The widgets use Apple WidgetKit timelines. iOS controls the exact refresh schedule, so the clock is designed for glanceable minute-level updates rather than continuous animation.',
      },
    ],
  },
  {
    slug: 'look-at-yourself',
    name: 'LookAtYourself',
    category: 'Productivity',
    icon: '/assets/images/apps/LookAtYourself/icon.webp',
    accent: '#e17a47',
    accentDark: '#9f3016',
    eyebrow: 'Face your scrolling habit',
    headline: 'Make your Screen Time limit harder to ignore.',
    subhead:
      'Choose the app or website taking your time, set a daily limit, and meet a private mirror pause before deciding whether to stop or keep going.',
    metaDescription:
      'LookAtYourself adds a private mirror pause to Screen Time limits, helping you make a deliberate choice when your time is up.',
    availability: 'coming-soon',
    privacyUrl: '/legal/privacy-policy/',
    supportUrl: 'mailto:eric@savoie.app',
    heroScreenshot: '/assets/images/apps/LookAtYourself/product/active-plan.webp',
    heroScreenshotAlt: 'LookAtYourself showing that Instagram is protected by a five-minute daily limit',
    benefits: ['Choose what to protect', 'Set a daily limit', 'Pause before five more minutes'],
    sections: [
      {
        eyebrow: 'A clear boundary',
        title: 'Pick an app. Set a limit.',
        body:
          'Connect Apple Screen Time, choose one app or website in the free version, and set a daily allowance from five minutes to two hours. Setup takes less than a minute.',
        screenshot: '/assets/images/apps/LookAtYourself/product/setup.webp',
        screenshotAlt: 'LookAtYourself setup with Screen Time access, a protected app and a daily limit control',
      },
      {
        eyebrow: 'When time is up',
        title: 'Turn the reflex into a decision.',
        body:
          'Instead of tapping straight through another familiar warning, LookAtYourself opens a short front-camera mirror pause. When the countdown ends, choose to stop scrolling or grant five more minutes.',
        screenshot: '/assets/images/apps/LookAtYourself/product/mirror.webp',
        screenshotAlt: 'The private LookAtYourself mirror pause with a five-second countdown',
      },
      {
        eyebrow: 'Easy to check',
        title: 'See what is protected.',
        body:
          'The active plan keeps the protected selection and its daily limit visible. Test the mirror at any time or change the plan when your habits change.',
        screenshot: '/assets/images/apps/LookAtYourself/product/active-plan.webp',
        screenshotAlt: 'An active LookAtYourself plan protecting Instagram with a five-minute daily limit',
      },
      {
        eyebrow: 'More control with Pro',
        title: 'Protect more. Remove the easy out.',
        body:
          'LookAtYourself Pro supports multiple apps, websites and categories. Strict Mode removes the five-more-minutes choice, and the reflection pause can be set to three, five or ten seconds.',
        screenshot: '/assets/images/apps/LookAtYourself/product/pro-settings.webp',
        screenshotAlt: 'LookAtYourself Pro settings for Strict Mode and reflection pause duration',
      },
    ],
    trustEyebrow: 'A mirror, not a recording',
    trustTitle: 'The camera view stays private.',
    trustBody:
      'The front camera is used only as a live mirror. LookAtYourself does not record, save, collect or transmit photos or video, and Apple keeps the identities of your Screen Time selections private.',
    footnote:
      'Screen Time controls require Apple authorization. LookAtYourself Pro adds multiple selections, Strict Mode and adjustable pause lengths.',
    finalEyebrow: 'A pause with nowhere else to look',
    faq: [
      {
        question: 'Does LookAtYourself record me?',
        answer:
          'No. The camera is used only as a live, private mirror. The app does not record, save, collect or transmit photos or video.',
      },
      {
        question: 'What can I protect for free?',
        answer:
          'The free version protects one app or website, applies a daily limit and includes a five-second mirror pause with the choice to stop or grant five more minutes.',
      },
      {
        question: 'What does LookAtYourself Pro add?',
        answer:
          'Pro supports multiple apps, websites and categories, adds Strict Mode, and lets you choose a three, five or ten-second reflection pause.',
      },
      {
        question: 'Can I make the limit impossible to extend?',
        answer:
          'Yes. Strict Mode, available with Pro, removes LookAtYourself’s five-more-minutes option. Apple still controls the underlying Screen Time system.',
      },
    ],
  },
  {
    slug: 'infinite-ruler',
    name: 'Infinite Ruler',
    category: 'Utilities',
    icon: '/assets/images/icons/infiniteruler.png',
    accent: '#0a84ff',
    accentDark: '#07517f',
    eyebrow: 'A calibrated ruler that keeps going',
    headline: 'Measure from any point.',
    subhead:
      'Infinite Ruler turns your iPhone into a practical ruler with centimetres, fractional inches, movable zero and A–B markers—then continues beyond the length of one screen.',
    appStoreUrl: 'https://apps.apple.com/gb/app/infinite-ruler/id6746876762',
    heroScreenshot: '/assets/images/apps/infiniteruler/product/precision.webp',
    heroScreenshotAlt: 'Infinite Ruler measuring a distance with fractional-inch precision and A–B markers',
    benefits: ['Centimetres or fractional inches', 'Movable zero + A–B markers', 'Measure past one screen'],
    sections: [
      {
        eyebrow: 'Place the zero yourself',
        title: 'Start exactly where you need.',
        body:
          'Move the zero point away from the edge of your phone, then place A and B markers to see a live distance between two real-world points.',
        screenshot: '/assets/images/apps/infiniteruler/product/movable-zero.webp',
        screenshotAlt: 'Infinite Ruler with a movable zero point and A–B measurement markers',
      },
      {
        eyebrow: 'Longer than your phone',
        title: 'Keep measuring past one screen.',
        body:
          'Advance the ruler page by page without losing your place. It is the pocket ruler that does not stop at the bottom of the display.',
        screenshot: '/assets/images/apps/infiniteruler/product/infinite.webp',
        screenshotAlt: 'Infinite Ruler continuing a measurement beyond one phone screen',
      },
      {
        eyebrow: 'Use the comfortable side',
        title: 'Measure from either edge.',
        body:
          'Put the scale and controls on the left or right edge so the ruler fits the object, your hand, and the way you are working.',
        screenshot: '/assets/images/apps/infiniteruler/product/right-edge.webp',
        screenshotAlt: 'Infinite Ruler using the right edge of the iPhone for measurement',
      },
      {
        eyebrow: 'Built for real objects',
        title: 'Fine-tune your phone.',
        body:
          'Use a physical ruler once to calibrate the scale for your device, then keep that adjustment available for future measurements.',
        screenshot: '/assets/images/apps/infiniteruler/product/calibration.webp',
        screenshotAlt: 'Infinite Ruler calibration instructions over the ruler interface',
      },
    ],
    trustEyebrow: 'No account, camera or cloud',
    trustTitle: 'Your measurements stay on your phone.',
    trustBody:
      'Infinite Ruler does not need an account or camera. Measurements and device calibration values remain on your device.',
    footnote:
      'Infinite Ruler is intended for convenient everyday measurements. Calibrate against a physical ruler before work that requires greater accuracy.',
    finalEyebrow: 'Keep a ruler in your pocket',
    faq: [
      {
        question: 'Does Infinite Ruler support centimetres and inches?',
        answer:
          'Yes. Measure in centimetres or choose 1/8, 1/16 or 1/32-inch fractional precision.',
      },
      {
        question: 'How can a ruler be longer than the phone?',
        answer:
          'Use the next and previous controls to continue the scale across multiple ruler pages without resetting the measurement.',
      },
      {
        question: 'How accurate is it?',
        answer:
          'The app uses device-aware dimensions and provides calibration controls. For accuracy-sensitive work, calibrate it against a physical ruler first.',
      },
    ],
  },
];

export function getAppPage(slug: string) {
  return appPages.find((app) => app.slug === slug);
}
