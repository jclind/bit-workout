describe('Workout Tests', () => {
  before(() => {
    cy.callFirestore('update', `workoutData/${Cypress.env('TEST_UID')}`, {
      isWorkoutRunning: false,
      runningWorkout: {},
    })
  })

  it('Follow Drop Set 1 Exercise Workout', () => {
    cy.login()
    cy.visit('/workout')
    cy.get('button.selection-btn').contains('Created').click()

    // Start Workout
    cy.get('.single-workout').should('have.length.greaterThan', 0)
    cy.clickWorkoutSelectionStartButtonByText('Drop Set 1 Exercise').click()

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
