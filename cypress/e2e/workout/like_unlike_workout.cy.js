describe('Workout Tests', () => {
  it('Like Unlike Workout', () => {
    cy.callFirestore('update', `workoutData/${Cypress.env('TEST_UID')}`, {
      isWorkoutRunning: false,
      runningWorkout: {},
    })
    cy.login()
    cy.visit('/workout')
    cy.closeSplashScreen()
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
})
