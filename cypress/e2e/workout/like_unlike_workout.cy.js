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
    cy.get("[class='single-workout loading']", { timeout: 10000 }).should(
      'not.exist'
    )
    cy.getWorkoutSelectionByText('All set types').within(() => {
      cy.get('button.like .liked').should('not.exist')
    })
  })
})
