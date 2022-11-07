describe('Workout Tests', () => {
  it('Follow Drop Set 1 Exercise Workout', () => {
    cy.callFirestore('update', `workoutData/${Cypress.env('TEST_UID')}`, {
      isWorkoutRunning: false,
      runningWorkout: {},
    })
    cy.login()
    cy.wait(1000)
    cy.visit('/workout')
    cy.closeSplashScreen()
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
})
