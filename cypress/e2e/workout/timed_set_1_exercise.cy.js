describe('Workout Tests', () => {
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
    cy.get("[class='single-workout loading']").should('not.exist')
    cy.get('.single-workout')
      .contains('Timed Set 1 Exercise')
      .parent()
      .get('button.start-button')
      .click()

    // Validate workout path is correct
    cy.get('.active-workout button.view-workout-path').click()
    cy.get('.workout-path-modal').should('be.visible')
    cy.get('.workout-path-modal .workout-path-exercise').should(
      'have.length',
      1
    )
    cy.get('.workout-path-modal .reps-sets span').contains('0/5')
    cy.get('.workout-path-modal.overlay').click(15, 15) // Click out of workout path modal

    // cy.changeExerciseWeightThroughPlatesModal(80)
    // // Run through workout
    // cy.completeSetAndSkipRest()
    // cy.completeSetAndSkipRest()
    // cy.completeSetAndSkipRest()
    // cy.completeSetAndSkipRest()
    // cy.get('.active-workout button.submit-btn').click()

    // cy.get('.workout-complete.page').should('be.visible')
    // cy.get('button.back-home-btn').click()
  })
})
