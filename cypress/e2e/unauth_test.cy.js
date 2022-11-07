describe('Unauth Test', () => {
  it('Confirm app loads', () => {
    cy.visit('/')
    cy.get('button')
  })
})
