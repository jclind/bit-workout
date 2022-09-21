describe('Workout Tests', () => {
  it('Test Exercise Warmup Functionality', () => {
    cy.callFirestore('update', `workoutData/${Cypress.env('TEST_UID')}`, {
      isWorkoutRunning: false,
      runningWorkout: {},
    })
    cy.login()
    cy.visit('/workout')
    cy.get('button.selection-btn').contains('Created').click()

    // Start Workout
    cy.clickWorkoutSelectionStartButtonByText('All Types 3 Exercises')

    // Straight Set
    cy.get('button.add-warmup').click()
    cy.get('.exercise-title').contains('Squat Warmup', { matchCase: false })
    cy.get('.exercise-weight').contains('45 lbs', { matchCase: false })

    cy.get('button.submit-btn').click()
    cy.get('button.submit-btn').click()
    cy.get('button.submit-btn').click()
    cy.get('button.submit-btn').click()
    cy.get('button.submit-btn').click()
    cy.completeSet(true)
    cy.completeSet(true)
    cy.completeSet(true)
    cy.completeSet(true)
    cy.completeSet()

    // Drop Set
    cy.get('button.add-warmup').click()
    cy.get('.exercise-title').contains('Squat Warmup', { matchCase: false })

    cy.get('button.submit-btn').click()
    cy.get('button.submit-btn').click()
    cy.get('button.submit-btn').click()
    cy.completeDropSet()
    cy.completeDropSet()
    cy.completeDropSet()
    cy.completeDropSet()
    cy.completeDropSet()
    cy.get('button.skip-rest-btn').click()

    // Timed Sets
    cy.get('button.add-warmup').click()
    cy.get('.exercise-title').contains('Squat Warmup', { matchCase: false })

    cy.get('button.submit-btn').click()
    cy.get('button.submit-btn').click()
    cy.get('button.submit-btn').click()
    cy.completeTimedSet(true)
    cy.completeTimedSet(true)
    cy.completeTimedSet(true)
    cy.completeTimedSet(true)
    cy.completeTimedSet()
  })
})
