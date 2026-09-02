export interface GuideSection {
  title: string;
  body: string[];
  steps?: string[];
  note?: string;
  noteLabel?: string;
}

export interface SearchGuide {
  slug: string;
  appSlug: string;
  appName: string;
  appIcon: string;
  appStoreUrl?: string;
  socialImage: string;
  accent: string;
  eyebrow: string;
  title: string;
  description: string;
  introduction: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  sections: GuideSection[];
  sources?: Array<{ label: string; url: string }>;
  faq: Array<{ question: string; answer: string }>;
  relatedGuideSlugs: string[];
}

export const guides: SearchGuide[] = [
  {
    slug: 'stop-ignoring-screen-time-limits',
    appSlug: 'look-at-yourself',
    appName: 'LookAtYourself',
    appIcon: '/assets/images/apps/LookAtYourself/icon.webp',
    appStoreUrl: 'https://apps.apple.com/app/id6804757024',
    socialImage: '/assets/images/thumbs/look-at-yourself.webp',
    accent: '#e17a47',
    eyebrow: 'Screen Time guide',
    title: 'How to stop automatically ignoring Screen Time limits',
    description:
      'A practical way to make iPhone Screen Time limits more deliberate, reduce reflexive extensions and choose a boundary you can actually follow.',
    introduction:
      'A Screen Time warning only helps if it interrupts the habit. If dismissing it has become automatic, the answer is not necessarily a harsher number—it is a boundary that makes you notice the decision.',
    publishedAt: '2026-09-01',
    updatedAt: '2026-09-01',
    readingTime: '5 min read',
    sections: [
      {
        title: 'Start with the app you open without thinking',
        body: [
          'Do not begin by restricting everything. Open Settings → Screen Time → See All App & Website Activity and look for the app that most often turns a quick check into a long session.',
          'Choose one target. A narrow experiment makes it easier to tell whether the limit is helping and avoids turning your phone into a wall of warnings.',
        ],
      },
      {
        title: 'Set a limit that creates a real choice',
        body: [
          'Pick a daily allowance that is lower than your usual use but still realistic. If you normally spend an hour in an app, a five-minute limit may become so easy to reject that it teaches you to ignore the warning.',
        ],
        steps: [
          'Open Settings and tap Screen Time.',
          'Tap App Limits, then Add Limit.',
          'Choose the app or category you want to limit.',
          'Set the daily time and turn on Block at End of Limit if that option is available to you.',
        ],
      },
      {
        title: 'Add friction at the moment the limit appears',
        body: [
          'The important moment is not when you configure the limit. It is when the warning appears and your thumb is already looking for “Ignore Limit.” Put the phone down, name what you intended to do next, and wait a few seconds before choosing.',
          'LookAtYourself is built around this moment. It protects a chosen app or website and presents a short, private front-camera mirror pause when the allowance is used. After the pause, you choose to stop or grant five more minutes.',
        ],
        noteLabel: 'Privacy note',
        note: 'The camera is a live mirror only. LookAtYourself does not record, save, collect or transmit photos or video.',
      },
      {
        title: 'Review the boundary after a week',
        body: [
          'A useful limit changes behaviour without becoming background noise. After seven days, check whether you are opening the app less often, stopping sooner, or simply extending the limit every day.',
          'If you always extend it, adjust the allowance or make the decision harder. LookAtYourself Pro includes Strict Mode, which removes its five-more-minutes option, while Apple still controls the underlying Screen Time system.',
        ],
      },
    ],
    faq: [
      {
        question: 'Why is it so easy to ignore an iPhone Screen Time limit?',
        answer:
          'A repeated warning can become part of the routine. If dismissing it requires almost no thought, the alert may stop interrupting the behaviour it was meant to change.',
      },
      {
        question: 'Should I put limits on every distracting app?',
        answer:
          'Start with one app or category. A focused limit is easier to evaluate and less likely to create warning fatigue.',
      },
      {
        question: 'Does LookAtYourself replace Apple Screen Time?',
        answer:
          'No. It uses Apple’s Screen Time controls and adds a private reflection pause at the point when your chosen limit is reached.',
      },
    ],
    relatedGuideSlugs: ['make-screen-time-limits-harder-to-bypass'],
  },
  {
    slug: 'make-screen-time-limits-harder-to-bypass',
    appSlug: 'look-at-yourself',
    appName: 'LookAtYourself',
    appIcon: '/assets/images/apps/LookAtYourself/icon.webp',
    appStoreUrl: 'https://apps.apple.com/app/id6804757024',
    socialImage: '/assets/images/thumbs/look-at-yourself.webp',
    accent: '#e17a47',
    eyebrow: 'Screen Time guide',
    title: 'How to make Screen Time limits harder to bypass',
    description:
      'Configure a clearer iPhone app limit, reduce easy extensions and choose when a stricter boundary makes sense.',
    introduction:
      'The best boundary is the one you will respect at the exact moment you want to break it. These steps make that moment clearer without pretending any setting can make the decision for you.',
    publishedAt: '2026-09-01',
    updatedAt: '2026-09-01',
    readingTime: '4 min read',
    sections: [
      {
        title: 'Use Apple’s end-of-limit block',
        body: [
          'When creating or editing an App Limit, enable Block at End of Limit where available. This changes the end of the allowance from a passive notification into an actual Screen Time shield.',
        ],
        steps: [
          'Open Settings → Screen Time → App Limits.',
          'Choose an existing limit or tap Add Limit.',
          'Set the schedule you want.',
          'Enable Block at End of Limit, then save the limit.',
        ],
      },
      {
        title: 'Separate the limit from your reflex',
        body: [
          'A passcode can add friction, but the boundary still works best when it is connected to a clear intention: “I stop after 30 minutes,” not simply “my phone displays a warning.”',
          'If you routinely extend the limit, write down what you are choosing the extra time for. A specific reason is easier to evaluate than an automatic tap.',
        ],
      },
      {
        title: 'Use a visible pause before extra time',
        body: [
          'LookAtYourself adds a three, five or ten-second mirror pause before its decision screen. The free version allows one app or website and offers five more minutes after the pause.',
          'With Pro, Strict Mode removes that extra-time choice inside LookAtYourself. This is useful when the option itself has become the habit you are trying to interrupt.',
        ],
      },
      {
        title: 'Keep an escape route for genuinely important use',
        body: [
          'Do not block apps you may need for safety, travel, authentication or urgent communication without considering how you will regain access. A strong boundary should reduce distraction, not create a new problem.',
        ],
      },
    ],
    faq: [
      {
        question: 'Can Screen Time limits be made completely impossible to bypass?',
        answer:
          'No personal device setting is a substitute for access control managed by someone else. You can add meaningful friction, but you should understand the recovery and override options before relying on it.',
      },
      {
        question: 'What does Strict Mode do in LookAtYourself?',
        answer:
          'Strict Mode removes LookAtYourself’s option to grant five more minutes after the mirror pause. It does not change Apple’s ownership of the underlying Screen Time system.',
      },
    ],
    relatedGuideSlugs: ['stop-ignoring-screen-time-limits'],
  },
  {
    slug: 'focus-timer-live-activity',
    appSlug: 'flip-clock-flow',
    appName: 'Flip Clock Flow',
    appIcon: '/assets/images/apps/Flip Clock Flow/appstore.png',
    socialImage: '/assets/images/apps/Flip Clock Flow/product/landscape-clock.webp',
    appStoreUrl: 'https://apps.apple.com/gb/app/flip-clock-flow/id6752408901',
    accent: '#ef455f',
    eyebrow: 'Focus timer guide',
    title: 'How to use a focus timer with a Live Activity',
    description:
      'Start a focused work session on iPhone and keep the remaining time visible in a Live Activity without repeatedly reopening the timer.',
    introduction:
      'A focus timer is most useful when it stays visible without becoming another app you keep checking. A Live Activity puts the remaining time on the Lock Screen and supported system surfaces while the session runs.',
    publishedAt: '2026-09-01',
    updatedAt: '2026-09-01',
    readingTime: '4 min read',
    sections: [
      {
        title: 'Choose one concrete outcome',
        body: [
          'Before starting the clock, write down what “done” means for this session. “Draft the introduction” gives the timer a job; “work on the article” leaves room for drift.',
        ],
      },
      {
        title: 'Start the timer in Flip Clock Flow',
        body: [
          'Flip Clock Flow includes quick 25, 45 and 60-minute sessions as well as a custom duration. Choose the shortest block that gives you enough room to make visible progress.',
        ],
        steps: [
          'Open Flip Clock Flow and find the focus controls.',
          'Choose 25, 45 or 60 minutes, or set a custom duration.',
          'Start the session and allow Live Activities when iOS asks.',
          'Lock the phone or return to your work. The remaining time stays visible without reopening the app.',
        ],
      },
      {
        title: 'Let the Live Activity replace checking',
        body: [
          'The point is glanceability. Check the remaining time from the Lock Screen or supported system surface, then return to the task instead of opening the full app and inviting another interaction.',
          'You can also enable the session-ending notification if you want an explicit finish signal.',
        ],
      },
      {
        title: 'End with a deliberate reset',
        body: [
          'When the timer ends, take a short break away from the screen. Then either start another defined session or stop. Avoid turning the end notification into an automatic restart button.',
        ],
      },
    ],
    faq: [
      {
        question: 'What is an iPhone Live Activity?',
        answer:
          'A Live Activity is an iOS surface for ongoing information, such as a running timer, that can remain visible on the Lock Screen and other supported areas.',
      },
      {
        question: 'Does the focus timer keep running if I leave Flip Clock Flow?',
        answer:
          'Yes. The session continues, and its Live Activity can keep the remaining time visible while you use another app or lock the phone.',
      },
    ],
    relatedGuideSlugs: ['block-distracting-apps-during-focus'],
  },
  {
    slug: 'block-distracting-apps-during-focus',
    appSlug: 'flip-clock-flow',
    appName: 'Flip Clock Flow',
    appIcon: '/assets/images/apps/Flip Clock Flow/appstore.png',
    socialImage: '/assets/images/apps/Flip Clock Flow/product/landscape-clock.webp',
    appStoreUrl: 'https://apps.apple.com/gb/app/flip-clock-flow/id6752408901',
    accent: '#ef455f',
    eyebrow: 'Focus guide',
    title: 'How to block distracting apps during a focus session',
    description:
      'Choose distracting apps and websites to shield temporarily while an iPhone focus timer is running, without blocking more than you need.',
    introduction:
      'A temporary block works best when it protects one defined work period and then gets out of the way. The aim is to remove the most tempting detours, not make the whole phone unusable.',
    publishedAt: '2026-09-01',
    updatedAt: '2026-09-01',
    readingTime: '5 min read',
    sections: [
      {
        title: 'Decide what the session needs',
        body: [
          'List the apps you genuinely need for the task, then identify the one or two places where you tend to drift. Keep communication, authentication, travel and safety tools available when the session may depend on them.',
        ],
      },
      {
        title: 'Choose your blocked selections',
        body: [
          'Flip Clock Flow Lifetime Pro can use Apple Screen Time authorization to shield selected apps, categories and websites while a focus session runs.',
        ],
        steps: [
          'Open Flip Clock Flow and grant Screen Time access when prompted.',
          'Choose the apps, categories or websites you want to shield.',
          'Set a 25, 45 or 60-minute focus session, or choose a custom duration.',
          'Start the session. The selected distractions remain shielded until it ends.',
        ],
      },
      {
        title: 'Keep the block tied to the timer',
        body: [
          'A session-based block has a clear beginning and end. That makes it easier to commit to than an indefinite restriction and avoids the temptation to disable a permanent rule simply because you need the app later.',
          'The Live Activity keeps the finish time visible, so you know when normal access returns.',
        ],
      },
      {
        title: 'Adjust based on where you actually drifted',
        body: [
          'After the session, ask whether the block removed a real distraction. If you simply moved to another app, update the selection next time. If the phone was not the problem, make the task smaller or clearer instead of adding more restrictions.',
        ],
      },
    ],
    faq: [
      {
        question: 'Does Flip Clock Flow block apps all day?',
        answer:
          'No. The selected apps, categories and websites are shielded while the focus session is running, and the restrictions end with the session.',
      },
      {
        question: 'Can Flip Clock Flow see which apps I select?',
        answer:
          'Apple represents Screen Time selections with private tokens. Flip Clock Flow keeps those choices on your device and does not send their identities to analytics.',
      },
      {
        question: 'Is distraction blocking included for free?',
        answer:
          'The core clock and focus timer are free. Screen Time distraction blocking is included with the one-time Lifetime Pro purchase.',
      },
    ],
    relatedGuideSlugs: ['focus-timer-live-activity'],
  },
  {
    slug: 'plan-bread-baking-schedule',
    appSlug: 'bread-engineer',
    appName: 'Bread Engineer',
    appIcon: '/assets/images/icons/BreadEngineer.png',
    appStoreUrl: 'https://apps.apple.com/gb/app/bread-engineer/id6738381066',
    socialImage: '/assets/images/thumbs/bread-engineer.webp',
    accent: '#c96d52',
    eyebrow: 'Bread schedule guide',
    title: 'How to plan a bread baking schedule',
    description:
      'Work backwards from the time you want a straight-dough loaf ready, map the active and waiting stages, and leave room for fermentation to move at its own pace.',
    introduction:
      'A straight-dough artisan bread schedule becomes manageable when you stop treating it as one long block. Separate the hands-on steps from the waiting stages, choose the time the loaf needs to be ready, then work backwards with enough margin for the dough—not just the clock.',
    publishedAt: '2026-09-01',
    updatedAt: '2026-09-01',
    readingTime: '6 min read',
    sections: [
      {
        title: 'Write down every stage before choosing a start time',
        body: [
          'Begin with the formula you actually plan to bake. List mixing, resting, folds, bulk fermentation, shaping, final proof, preheating, baking and cooling. Mark each stage as either hands-on or waiting.',
          'This prevents a common planning mistake: adding the fermentation times while forgetting the short steps between them. Ten minutes of work can still require you to be in the kitchen at a very specific time.',
        ],
      },
      {
        title: 'Work backwards from when the loaf must be ready',
        body: [
          'Choose the real finish—not merely the moment the loaf leaves the oven. If it needs to cool before slicing or travelling, include that cooling time in the plan.',
        ],
        steps: [
          'Set the time the cooled loaf needs to be ready.',
          'Subtract cooling and baking time.',
          'Subtract the final proof and shaping stages.',
          'Subtract bulk fermentation, folds and initial mixing.',
          'If the calculated start is inconvenient, move a suitable waiting stage into the refrigerator or choose a different finish time according to your recipe.',
        ],
      },
      {
        title: 'Treat fermentation as a window, not an appointment',
        body: [
          'Temperature, dough composition, yeast percentage and handling can all move the schedule. Use the recipe’s time as an estimate and check the dough for the signs of readiness described by the recipe you trust.',
          'Give the plan a buffer rather than forcing the next step because a countdown reached zero. If the dough is moving slowly, the schedule should move with it.',
        ],
        note: 'Bread Engineer’s estimates are planning aids for its artisan yeasted loaves. The timer tells you when to check; the dough tells you when it is ready.',
      },
      {
        title: 'Use the same method in Bread Engineer',
        body: [
          'Bread Engineer currently focuses on straight-dough loaves made with commercial yeast. It does not currently include sourdough, levain, poolish or biga recipes.',
          'The app shows the full sequence for its built-in same-day, overnight and whole-wheat recipes. Choose Start at to see an estimated finish, or Finish by to calculate a recommended mixing time from the target you choose.',
          'The app recalculates its built-in recipe schedule from dough mass, hydration, yeast percentage, dough temperature, room temperature and humidity. It also shows a planning allowance because fermentation is naturally variable.',
        ],
      },
      {
        title: 'Make the schedule useful in the kitchen',
        body: [
          'Put reminders on the transitions you are most likely to miss: the recommended start, the end of a long rest, the beginning of preheating and the end of the bake. Avoid creating so many alerts that none of them feel important.',
          'Bread Engineer can optionally remind you when its calculated start time arrives, then guide the active bake one step at a time.',
        ],
      },
    ],
    faq: [
      {
        question: 'Should I plan bread from the start time or finish time?',
        answer:
          'Use the finish time when the loaf is needed for a meal, event or journey. Use the start time when your availability to mix is fixed and the eventual finish can remain flexible.',
      },
      {
        question: 'Why does a bread schedule need extra time?',
        answer:
          'Fermentation is affected by the dough and its environment, so a written duration is an estimate. A buffer lets you respond to the dough without making the whole day late.',
      },
      {
        question: 'What kinds of bread does Bread Engineer include?',
        answer:
          'Its built-in recipes cover same-day white, overnight low-yeast white and same-day whole-wheat straight-dough loaves using commercial yeast. Sourdough, levain, poolish and biga recipes are not currently included.',
      },
      {
        question: 'Can Bread Engineer calculate backwards from a finish time?',
        answer:
          'Yes. Finish by mode uses all included recipe steps and the current timing conditions to recommend when to start mixing, while showing an allowance around the estimate.',
      },
    ],
    relatedGuideSlugs: ['bread-dough-timer-fermentation-reminders'],
  },
  {
    slug: 'bread-dough-timer-fermentation-reminders',
    appSlug: 'bread-engineer',
    appName: 'Bread Engineer',
    appIcon: '/assets/images/icons/BreadEngineer.png',
    appStoreUrl: 'https://apps.apple.com/gb/app/bread-engineer/id6738381066',
    socialImage: '/assets/images/apps/BreadEngineer/product/step-timer.webp',
    accent: '#c96d52',
    eyebrow: 'Bread timer guide',
    title: 'How to use a bread dough timer and fermentation reminders',
    description:
      'Keep the folds, fermentation, proofing and baking steps of a straight-dough loaf on time with useful reminders that remain visible while you leave the app.',
    introduction:
      'A straight-dough loaf rarely needs constant attention, but it does need you to return at the right moments. A useful timer system keeps the current step visible, alerts you when a waiting stage ends and still leaves the final readiness decision to you. Bread Engineer currently guides commercially yeasted straight-dough recipes—not sourdough or preferment recipes.',
    publishedAt: '2026-09-01',
    updatedAt: '2026-09-01',
    readingTime: '5 min read',
    sections: [
      {
        title: 'Use one timer for the step you are actually on',
        body: [
          'Separate the recipe into a sequence instead of starting several anonymous timers at once. A label such as “first fold” or “bulk fermentation check” is much more useful than an alarm named only “timer.”',
          'Before starting a waiting stage, confirm what you need to do when it ends. That turns the alert into a clear next action rather than another notification to interpret.',
        ],
      },
      {
        title: 'Set reminders for transitions, not every thought',
        body: [
          'The easy-to-miss transitions deserve alarms: the end of a rest, the next fold, the time to shape, the beginning of preheating and the end of the bake. Brief hands-on instructions usually do not need separate alerts.',
        ],
        steps: [
          'Read the complete recipe before starting.',
          'Identify each waiting stage and the action that follows it.',
          'Enable sound and notification permissions before relying on an alert.',
          'Keep one clearly named current timer running.',
          'When it ends, inspect the dough before moving to the next stage.',
        ],
      },
      {
        title: 'Keep the active step visible away from the app',
        body: [
          'Bread Engineer uses a Live Activity for supported waiting steps, keeping the recipe name, current step and remaining time visible on the Lock Screen. You can check the countdown without repeatedly reopening the recipe.',
          'The Live Activity is the glanceable display; the alarm or notification is the active prompt. They complement one another rather than doing the same job.',
        ],
      },
      {
        title: 'Understand how the alert reaches you',
        body: [
          'On supported devices and system versions, Bread Engineer uses native alarms when a bread step ends. If alarms are unavailable, it falls back to a local notification. Permissions and device settings still determine whether sound and banners can appear.',
          'Test the reminder behaviour before depending on it for an unattended stretch, especially if Focus modes, silent settings or notification changes are part of your normal setup.',
        ],
        note: 'A timer can tell you when to check. It cannot observe the dough or guarantee that fermentation is complete.',
      },
      {
        title: 'Adjust the estimate when conditions change',
        body: [
          'If the kitchen or dough is warmer or cooler than expected, update the timing conditions rather than pretending the original countdown is still exact. Bread Engineer recalculates fermentation timing on the device from the recipe and the conditions you enter.',
          'Use that updated time as the next check point, then rely on the dough and the recipe’s readiness cues for the final decision.',
        ],
      },
    ],
    faq: [
      {
        question: 'Will a Bread Engineer timer continue if I leave the app?',
        answer:
          'Yes. Supported waiting steps use native alarms and a Lock Screen Live Activity, with a local-notification fallback when alarms are unavailable. The required permissions must remain enabled.',
      },
      {
        question: 'Does a fermentation timer know when dough is ready?',
        answer:
          'No. It provides an estimated check time. Ingredients, temperature and technique affect the result, so inspect the dough before continuing.',
      },
      {
        question: 'What is the difference between the alarm and Live Activity?',
        answer:
          'The Live Activity keeps the current step and remaining time visible. The alarm or fallback notification actively alerts you when the waiting stage ends.',
      },
      {
        question: 'Does Bread Engineer need an account?',
        answer:
          'No. Bread Engineer is free, requires no account and stores recipe data and photos on your device.',
      },
    ],
    relatedGuideSlugs: ['plan-bread-baking-schedule'],
  },
  {
    slug: 'measure-longer-than-iphone-screen',
    appSlug: 'infinite-ruler',
    appName: 'Infinite Ruler',
    appIcon: '/assets/images/icons/infiniteruler.png',
    appStoreUrl: 'https://apps.apple.com/gb/app/infinite-ruler/id6746876762',
    socialImage: '/assets/images/apps/infiniteruler/product/infinite.webp',
    accent: '#0a84ff',
    eyebrow: 'Long measurement guide',
    title: 'How to measure something longer than your iPhone screen',
    description:
      'Continue an iPhone ruler measurement beyond one screen by moving the phone carefully, preserving each endpoint and advancing the scale.',
    introduction:
      'A ruler drawn on a phone normally stops where the display stops. To measure a longer object, you need a continuous scale and a repeatable way to move the phone without losing the point where the previous section ended.',
    publishedAt: '2026-09-01',
    updatedAt: '2026-09-01',
    readingTime: '5 min read',
    sections: [
      {
        title: 'Calibrate before measuring a long distance',
        body: [
          'A small scale difference becomes more noticeable each time you move the phone. Before measuring, compare the on-screen scale with a trusted physical ruler and calibrate the app if the marks do not align.',
          'Use a flat, straight object and keep the phone case in place if you intend to measure with it fitted. Changing the way the phone sits against the object can change the result.',
        ],
      },
      {
        title: 'Create a clear starting point',
        body: [
          'Place the zero mark at the beginning of the object. Infinite Ruler lets you move zero away from the end of the display, which is useful when a case, rounded corner or awkward object prevents the phone itself from sitting at the true starting point.',
          'Choose the left or right ruler edge so the scale can sit directly beside the object and remain easy to see while you move the phone.',
        ],
      },
      {
        title: 'Carry the endpoint into the next ruler page',
        body: [
          'Measure the first screen length, then identify the exact physical point reached by the end of that section. Use a finger, a removable mark or a fixed feature on the object so that point does not drift while the phone moves.',
        ],
        steps: [
          'Align zero with the beginning of the object.',
          'Note the exact point reached at the far end of the current ruler page.',
          'Move the phone without changing its angle or distance from the object.',
          'Align the beginning of the phone’s measuring edge with the point you preserved.',
          'Tap Next page so the displayed numbers continue from the preceding section.',
          'Repeat until the end of the object falls within the current ruler page.',
        ],
        note: 'Do not restart the scale at zero after each move. Infinite Ruler’s page controls preserve the accumulated scale for you.',
      },
      {
        title: 'Reduce movement error at every handoff',
        body: [
          'Keep the phone parallel to the object and make each handoff at one precise point. A diagonal phone, a thick case lip or a guessed transition can add more error than the on-screen markings themselves.',
          'For a flexible or curved object, measure along a straight reference beside it or use a flexible tape instead. A phone ruler is best when the measuring edge can remain flat and aligned.',
        ],
      },
      {
        title: 'Know when to use another tool',
        body: [
          'An iPhone ruler is convenient for everyday estimates when a physical ruler or tape is unavailable. Use a calibrated measuring tool for construction, manufacturing, safety-critical work or anything with a tight tolerance.',
          'Infinite Ruler is designed to make the multi-screen process clearer, but the final accuracy still depends on calibration, alignment and how carefully the phone is repositioned.',
        ],
      },
    ],
    faq: [
      {
        question: 'How does Infinite Ruler measure past one screen?',
        answer:
          'Its Next and Previous page controls continue the numbered scale instead of resetting it, allowing you to reposition the phone and measure successive sections of the same object.',
      },
      {
        question: 'Should I add the screen lengths myself?',
        answer:
          'No. Advance to the next ruler page and the scale continues from the previous section. Your job is to preserve and align the physical handoff point accurately.',
      },
      {
        question: 'Can I measure from either side of the iPhone?',
        answer:
          'Yes. Infinite Ruler can place the scale on the left or right edge so you can use the side that fits the object and your working position.',
      },
      {
        question: 'Is a multi-screen iPhone measurement exact?',
        answer:
          'No measurement is automatically exact. Calibrate first and reposition the phone carefully; use a suitable physical tool when accuracy or safety matters.',
      },
    ],
    relatedGuideSlugs: ['calibrate-iphone-ruler-accurate-measurements'],
  },
  {
    slug: 'calibrate-iphone-ruler-accurate-measurements',
    appSlug: 'infinite-ruler',
    appName: 'Infinite Ruler',
    appIcon: '/assets/images/icons/infiniteruler.png',
    appStoreUrl: 'https://apps.apple.com/gb/app/infinite-ruler/id6746876762',
    socialImage: '/assets/images/apps/infiniteruler/product/calibration.webp',
    accent: '#0a84ff',
    eyebrow: 'iPhone ruler guide',
    title: 'How to calibrate an iPhone ruler for more accurate measurements',
    description:
      'Compare an on-screen iPhone ruler with a trusted physical ruler, correct its scale and improve everyday measurements with careful alignment.',
    introduction:
      'An on-screen ruler can use the expected dimensions of an iPhone as a starting point, but a quick comparison with a real ruler is the best way to check the scale you actually see. Calibration corrects the spacing before you rely on it for everyday measurements.',
    publishedAt: '2026-09-01',
    updatedAt: '2026-09-01',
    readingTime: '5 min read',
    sections: [
      {
        title: 'Use a trustworthy reference ruler',
        body: [
          'Choose an undamaged physical ruler with clear millimetre marks. Place it on a flat, well-lit surface, then put the iPhone beside it so the two scales run parallel rather than meeting at an angle.',
          'Compare several centimetres instead of judging a single mark. A scale that looks right over a short distance can reveal a small spacing difference farther along.',
        ],
      },
      {
        title: 'Match the on-screen scale in Infinite Ruler',
        body: [
          'Open Calibrate from the ruler controls, place the reference ruler against the phone’s measuring edge and choose Start Calibration. Use Smaller or Larger until the on-screen marks align with the physical marks, then tap Done.',
          'Infinite Ruler saves the calibration for that phone. You can return to calibration later or reset the adjustment if you want to begin again.',
        ],
        steps: [
          'Place a physical ruler against the phone’s measuring edge.',
          'Open Calibrate and tap Start Calibration.',
          'Check that the zero points and several later marks line up.',
          'Tap Smaller or Larger in small increments.',
          'Tap Done only when the two scales remain aligned across the comparison distance.',
        ],
      },
      {
        title: 'Measure from the object, not the phone body',
        body: [
          'The end of the glass, the phone frame and the edge of a case may not share exactly the same position. Use the movable zero when the physical starting point cannot sit directly beside the default zero mark.',
          'For the distance between two visible points, show the A and B markers and place one on each point. The app displays the live distance between them in your selected unit.',
        ],
      },
      {
        title: 'Choose useful units and precision',
        body: [
          'Use centimetres for decimal metric measurements. In inches, Infinite Ruler can display fractional precision at 1/8, 1/16 or 1/32 of an inch.',
          'More displayed subdivisions do not guarantee a more accurate physical result. Choose a precision you can place and read reliably, then keep the phone flat and parallel to the object.',
        ],
      },
      {
        title: 'Recheck when the measuring setup changes',
        body: [
          'Repeat the comparison if the scale appears wrong after changing phones, reinstalling the app or significantly changing how the phone sits beside an object. A quick check is also sensible before any measurement where a few millimetres matter.',
          'Infinite Ruler is intended for convenient everyday measurements. Calibration improves the scale, but it does not turn an iPhone into a certified measuring instrument.',
        ],
        note: 'For precision, safety-critical or regulated work, use an appropriate calibrated physical instrument.',
      },
    ],
    faq: [
      {
        question: 'Why should I calibrate an iPhone ruler?',
        answer:
          'Calibration checks the on-screen spacing against a known physical reference and lets you correct a scale that does not align on your particular phone and setup.',
      },
      {
        question: 'Does Infinite Ruler remember calibration?',
        answer:
          'Yes. The app saves a calibration adjustment for the phone so it remains available for future measurements.',
      },
      {
        question: 'Can Infinite Ruler show fractional inches?',
        answer:
          'Yes. You can select 1/8, 1/16 or 1/32-inch precision, or measure in centimetres.',
      },
      {
        question: 'Do my measurements leave the phone?',
        answer:
          'No. Infinite Ruler does not require an account, and measurements and calibration values remain on your device.',
      },
    ],
    relatedGuideSlugs: ['measure-longer-than-iphone-screen'],
  },
  {
    slug: 'create-send-pdf-invoice-iphone',
    appSlug: 'fast-simple-invoice-maker',
    appName: 'Fast Simple Invoice Maker',
    appIcon: '/assets/images/thumbs/fast-simple-invoice-maker.webp',
    appStoreUrl: 'https://apps.apple.com/gb/app/fast-simple-invoice-maker/id6752559476',
    socialImage: '/assets/images/apps/Fast%20Simple%20Invoice%20Maker/hero-invoice-pdf.png',
    accent: '#2876ff',
    eyebrow: 'iPhone invoice guide',
    title: 'How to create and send a PDF invoice from an iPhone',
    description:
      'Create a clear client invoice on your iPhone, check the important details, export a professional PDF and share it using the app your client prefers.',
    introduction:
      'You do not need to wait until you are back at a computer to invoice finished work. With the business and client details prepared, an iPhone can take you from line items to a polished PDF that is ready to email, message or save to Files.',
    publishedAt: '2026-09-01',
    updatedAt: '2026-09-01',
    readingTime: '6 min read',
    sections: [
      {
        title: 'Prepare your reusable business details once',
        body: [
          'Before creating the invoice, gather the business name, contact details, address, tax registration information and payment instructions that should appear on your documents. Add a logo and signature only if they help the client recognise and process the invoice.',
          'Fast Simple Invoice Maker stores these details in a business profile so they can be reused. You can also choose default payment terms, preferred currencies, invoice numbering and a PDF theme instead of entering them again for every client.',
        ],
      },
      {
        title: 'Create the invoice and identify the client',
        body: [
          'Start a new invoice and select or add the client. Confirm the client’s name, billing address, email and tax identifier where applicable, rather than relying on an old contact record without checking it.',
          'Use a unique invoice number and verify the issue date, supply details and due date. A consistent number sequence makes an invoice easier for both sides to reference later.',
        ],
      },
      {
        title: 'Describe the work clearly',
        body: [
          'Add one line item for each product, service or meaningful part of the job. Use a description the client can connect to the work, then enter the quantity, unit and price. Fast Simple Invoice Maker supports units such as hours, days and pieces.',
          'Choose the correct currency, apply a discount only when agreed, and add the appropriate tax label and rate only when they apply to your business and transaction. Check the subtotal, tax and final total before continuing.',
        ],
        steps: [
          'Add a short, recognisable description for each item.',
          'Confirm its quantity or time, unit and price.',
          'Select the invoice currency.',
          'Apply any agreed discount and applicable tax.',
          'Check that the calculated total matches the work agreed with the client.',
        ],
      },
      {
        title: 'Preview the PDF before sharing it',
        body: [
          'Generate the PDF and read it as the client will see it. Check names, dates, invoice number, line items, currency, totals, payment terms and payment details. Look at every page if the invoice has enough items or notes to span more than one.',
          'A professional theme helps readability, but accuracy matters more than decoration. Fix unclear descriptions, accidental blank fields and totals before the document leaves your phone.',
        ],
      },
      {
        title: 'Send the PDF and keep your own record',
        body: [
          'Use the iPhone share sheet to send the PDF through email, Messages, WhatsApp or another app, or save it to Files. Include the invoice number and due date in the message so the client can understand the request before opening the attachment.',
          'Fast Simple Invoice Maker can create, edit, save and export ordinary PDF invoices without an account and while offline. Its optional online-invoice and Stripe payment features are separate: they require an online setup, and Stripe is not needed to share a normal PDF.',
          'Keep the sent PDF and update the invoice status when payment arrives. The app can also generate a receipt PDF for a paid invoice.',
        ],
      },
    ],
    faq: [
      {
        question: 'Can I make a PDF invoice entirely on an iPhone?',
        answer:
          'Yes. Fast Simple Invoice Maker lets you add the client and line items, preview the finished invoice, generate a PDF and share it from the iPhone.',
      },
      {
        question: 'Do I need an account to create and share a PDF invoice?',
        answer:
          'No. The local invoice, PDF export and ordinary sharing workflow works without an account. Optional published web invoices and card payments use separate online services.',
      },
      {
        question: 'How can I send an invoice PDF from my iPhone?',
        answer:
          'Open the generated PDF and use the iOS share sheet to choose email, Messages, WhatsApp, Files or another compatible destination.',
      },
      {
        question: 'Can a client pay an invoice online?',
        answer:
          'Optionally. You can publish a selected invoice as a private web link and connect your own Stripe account for supported card payments. Neither is required for creating a PDF invoice.',
      },
    ],
    relatedGuideSlugs: ['professional-invoice-information-checklist'],
  },
  {
    slug: 'professional-invoice-information-checklist',
    appSlug: 'fast-simple-invoice-maker',
    appName: 'Fast Simple Invoice Maker',
    appIcon: '/assets/images/thumbs/fast-simple-invoice-maker.webp',
    appStoreUrl: 'https://apps.apple.com/gb/app/fast-simple-invoice-maker/id6752559476',
    socialImage: '/assets/images/apps/Fast%20Simple%20Invoice%20Maker/business-profile.png',
    accent: '#2876ff',
    eyebrow: 'Invoice checklist',
    title: 'What information should a professional invoice include?',
    description:
      'Use a practical invoice checklist covering seller and client details, dates, numbering, line items, totals, tax information and payment terms.',
    introduction:
      'A useful invoice tells the client who is charging them, what they are paying for, how much is due and how to pay it. It also needs to satisfy the rules that apply to your business, tax registration and jurisdiction.',
    publishedAt: '2026-09-01',
    updatedAt: '2026-09-01',
    readingTime: '6 min read',
    sections: [
      {
        title: 'Identify the seller and the customer',
        body: [
          'Include the legal or trading name and a usable business address and contact method. Identify the customer using the name and billing address they expect to see, especially when the person commissioning the work and the organisation paying for it are different.',
          'Your business type may require additional identification. For example, a sole trader, limited company or tax-registered business can have different name, address, registration-number and tax-number requirements.',
        ],
      },
      {
        title: 'Give the invoice a unique number and clear dates',
        body: [
          'Use a unique invoice number from a consistent sequence. Include the invoice date and the date the goods were supplied or the service was completed when that date is different.',
          'State a due date or unambiguous payment term such as payment on receipt, Net 14 or Net 30. Make sure the written term and calculated due date agree.',
        ],
      },
      {
        title: 'Explain exactly what is being charged',
        body: [
          'Each line should describe the supplied product or service clearly enough for the client to approve it. Add the quantity or extent of the work, the unit price and the line total. Include a purchase-order or project reference when the client requires one.',
          'Show the currency and separate the subtotal, agreed discounts, applicable tax and final amount owed. Do not add a tax label or registration number simply to make the invoice look formal—use the treatment that actually applies.',
        ],
      },
      {
        title: 'Check the rules for your location and tax status',
        body: [
          'The exact legal requirements are not universal. In the UK, the government’s basic invoice checklist includes a unique number, seller and customer details, a clear description, supply and invoice dates, amounts charged, applicable VAT and the total owed. VAT invoices require additional information.',
          'EU VAT rules similarly require additional fields for full VAT invoices and can vary in specific cases and by member state. Check the current official guidance or ask a qualified accountant when the transaction is cross-border, tax-exempt, reverse charged or otherwise unusual.',
          'Fast Simple Invoice Maker provides fields for tax labels, tax rates, seller and client tax identifiers, discounts, currency and payment terms. You remain responsible for choosing the details and tax treatment required for your invoice.',
        ],
      },
      {
        title: 'Make payment and record-keeping straightforward',
        body: [
          'Tell the client how to pay and include any reference they should use. Keep payment instructions separate from the description of the work, and never expose private account information that the client does not need.',
          'Before sending, check the invoice number, recipient, dates, currency, arithmetic and payment destination. Keep a copy of the exact document sent and record when it was paid; a receipt can then acknowledge the completed payment.',
        ],
        steps: [
          'Seller and customer details are correct.',
          'Invoice number, issue date and supply date are present where required.',
          'Line items describe the work and use the agreed prices.',
          'Currency, discount, tax and total are correct.',
          'Due date, payment terms and payment instructions agree.',
          'Any required company, tax or purchase-order references are included.',
          'The final PDF has been reviewed and saved.',
        ],
      },
    ],
    sources: [
      {
        label: 'GOV.UK — Invoices: what they must include',
        url: 'https://www.gov.uk/invoicing-and-taking-payment-from-customers/invoices-what-they-must-include',
      },
      {
        label: 'European Commission — VAT invoicing',
        url: 'https://taxation-customs.ec.europa.eu/taxation/vat/vat-businesses/invoicing_en',
      },
    ],
    faq: [
      {
        question: 'Does every invoice need a unique number?',
        answer:
          'A unique, consistent invoice number is a standard requirement in many jurisdictions, including the UK and for full EU VAT invoices. Check the rules that apply to your business.',
      },
      {
        question: 'Should an invoice include a due date?',
        answer:
          'A clear due date or payment term helps the client know when payment is expected. Local law and your agreement with the client can affect the applicable payment deadline.',
      },
      {
        question: 'Do I put VAT or another tax on every invoice?',
        answer:
          'No. Tax treatment depends on your registration, location, customer and transaction. Use the correct tax label, rate and identifiers only when they apply.',
      },
      {
        question: 'Is an invoice the same as a receipt?',
        answer:
          'No. An invoice requests payment; a receipt records that payment has been received. Fast Simple Invoice Maker can generate a receipt PDF after an invoice is paid.',
      },
    ],
    relatedGuideSlugs: ['create-send-pdf-invoice-iphone'],
  },
  {
    slug: 'track-relationship-anniversaries-milestones',
    appSlug: 'beloved',
    appName: 'BeLoved',
    appIcon: '/assets/images/apps/BeLoved/appstore.png',
    appStoreUrl: 'https://apps.apple.com/gb/app/beloved/id6752829410',
    socialImage: '/assets/images/apps/BeLoved/product/milestones.webp',
    accent: '#f02d55',
    eyebrow: 'Relationship date guide',
    title: 'How to track relationship anniversaries and milestones',
    description:
      'Organise your relationship start date, anniversaries, elapsed-time milestones and personal special dates without turning every memory into another calendar alert.',
    introduction:
      'Relationship dates are easier to keep meaningful when they are organised by what they represent. Use anniversaries for dates that repeat each year, milestones for time spent together and special dates for the moments that belong to your story.',
    publishedAt: '2026-09-01',
    updatedAt: '2026-09-01',
    readingTime: '5 min read',
    sections: [
      {
        title: 'Choose the date that begins your shared timeline',
        body: [
          'Start with the date you both recognise as the beginning of the relationship. It might be a first date, the day you became a couple or another agreed moment. The label matters less than choosing one date consistently.',
          'If engagement or marriage is part of your story, keep those as separate dated events. This lets you see time together alongside engagement and marriage without replacing the original relationship date.',
        ],
      },
      {
        title: 'Separate anniversaries from elapsed-time milestones',
        body: [
          'An anniversary repeats on a calendar date each year, such as a relationship, engagement or wedding anniversary. A milestone marks an amount of time since the relationship began, such as 100 days, 52 weeks or a custom combination of years and days.',
          'BeLoved calculates upcoming day and week milestones automatically and lets you enable the ones you enjoy. You can also add a custom milestone when a particular number or interval means something to you.',
        ],
      },
      {
        title: 'Use special dates for the story around the anniversary',
        body: [
          'Save personal events such as a first trip, a favourite date-night tradition or another meaningful first as special dates. Mark a date as repeating annually only when you genuinely intend to celebrate it every year.',
          'Keep the list selective. A short set of recognisable moments is easier to enjoy than a crowded archive in which every date appears equally important.',
        ],
      },
      {
        title: 'Add reminders only where they help',
        body: [
          'Enable notifications for the celebrations you do not want to miss, then confirm that BeLoved is allowed to send notifications in iOS Settings. A reminder can protect the date without dictating what the celebration should look like.',
          'Review the dates after a relationship change, a corrected memory or a device migration. An inaccurate date repeated every year is worse than leaving it unset until you can confirm it.',
        ],
      },
      {
        title: 'Keep the next meaningful moment visible',
        body: [
          'BeLoved brings the relationship timeline, next celebration, upcoming milestones and special dates into one view. Add your person’s photo if you want the tracker to feel personal rather than like a general calendar.',
          'Your relationship details and photo remain on your device, and no account is required. A Home Screen widget can optionally keep a chosen countdown or duration visible without opening the app.',
        ],
      },
    ],
    faq: [
      {
        question: 'What is the difference between an anniversary and a relationship milestone?',
        answer:
          'An anniversary repeats on the same calendar date each year. A milestone marks a particular amount of elapsed time, such as 100 days or 52 weeks together.',
      },
      {
        question: 'Can I track engagement and wedding anniversaries separately?',
        answer:
          'Yes. BeLoved can keep the relationship start, engagement and marriage dates as separate parts of the same timeline.',
      },
      {
        question: 'Can I add my own relationship milestone?',
        answer:
          'Yes. Alongside its built-in day and week milestones, BeLoved supports custom milestones using days, weeks, years or a combination.',
      },
      {
        question: 'Does BeLoved require an account?',
        answer:
          'No. BeLoved works without an account, and relationship details and photos are stored on your device.',
      },
    ],
    relatedGuideSlugs: ['anniversary-countdown-widget-iphone-home-screen'],
  },
  {
    slug: 'anniversary-countdown-widget-iphone-home-screen',
    appSlug: 'beloved',
    appName: 'BeLoved',
    appIcon: '/assets/images/apps/BeLoved/appstore.png',
    appStoreUrl: 'https://apps.apple.com/gb/app/beloved/id6752829410',
    socialImage: '/assets/images/apps/BeLoved/product/widget-setup.webp',
    accent: '#f02d55',
    eyebrow: 'iPhone widget guide',
    title: 'How to add an anniversary countdown widget to your iPhone Home Screen',
    description:
      'Add a relationship widget to the iPhone Home Screen, choose its size and decide whether it shows time together, an anniversary, a milestone or a special date.',
    introduction:
      'An anniversary widget keeps one meaningful date visible without asking you to open a calendar. Set up the relationship information first, add the widget through the iPhone widget gallery, then choose the display that deserves a place on your Home Screen.',
    publishedAt: '2026-09-01',
    updatedAt: '2026-09-01',
    readingTime: '5 min read',
    sections: [
      {
        title: 'Prepare the relationship details in BeLoved',
        body: [
          'Open BeLoved and set the relationship start date. Add engagement, marriage, milestones or special dates only when you want those moments available as widget choices.',
          'Choose the photo you want behind the widget and check its crop in the app. A clear image with room for overlaid text usually works better than a tightly framed photo.',
        ],
        noteLabel: 'Premium feature',
        note: 'Personalised BeLoved widgets, including the relationship photo and display styles, require an active BeLoved Premium subscription. Current terms are shown in the app before purchase.',
      },
      {
        title: 'Open the iPhone widget gallery',
        body: [
          'Return to the Home Screen and press and hold an empty area until the apps begin to move. Tap Edit, then Add Widget—or use the plus button on iOS versions that show one directly.',
        ],
        steps: [
          'Press and hold an empty area of the Home Screen.',
          'Tap Edit and then Add Widget, or tap the plus button.',
          'Search for BeLoved in the widget gallery.',
          'Swipe through the Small, Medium and Large previews.',
          'Tap Add Widget and place it where you want it.',
        ],
      },
      {
        title: 'Choose what the widget displays',
        body: [
          'Press and hold the added widget, then choose Edit Widget. BeLoved can show Years + Days, Next Anniversary, Total Days, Next Milestone or Next Special Date.',
          'Choose one value that remains useful at a glance. Next Anniversary works as a countdown, while Years + Days or Total Days keeps the time already shared visible every day.',
        ],
      },
      {
        title: 'Pick a size that suits the photo and information',
        body: [
          'A Small widget uses less Home Screen space and keeps the message compact. Medium and Large layouts give the photo and relationship information more room.',
          'If the text competes with an important part of the image, return to BeLoved and adjust the selected photo or crop rather than accepting a widget that is difficult to read.',
        ],
      },
      {
        title: 'Refresh a widget that looks out of date',
        body: [
          'iOS controls the exact widget refresh schedule. BeLoved requests a refresh when relationship data, the photo or subscription status changes, and its timeline advances daily for date-based information.',
          'If the widget still looks stale, open BeLoved to refresh the shared relationship details and wait briefly. If needed, remove the widget from the Home Screen and add it again.',
        ],
      },
    ],
    faq: [
      {
        question: 'What can a BeLoved widget display?',
        answer:
          'It can show Years + Days, Next Anniversary, Total Days, Next Milestone or Next Special Date using your selected relationship photo.',
      },
      {
        question: 'Which BeLoved widget sizes are available?',
        answer:
          'BeLoved provides Small, Medium and Large Home Screen widget layouts.',
      },
      {
        question: 'Do BeLoved widgets require Premium?',
        answer:
          'Yes. The personalised photo widgets and their display styles require an active BeLoved Premium subscription.',
      },
      {
        question: 'Why has my anniversary widget not updated yet?',
        answer:
          'iOS manages widget refresh timing. Open BeLoved after changing a date or photo, wait briefly for the widget to refresh and remove and re-add it if the old content remains.',
      },
    ],
    relatedGuideSlugs: ['track-relationship-anniversaries-milestones'],
  },
];

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}

export function getGuidesForApp(appSlug: string) {
  return guides.filter((guide) => guide.appSlug === appSlug);
}
