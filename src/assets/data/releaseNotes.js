export const current_version_number = 'v0.4.4-alpha'

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
]
