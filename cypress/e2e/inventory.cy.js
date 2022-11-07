describe('Workout Tests', () => {
  it('Inventory Test', () => {
    cy.callFirestore('update', `workoutData/${Cypress.env('TEST_UID')}`, {
      isWorkoutRunning: false,
      runningWorkout: {},
    })
    cy.login()
    cy.wait(1000)
    cy.visit('/')
    cy.closeSplashScreen()
    cy.get('button.view-inventory').click()

    cy.get('.type-container.hat button').eq(0).click()
    cy.get('button.equip-btn').click()
    cy.get('.type-container.robe button').eq(0).click()
    cy.get('button.equip-btn').click()
    cy.get('.type-container.primary-weapon button').eq(0).click()
    cy.get('button.equip-btn').click()
  })
})
