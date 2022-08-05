/// <reference types="cypress" />

describe('Some Test', () => {
  it('Visits the dashboard page', () => {
    cy.login()
    cy.visit('/')
    cy.get('.character .username').should('have.text', 'jesselind')
  })
})
