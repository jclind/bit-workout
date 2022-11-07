describe('Items', () => {
  it('Item Purchasing And Equipping Functionality Test', () => {
    cy.callFirestore('update', `workoutData/${Cypress.env('TEST_UID')}`, {
      isWorkoutRunning: false,
      runningWorkout: {},
    })
    cy.callFirestore('update', `characterData/${Cypress.env('TEST_UID')}`, {
      coins: 100,
      exp: 0,
      equipped: [],
      inventory: [],
    })
    cy.login()
    cy.visit('/')
    cy.closeSplashScreen()

    // Purchase Items
    Cypress.Commands.add('purchaseItemFromShop', () => {
      cy.get('button.item').eq(0).click()
      cy.get('button.confirm-btn').click()
      cy.get('.modal-content').should('not.exist')
      cy.get('.Toastify__toast').click({ multiple: true, force: true })
    })

    cy.purchaseItemFromShop()
    cy.purchaseItemFromShop()
    cy.purchaseItemFromShop()

    // Visit Inventory
    cy.get('button.view-inventory').click()

    cy.get('.type-container.hat button').eq(0).click()
    cy.get('button.equip-btn').click()
    cy.get('.type-container.robe button').eq(0).click()
    cy.get('button.equip-btn').click()
    cy.get('.type-container.primary-weapon button').eq(0).click()
    cy.get('button.equip-btn').click()
  })
})
