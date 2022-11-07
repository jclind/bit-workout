before(() => {
  cy.callFirestore('update', `workoutData/${Cypress.env('TEST_UID')}`, {
    isWorkoutRunning: false,
    runningWorkout: {},
    workoutStats: {},
  })
  cy.callFirestore('update', `characterData/${Cypress.env('TEST_UID')}`, {
    coins: 100,
    exp: 0,
    equipped: [],
    inventory: [],
  })

  cy.callFirestore(
    'get',
    `userStats/${Cypress.env('TEST_UID')}/exerciseStats`
  ).then(exercises => {
    if (exercises) {
      exercises.map(ex => {
        cy.callFirestore(
          'delete',
          `userStats/${Cypress.env('TEST_UID')}/exerciseStats/${
            ex.exerciseID
          }-id/completedSetsPath`
        )
      })
    }
  })
  cy.callFirestore(
    'delete',
    `userStats/${Cypress.env('TEST_UID')}/exerciseStats`,
    {
      recursive: true,
    }
  )
  cy.callFirestore('delete', `userStats/${Cypress.env('TEST_UID')}`, {
    recursive: true,
  })
})
beforeEach(() => {
  localStorage.clear()
  cy.login()
  cy.visit('/workout')
  cy.closeSplashScreen()
})
describe('Workout Tests', () => {
  it('Follow All Types 3 Exercises Workout', () => {
    cy.get('button.selection-btn').contains('Created').click()
    // Start Workout
    cy.get("[class='single-workout loading']").should('not.exist')
    cy.clickWorkoutSelectionStartButtonByText('All Types 3 Exercises')
    // Validate workout path is correct
    cy.validateWorkoutPath(3)
    // Test First Exercise
    cy.openPlatesModal(true)
    // Run through workout
    cy.completeSet(true)
    cy.completeSet(true)
    cy.completeSet(true)
    cy.completeSet(true)
    cy.completeSet()
    cy.contains('(Drop Sets)', { matchCase: false })
    // Test Second Exercise
    cy.openPlatesModal(true)
    cy.completeDropSet(true)
    cy.completeDropSet()
    cy.completeDropSet()
    cy.completeDropSet()
    cy.completeDropSet()
    cy.get('button.skip-rest-btn').click()
    cy.contains('(Timed Sets)', { matchCase: false })
    // Test Third Exercise
    cy.openPlatesModal(true)
    cy.completeTimedSet(true, true)
    cy.completeTimedSet(true)
    cy.completeTimedSet(true)
    cy.completeTimedSet(true)
    cy.completeTimedSet()
    cy.get('.workout-complete').should('be.visible')
    cy.get('.Toastify__toast').click({ multiple: true, force: true })
    cy.get('button.back-home-btn').click()
  })
  it('Create And Delete Workout Test', () => {
    cy.get('.create-workout-link', { timeout: 10000 }).click()
    cy.contains('Add Exercises')

    // Add Exercises Page
    // Exercise 1
    cy.get('button.select-exercise').click()
    cy.get('.dropdown input.search-input').type('other')
    cy.get('div.exercise-cell').eq(1).click()
    cy.get('.exercise-type-selector').click()
    cy.get('.exercise-type-selector #react-select-3-option-0').click()
    cy.get('.path-item input').type(5)
    cy.get('button.add-set-btn').click().click().click().click().click()
    cy.get('.path-item').eq(0).children('button.delete-item-btn').click()
    cy.get('.path-item').should('have.length', 5)
    cy.get('button.add-description-btn').click()
    cy.get('textarea.description').type(
      'Do consequat minim tempor elit nisi non cillum Lorem Lorem ex voluptate eu. Magna nisi veniam dolore ipsum.',
      { delay: 2 }
    )

    // Exercise 2
    cy.get('button.add-exercise-btn').trigger('click')

    cy.get('.exercise-item')
      .eq(1)
      .within(() => {
        cy.get('button.select-exercise').click()
        cy.get('.dropdown input.search-input').type('deadlift')
        cy.get('div.exercise-cell').eq(0).click()

        cy.get('.exercise-type-selector').click()
        cy.get('.exercise-type-selector')
          .get('[id^=react-select-][id$=-option-1]')
          .click()

        cy.get('input.start-weight-input').type(80)
        cy.get('input.end-weight-input').type(60)
        cy.get('input.weight-decrease-input').type(5)
        cy.get('button.add-description-btn').click()
        cy.get('textarea.description').type(
          'Dolore qui duis cillum et veniam enim reprehenderit. Sunt in non incididunt in. Aute qui pariatur aute occaecat commodo consequat occaecat id aute Lorem sint minim sunt.',
          { delay: 2 }
        )
      })

    // Exercise 3
    cy.get('button.add-exercise-btn').trigger('click')

    cy.get('.exercise-item')
      .eq(2)
      .within(() => {
        cy.get('button.select-exercise').click()
        cy.get('.dropdown input.search-input').type('bench press')
        cy.get('div.exercise-cell').eq(0).click()

        cy.get('.exercise-type-selector').click()
        cy.get('.exercise-type-selector')
          .get('[id^=react-select-][id$=-option-2]')
          .click()

        cy.get('input.minutes-input').type(1)
        cy.get('input.seconds-input').type(30)
        cy.get('input.weight-input').type(100)
        cy.get('button.add-set-btn').click().click().click()
        cy.get('.path-item')
          .eq(0)
          .within(() => {
            cy.get('button.delete-item-btn').click()
          })
        cy.get('.path-item').should('have.length', 3)
        cy.get('button.add-description-btn').click()
        cy.get('textarea.description').type(
          'Irure dolor in velit do enim aute ullamco consequat incididunt est incididunt ipsum excepteur tempor. Dolor magna cupidatat velit duis id est fugiat anim. Proident exercitation nostrud nostrud eiusmod enim fugiat.',
          { delay: 2 }
        )
      })

    cy.get('button.next-btn').trigger('click')

    // Workout Rest Time Page
    cy.get('.rest-time .minutes input').type(2)
    cy.get('.rest-time .seconds input').type(0)
    cy.get('.failed-rest-time .minutes input').type(4)
    cy.get('.failed-rest-time .seconds input').type(30)

    cy.get('button.next-btn').trigger('click')

    // Workout Info Page
    const workoutName = `Test ${new Date().getTime()}`
    cy.get('.workout-title input').type(workoutName)
    cy.get('.workout-description textarea').type(
      'Description testing: Eiusmod irure pariatur adipisicing proident. Exercitation officia sunt excepteur et labore anim esse excepteur laboris labore id laborum esse.'
    )
    cy.get('button.next-btn').trigger('click')

    // Workout Type Page
    cy.get('button.saved').click()
    cy.get('button.next-btn').trigger('click')

    // Delete Just Created Workout
    cy.get('button.selection-btn').contains('Created').click()
    cy.getWorkoutSelectionByText(workoutName).within(() => {
      cy.get('button.delete').click()
    })

    cy.get('.confirm-delete-workout-modal button.confirm-btn').click()
    cy.get('.single-workout').contains(workoutName).should('not.exist')
  })
  it('Create No Weight Workout Test', () => {
    cy.get('.create-workout-link', { timeout: 10000 }).click()
    cy.contains('Add Exercises')

    // Add Exercises Page
    // Exercise 1
    cy.get('button.select-exercise').click()
    cy.get('.dropdown input.search-input').type('other')
    cy.get('div.exercise-cell').eq(1).click()
    cy.get('.exercise-type-selector').click()
    cy.get('.exercise-type-selector #react-select-3-option-0').click()
    cy.get('.path-item input').type(5)
    cy.get('button.add-set-btn').click().click().click().click().click()
    cy.get('.path-item').eq(0).children('button.delete-item-btn').click()
    cy.get('.path-item').should('have.length', 5)
    cy.get('button.add-description-btn').click()
    cy.get('textarea.description').type(
      'Do consequat minim tempor elit nisi non cillum Lorem Lorem ex voluptate eu. Magna nisi veniam dolore ipsum.',
      { delay: 2 }
    )
    cy.get('button.next-btn').trigger('click')

    // Workout Rest Time Page
    cy.get('button.next-btn').trigger('click')

    // Workout Info Page
    const workoutName = `Test ${new Date().getTime()}`
    cy.get('.workout-title input').type(workoutName)
    cy.get('.workout-description textarea').type(
      'Description testing: Eiusmod irure pariatur adipisicing proident. Exercitation officia sunt excepteur et labore anim esse excepteur laboris labore id laborum esse.'
    )
    cy.get('button.next-btn').trigger('click')

    // Workout Type Page
    cy.get('button.temp').click()
    cy.get('button.next-btn').trigger('click')

    // Active Workout
    cy.get('div.exercise-weight').contains('no weights', {
      matchCase: false,
    })
    cy.validateWorkoutPath(1)

    cy.completeSet(true)
    cy.completeSet(true)
    cy.completeSet(true)
    cy.completeSet(true)
    cy.completeSet()

    cy.get('.workout-complete').should('be.visible')
    cy.get('button.back-home-btn').click()
  })
  it('Follow Drop Set 1 Exercise Workout', () => {
    cy.get('button.selection-btn').contains('Created').click()

    // Start Workout
    cy.get("[class='single-workout loading']").should('not.exist')
    cy.get('.single-workout').should('have.length.greaterThan', 0)
    cy.clickWorkoutSelectionStartButtonByText('Drop Set 1 Exercise')

    // Validate workout path is correct
    cy.validateWorkoutPath(1)

    cy.openPlatesModal(true)

    // Run through workout
    cy.completeDropSet(true)
    cy.completeDropSet()
    cy.completeDropSet()
    cy.completeDropSet()
    cy.completeDropSet()

    cy.get('.workout-complete').should('be.visible')
    cy.get('button.back-home-btn').click()
  })
  it('Follow Straight Set 1 Exercise Workout', () => {
    cy.get('button.selection-btn').contains('Created').click()

    // Start Workout
    cy.clickWorkoutSelectionStartButtonByText('Straight Set 1 Exercise')

    // Validate workout path shows correctly
    cy.validateWorkoutPath(1)

    cy.changeExerciseWeightThroughPlatesModal(155)

    // Run through workout
    cy.completeSet(true)
    cy.completeSet(true)
    cy.completeSet(true)
    cy.completeSet(true)
    cy.completeSet()

    cy.get('.workout-complete').should('be.visible')
    cy.get('button.back-home-btn').click()
  })
  it('Exercise Warmup Functionality Test', () => {
    cy.get('button.selection-btn').contains('Created').click()

    // Start Workout
    cy.clickWorkoutSelectionStartButtonByText('All Types 3 Exercises')

    // Straight Set
    cy.get('button.add-warmup').click()
    cy.get('.exercise-title').contains('Squat Warmup', { matchCase: false })
    cy.get('.exercise-weight').contains('45 lbs', { matchCase: false })

    cy.get('button.submit-btn').click()
    cy.get('button.submit-btn').click()
    cy.get('button.submit-btn').click()
    cy.get('button.submit-btn').click()
    cy.get('button.submit-btn').click()
    cy.completeSet(true)
    cy.completeSet(true)
    cy.completeSet(true)
    cy.completeSet(true)
    cy.completeSet()

    // Drop Set
    cy.get('button.add-warmup').click()
    cy.get('.exercise-title').contains('Squat Warmup', { matchCase: false })

    cy.get('button.submit-btn').click()
    cy.get('button.submit-btn').click()
    cy.get('button.submit-btn').click()
    cy.completeDropSet()
    cy.completeDropSet()
    cy.completeDropSet()
    cy.completeDropSet()
    cy.completeDropSet()
    cy.get('button.skip-rest-btn').click()

    // Timed Sets
    cy.get('button.add-warmup').click()
    cy.get('.exercise-title').contains('Squat Warmup', { matchCase: false })

    cy.get('button.submit-btn').click()
    cy.get('button.submit-btn').click()
    cy.get('button.submit-btn').click()
    cy.completeTimedSet(true)
    cy.completeTimedSet(true)
    cy.completeTimedSet(true)
    cy.completeTimedSet(true)
    cy.completeTimedSet()
  })
  it('Follow Timed Set 1 Exercise Workout', () => {
    cy.get('button.selection-btn').contains('Created').click()

    // Start Workout
    cy.clickWorkoutSelectionStartButtonByText('Timed Set 1 Exercise')

    // Validate workout path is correct
    cy.validateWorkoutPath(1)

    cy.openPlatesModal(true)

    // cy.changeExerciseWeightThroughPlatesModal(80)
    // Run through workout
    cy.completeTimedSet(true, true)
    cy.completeTimedSet(true)
    cy.completeTimedSet(true)
    cy.completeTimedSet(true)
    cy.completeTimedSet()

    cy.get('.workout-complete').should('be.visible')
    cy.get('button.back-home-btn').click()
  })
  it('Like Unlike Workout', () => {
    cy.get("[class='single-workout loading']").should('not.exist')
    cy.get('button.selection-btn')
    cy.getWorkoutSelectionByText('All set types').within(() => {
      cy.get('button.like').click()
    })

    cy.get('button.selection-btn').contains('Liked').click()
    cy.getWorkoutSelectionByText('All set types').within(() => {
      cy.get('button.like').click()
    })
    cy.wait(2000)
    cy.reload()

    cy.get('.workout-selection')

    cy.getWorkoutSelectionByText('All set types').within(() => {
      cy.get('button.like .liked').should('not.exist')
    })
  })
  it('Create And Delete Exercise While Workout Is Running', () => {
    cy.get('button.selection-btn').contains('Created').click()

    // Start Workout
    cy.clickWorkoutSelectionStartButtonByText('All Types 3 Exercises')

    cy.get('button.view-workout-path').click()
    cy.get('button.add-exercise').click()
    cy.get('button.select-exercise').click()
    cy.get('input.search-input').type('incline dumbbell curl')
    cy.get('.dropdown-cell.exercise-cell').eq(0).click()
    cy.get('.exercise-type-selector').click()
    cy.get('.exercise-type-selector #react-select-3-option-0').click()

    cy.get('input.reps-input').type('5')
    cy.get('button.add-set-btn').click().click().click().click()

    cy.get('button.confirm-btn').click()
    cy.get('button.editing-btn').click()
    cy.get('.workout-path-exercise')
      .eq(2)
      .within(() => {
        cy.get('button.remove-exercise-btn').click()
      })

    cy.get('.confirm-remove-exercise-modal button.confirm-btn').click()
    cy.get('.confirm-remove-exercise-modal').should('not.exist')

    cy.get('.workout-path-modal.overlay').click(15, 15)

    // Complete Workout
    // Exercise 1
    cy.completeSet(true)
    cy.completeSet(true)
    cy.completeSet(true)
    cy.completeSet(true)
    cy.completeSet()

    // Exercise 2
    cy.contains('(Drop Sets)', { matchCase: false })
    cy.completeDropSet()
    cy.completeDropSet()
    cy.completeDropSet()
    cy.completeDropSet()
    cy.completeDropSet()
    cy.get('button.skip-rest-btn').click()

    // Exercise 3
    cy.contains('(Straight Sets)', { matchCase: false })
    cy.completeSet(true)
    cy.completeSet(true)
    cy.completeSet(true)
    cy.completeSet(true)
    cy.completeSet()

    cy.get('.workout-complete').should('be.visible')
    cy.get('button.back-home-btn').click()
  })
})
