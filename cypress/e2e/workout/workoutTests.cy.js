describe('Workout Tests', () => {
  it('Follow All Types 3 Exercises Workout', () => {
    cy.wait(1000)
    cy.callFirestore('update', `workoutData/${Cypress.env('TEST_UID')}`, {
      isWorkoutRunning: false,
      runningWorkout: {},
      workoutStats: {},
    })
    cy.callFirestore(
      'get',
      `userStats/${Cypress.env('TEST_UID')}/exerciseStats`
    ).then(exercises => {
      exercises.map(ex => {
        cy.callFirestore(
          'delete',
          `userStats/${Cypress.env('TEST_UID')}/exerciseStats/${
            ex.exerciseID
          }-id/completedSetsPath`
        )
      })
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
    // cy.callFirestore(
    //   'delete',
    //   `userStats/${Cypress.env('TEST_UID')}/exerciseStats`,
    //   {
    //     recursive: true,
    //   }
    // )
    // cy.login()
    // cy.visit('/workout')
    // cy.closeSplashScreen()
    // cy.get('button.selection-btn').contains('Created').click()

    // // Start Workout
    // cy.get("[class='single-workout loading']").should('not.exist')
    // cy.clickWorkoutSelectionStartButtonByText('All Types 3 Exercises')

    // // Validate workout path is correct
    // cy.validateWorkoutPath(3)

    // // Test First Exercise
    // cy.openPlatesModal(true)

    // // Run through workout
    // cy.completeSet(true)
    // cy.completeSet(true)
    // cy.completeSet(true)
    // cy.completeSet(true)
    // cy.completeSet()

    // cy.contains('(Drop Sets)', { matchCase: false })

    // // Test Second Exercise
    // cy.openPlatesModal(true)

    // cy.completeDropSet(true)
    // cy.completeDropSet()
    // cy.completeDropSet()
    // cy.completeDropSet()
    // cy.completeDropSet()

    // cy.get('button.skip-rest-btn').click()
    // cy.contains('(Timed Sets)', { matchCase: false })

    // // Test Third Exercise
    // cy.openPlatesModal(true)
    // cy.completeTimedSet(true, true)
    // cy.completeTimedSet(true)
    // cy.completeTimedSet(true)
    // cy.completeTimedSet(true)
    // cy.completeTimedSet()

    // cy.get('.workout-complete').should('be.visible')
    // cy.get('button.back-home-btn').click()
  })
})
