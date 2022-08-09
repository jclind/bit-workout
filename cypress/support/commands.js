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

// Workout Testing Commands
Cypress.Commands.add('getWorkoutSelectorByText', text => {
  cy.get("[class='single-workout loading']").should('not.exist')
  return cy
    .get('.single-workout')
    .contains(text)
    .parent()
    .parent()
    .children('.start-button')
})
Cypress.Commands.add('validateWorkoutPath', length => {
  // Validate workout path is correct
  cy.get('.active-workout button.view-workout-path').click()
  cy.get('.workout-path-modal').should('be.visible')

  cy.get('.workout-path-modal .workout-path-exercise').should(
    'have.length',
    length
  )
  cy.get('.workout-path-modal .reps-sets span').contains('0/5')
  cy.get('.workout-path-modal.overlay').click(15, 15) // Click out of workout path modal
})

Cypress.Commands.add('openPlatesModal', shouldClose => {
  // Click plate weights modal
  cy.get('.active-workout .exercise-weight').click()
  cy.get('.plates-modal').should('be.visible')
  cy.get('.plates-modal .total-weight').should('be.visible')
  if (shouldClose) {
    cy.get('.overlay').click(15, 15) // Close plates modal by overlay click
  }
})
Cypress.Commands.add('changeExerciseWeightThroughPlatesModal', newWeight => {
  cy.openPlatesModal()

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
Cypress.Commands.add('completeSet', () => {
  cy.get('.active-workout button.submit-btn').click()
})
Cypress.Commands.add('completeSetAndSkipRest', () => {
  cy.completeSet()
  cy.get('.workout-timer button.skip-rest-btn').click()
})
