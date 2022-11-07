describe('Workout Tests', () => {
  it('Follow Timed Set 1 Exercise Workout', () => {
    cy.callFirestore('update', `workoutData/${Cypress.env('TEST_UID')}`, {
      isWorkoutRunning: false,
      runningWorkout: {},
    })
    cy.login()
    cy.visit('/workout')
    cy.closeSplashScreen()
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
})
