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
    cy.getWorkoutSelectorByText('Drop Set 1 Exercise').click()

    // Validate workout path is correct
    cy.validateWorkoutPath(1)

    cy.openPlatesModal(true)

    // Run through workout
    cy.completeDropSet(true)
    cy.completeDropSet()
    cy.completeDropSet()
    cy.completeDropSet()
    cy.completeDropSet()

    cy.get('.workout-complete.page').should('be.visible')
    cy.get('button.back-home-btn').click()
  })
})
