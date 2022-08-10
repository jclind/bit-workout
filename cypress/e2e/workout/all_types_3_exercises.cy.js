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
    cy.getWorkoutSelectorByText('All Types 3 Exercises').click()

    // Validate workout path is correct
    cy.validateWorkoutPath(3)

    // Test First Exercise
    cy.openPlatesModal(true)

    // Run through workout
    cy.completeSet(true)
    cy.completeSet(true)
    cy.completeSet(true)
    cy.completeSet(true)
    cy.completeSet()

    cy.contains('(Drop Sets)', { matchCase: false })

    // Test Second Exercise
    cy.openPlatesModal(true)

    cy.completeDropSet(true)
    cy.completeDropSet()
    cy.completeDropSet()
    cy.completeDropSet()
    cy.completeDropSet()

    cy.get('button.skip-rest-btn').click()
    cy.contains('(Timed Sets)', { matchCase: false })

    // Test Third Exercise
    cy.openPlatesModal(true)
    cy.completeTimedSet(true, true)
    cy.completeTimedSet(true)
    cy.completeTimedSet(true)
    cy.completeTimedSet(true)
    cy.completeTimedSet()

    cy.get('.workout-complete.page').should('be.visible')
    cy.get('button.back-home-btn').click()
  })
})
