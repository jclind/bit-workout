describe('Workout Tests', () => {
  Cypress.Commands.add('completeTimedSet', (skipRest, testRepFunctionality) => {
    cy.contains('Start Timer').click()
    cy.contains('Skip Timer').click()

    // Test dec, inc and typing rep number
    if (testRepFunctionality) {
      cy.get('.rep-input-modal button.decrement').click()
      cy.get('.rep-input-modal input.rep-input').should('have.value', 4)
      cy.get('.rep-input-modal button.increment').click()
      cy.get('.rep-input-modal input.rep-input').should('have.value', 5)

      cy.get('.rep-input-modal input.rep-input').type(10)
      cy.get('.rep-input-modal input.rep-input').should('have.value', 10)
    }

    cy.get('.rep-input-modal button.confirm-btn').click()

    if (skipRest) {
      cy.get('button.skip-rest-btn').click()
    }
  })

  before(() => {
    cy.callFirestore('update', `workoutData/${Cypress.env('TEST_UID')}`, {
      isWorkoutRunning: false,
      runningWorkout: {},
    })
  })

  it('Follow Straight Set 1 Exercise Workout', () => {
    cy.login()
    cy.visit('/workout')
    cy.get('button.selection-btn').contains('Created').click()

    // Start Workout
    cy.getWorkoutSelectorByText('Timed Set 1 Exercise').click()

    // Validate workout path is correct
    cy.validateWorkoutPath(1)

    cy.openPlatesModal(true)

    // cy.changeExerciseWeightThroughPlatesModal(80)
    // // Run through workout
    cy.completeTimedSet(true, true)
    cy.completeTimedSet(true)
    cy.completeTimedSet(true)
    cy.completeTimedSet(true)
    cy.completeTimedSet()

    cy.get('.workout-complete.page').should('be.visible')
    cy.get('button.back-home-btn').click()
  })
})
