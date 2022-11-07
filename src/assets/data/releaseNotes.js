export const current_version_number = 'v0.8.0-alpha'

export const releaseNotes = [
  {
    version: 'v0.3.0-alpha',
    date: 'August 1, 2022',
    title: '',
    description: '',
    features: [
      'Workout display / creation refactor',
      'Added more information to the past workout list',
      'Added trending, liked, and created workout tabs on the workout selection page',
      'Added the ability to like user-created workouts',
      'Added the ability to delete created workouts',
      'Added new exercise set types: Straight, drop, and timed sets',
      'Added temporary, one-time use, created workouts',
    ],
    fixes: [
      'Workout summary page no longer shows on every refresh after a timed-out workout',
    ],
  },
  {
    version: 'v0.3.1-alpha',
    date: 'August 2, 2022',
    title: '',
    description: '',
    features: ['New Release Notes Page!'],
    fixes: [
      'Fix multiple visual bugs and workout related bugs.',
      'Fix workout path modal functionality. Modal previously threw multiple errors due to incorrect data retrieval.',
      'Stopping workout before completion no longer throws errors, and workout data is now saved correctly.',
      'Drop sets no longer have rest time after set completion.',
    ],
    improvements: ['Add ability to toggle workout chime in settings.'],
  },
  {
    version: 'v0.4.1-alpha',
    date: 'August 22, 2022',
    title: '',
    description: '',
    features: [
      "Exercises can now be added and removed in the current workout through the 'workout path' modal.",
    ],
    fixes: ['Multiple minor fixes'],
  },
  {
    version: 'v0.4.5-alpha',
    date: 'September 2, 2022',
    title: '',
    description: '',
    features: [
      'Workout path can now be further edited while workout is running through the workout path modal.',
    ],
    fixes: ['Multiple bug fixes'],
  },
  {
    version: 'v0.4.6-alpha',
    date: 'September 5, 2022',
    title: '',
    description: '',
    features: [
      'Workouts will no longer be added to past workouts list if no sets have been completed before workout is stopped.',
      'Added toast notifications for many settings forms for a better user experience.',
    ],
    fixes: [
      'Multiple minor style fixes / changes.',
      'Fix frustrating tab indexes in settings forms.',
    ],
    improvements: [
      'Added loading indications to settings forms and add weight input page.',
      'Added additional error handling / messages in settings forms.',
    ],
  },
  {
    version: 'v0.4.7-alpha',
    date: 'September 19, 2022',
    title: '',
    description: '',
    fixes: [
      'Fix: workout path modal scrolls background when trying to re-order exercises',
    ],
    improvements: [
      'Added improved loading indication after user authentication through signup/login',
      'Update all UI icons to react-icons for better consistency and faster loading',
      'All images have been compressed for faster performance',
      'Greatly increase speed of running workout actions, i.e. completing sets and skipping rests',
      'Several style improvements / changes',
    ],
  },
  {
    version: 'v0.5.0-alpha',
    date: 'September 21, 2022',
    title: '',
    description: '',
    features: [
      'Added warmups to weighted exercises. Users can now add warmup sets before each weighted exercise, no matter the set type. Warm up set weights/reps are calculated based on bar weight and starting exercise weight.',
    ],
  },
  {
    version: 'v0.6.0-alpha',
    date: 'September 27, 2022',
    title: '',
    description: '',
    features: [
      'Major improvements to tracked account statistics and progress. Now with a dedicated stats accessed from the account page.',
    ],
    fixes: [
      "Fix: warmup sets show weight as 'NaN' for some users and actual weight cannot be found.",
      "Fix: trending workouts don't fetch more results when page is scrolled to bottom of page like intended.",
      'Fix: exercises with lengthy names push content on page to occasionally be unreadable / merge with other content.',
      "Fix: adding a workout with the workout path modal occasionally messes up set type which can't be changed.",
      'Fix: workout path modal easily overflows off the page making functionality unusable.',
    ],
    improvements: [
      'Added minor quality of life and accessability changes to inputs / forms.',
    ],
  },
  {
    version: 'v0.7.0-alpha',
    date: 'October 24, 2022',
    title: '',
    description: '',
    features: [
      'All new item shop and inventory system. Coins can now be spent to purchase items which can be equipped on your character in the new inventory page.',
      'Redesigned completed workout page displaying more data including total workout volume lifted, workout path, and user records hit during the workout.',
    ],
    fixes: ['Fix: tests are being marked as unsuccessful incorrectly.'],
    improvements: [
      'Added improved accessability across the application.',
      'Added testing for equipment page.',
      'Workout rest page small style refactor.',
    ],
  },
  {
    version: 'v0.8.0-alpha',
    date: 'October 24, 2022',
    title: '',
    description: '',
    features: [
      'Achievements are now available. Earn achievements and badges by completing workouts, earning coins, purchasing items, and much more. Achievements can be viewed in the all-new Achievements page via the account page.',
      'Added a one-time showing splash screen for announcements. It adds an easy way to alert users of any necessary information.',
    ],
    fixes: [
      'Fix: total workout time not calculated correctly on the workout complete page.',
      'Fix: chart document data occasionally being rendered twice causing errors.',
      'Fix: warmup sets are not being tracked in stats.',
    ],
    improvements: [
      'Redesigned workout finished page, which now shows personal records earned in the completed workout, workout path, and total workout weight volume.',
      'Long text strings fixed on the workout finished page and workout stats pages.',
      'Exercise stats are now updated instantly in the stats page, page refresh is no longer needed.',
      'Many testing improvements, data now reset before all tests run to help catch potential bugs.',
    ],
  },
]
