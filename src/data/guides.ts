export interface GuideSection {
  title: string;
  body: string[];
  steps?: string[];
  note?: string;
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
  faq: Array<{ question: string; answer: string }>;
  relatedGuideSlugs: string[];
}

export const guides: SearchGuide[] = [
  {
    slug: 'stop-ignoring-screen-time-limits',
    appSlug: 'look-at-yourself',
    appName: 'LookAtYourself',
    appIcon: '/assets/images/apps/LookAtYourself/icon.webp',
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
];

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}

export function getGuidesForApp(appSlug: string) {
  return guides.filter((guide) => guide.appSlug === appSlug);
}
