describe('Workout Tests', () => {
  Cypress.Commands.add('completeTimedSet', skipTimer => {
    cy.contains('Start Timer').click()
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
    cy.completeTimedSet(true)
    // cy.completeSetAndSkipRest()
    // cy.completeSetAndSkipRest()
    // cy.completeSetAndSkipRest()
    // cy.completeSetAndSkipRest()
    // cy.get('.active-workout button.submit-btn').click()

    // cy.get('.workout-complete.page').should('be.visible')
    // cy.get('button.back-home-btn').click()
  })
})
