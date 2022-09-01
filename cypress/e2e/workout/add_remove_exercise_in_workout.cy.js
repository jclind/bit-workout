describe('Workout Tests', () => {
  it('Follow All Types 3 Exercises Workout', () => {
    cy.callFirestore('update', `workoutData/${Cypress.env('TEST_UID')}`, {
      isWorkoutRunning: false,
      runningWorkout: {},
    })
    cy.login()
    cy.visit('/workout')
    cy.get('button.selection-btn').contains('Created').click()

    // Start Workout
    cy.clickWorkoutSelectionStartButtonByText('All Types 3 Exercises').click()

    cy.get('button.view-workout-path').click()
    cy.get('button.add-exercise').click()
    cy.get('button.select-exercise').click()
    cy.get('input.search-input').type('incline dumbbell curl')
    cy.get('.dropdown-cell.exercise-cell').eq(0).click()
    cy.get('.exercise-type-selector').click()
    cy.get('.exercise-type-selector #react-select-3-option-0').click()

    cy.get('input.reps-input').type('5')
    cy.get('button.add-set-btn').click().click().click().click()

    cy.get('button.confirm-btn').click()
    cy.get('.workout-path-exercise')
      .eq(2)
      .within(() => {
        cy.get('button.remove-exercise-btn').click()
      })

    cy.get('.confirm-remove-exercise-modal button.confirm-btn').click()

    cy.get('.workout-path-modal.overlay').click(15, 15)

    // Complete Workout
    // Exercise 1
    cy.completeSet(true)
    cy.completeSet(true)
    cy.completeSet(true)
    cy.completeSet(true)
    cy.completeSet()

    // Exercise 2
    cy.contains('(Drop Sets)', { matchCase: false })
    cy.completeDropSet()
    cy.completeDropSet()
    cy.completeDropSet()
    cy.completeDropSet()
    cy.completeDropSet()
    cy.get('button.skip-rest-btn').click()

    // Exercise 3
    cy.contains('(Straight Sets)', { matchCase: false })
    cy.completeSet(true)
    cy.completeSet(true)
    cy.completeSet(true)
    cy.completeSet(true)
    cy.completeSet()

    cy.get('.workout-complete.page').should('be.visible')
    cy.get('button.back-home-btn').click()
  })
})
