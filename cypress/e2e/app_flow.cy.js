describe('Workout Tests', () => {
  before(() => {
    cy.callFirestore('update', `workoutData/${Cypress.env('TEST_UID')}`, {
      isWorkoutRunning: false,
      runningWorkout: {},
    })
  })

  it('Create Workout Test', () => {
    cy.login()
    cy.visit('/')

    // Dashboard Page
    cy.get('div.character').within(() => {
      cy.get('div.img-container img').should('exist')
      cy.get('div.username').should('have.text', 'jesselind')
      cy.get('div.level').contains('Level', { matchCase: false })
      cy.get('.exp-bar-container').should('exist')
      cy.get('div.coins .text').should('not.be.empty')
    })
    cy.get("[class='past-workouts-link loading']").should('not.exist')
    cy.get('div.past-workouts-link').within(() => {
      cy.get('.image')
      cy.get('div.title').should('not.be.empty')
      cy.get('button.past-workouts-btn').click()
    })

    // Past Workouts Page
    cy.get('div.settings-title').should('have.text', 'Past Workouts')
    cy.get('past-workouts-item')
  })
})
