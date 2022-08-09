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
    cy.getWorkoutSelectorByText('Straight Set 1 Exercise').click()

    // Validate workout path shows correctly
    cy.validateWorkoutPath(1)

    cy.changeExerciseWeightThroughPlatesModal(155)

    // Run through workout
    cy.completeSetAndSkipRest()
    cy.completeSetAndSkipRest()
    cy.completeSetAndSkipRest()
    cy.completeSetAndSkipRest()
    cy.get('.active-workout button.submit-btn').click()

    cy.get('.workout-complete.page').should('be.visible')
    cy.get('button.back-home-btn').click()
  })
})
