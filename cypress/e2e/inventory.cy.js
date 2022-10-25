describe('Workout Tests', () => {
  it('App Flow Test', () => {
    cy.callFirestore('update', `workoutData/${Cypress.env('TEST_UID')}`, {
      isWorkoutRunning: false,
      runningWorkout: {},
    })
    cy.login()

    cy.visit('/')
    cy.get('button.view-inventory').click()

    cy.get('.type-container.hat button').eq(0).click()
    cy.get('button.equip-btn').click()
    cy.get('.type-container.robe button').eq(0).click()
    cy.get('button.equip-btn').click()
    cy.get('.type-container.primary-weapon button').eq(0).click()
    cy.get('button.equip-btn').click()
  })
})
