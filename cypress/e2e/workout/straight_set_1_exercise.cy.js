describe('Workout Tests', () => {
  before(() => {
    cy.callFirestore('update', `workoutData/${Cypress.env('TEST_UID')}`, {
      isWorkoutRunning: false,
      runningWorkout: {},
    })
  })

  it('Follow Straight Set 1 Exercise Workout', () => {
    cy.login()
    cy.visit('/workout')
    cy.get('button.selection-btn').contains('Created').click()

    // Start Workout
    cy.getWorkoutSelectionStartButtonByText('Straight Set 1 Exercise').click()

    // Validate workout path shows correctly
    cy.validateWorkoutPath(1)

    cy.changeExerciseWeightThroughPlatesModal(155)

    // Run through workout
    cy.completeSet(true)
    cy.completeSet(true)
    cy.completeSet(true)
    cy.completeSet(true)
    cy.completeSet()

    cy.get('.workout-complete.page').should('be.visible')
    cy.get('button.back-home-btn').click()
  })
})