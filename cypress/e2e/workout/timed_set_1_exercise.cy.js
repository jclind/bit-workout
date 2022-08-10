describe('Workout Tests', () => {
  before(() => {
    cy.callFirestore('update', `workoutData/${Cypress.env('TEST_UID')}`, {
      isWorkoutRunning: false,
      runningWorkout: {},
    })
  })

  it('Follow Timed Set 1 Exercise Workout', () => {
    cy.login()
    cy.visit('/workout')
    cy.get('button.selection-btn').contains('Created').click()

    // Start Workout
    cy.getWorkoutSelectionStartButtonByText('Timed Set 1 Exercise').click()

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

    cy.get('.workout-complete.page').should('be.visible')
    cy.get('button.back-home-btn').click()
  })
})
