// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-wait-until'

Cypress.Commands.add('changeExerciseWeightThroughPlatesModal', newWeight => {
  // Click plate weights modal
  cy.get('.active-workout .exercise-weight').click()
  cy.get('.plates-modal').should('be.visible')
  cy.get('.plates-modal .total-weight').should('be.visible')

  // Click total weight/change weight button and change weight to
  cy.get('.plates-modal .total-weight').click()
  cy.get('.change-weight-modal').should('be.visible')
  cy.get('.change-weight-modal input').type(newWeight)
  cy.get('.change-weight-modal .save-btn').click()

  cy.get('.plates-modal').should('be.visible')
  cy.get('.plates-modal .total-weight')
    .contains(`${newWeight} lbs`)
    .should('be.visible')
  cy.get('.overlay').click(15, 15) // Close plates modal by overlay click
})
Cypress.Commands.add('completeSetAndSkipRest', () => {
  cy.get('.active-workout button.submit-btn').click()
  cy.get('.workout-timer button.skip-rest-btn').click()
})
