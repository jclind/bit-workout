describe('Workout Tests', () => {
  before(() => {
    cy.callFirestore('update', `workoutData/${Cypress.env('TEST_UID')}`, {
      isWorkoutRunning: false,
      runningWorkout: {},
    })
    localStorage.clear()
  })

  it('Create Workout Test', () => {
    cy.login()
    cy.visit('/workout')
    cy.get('.create-workout-link').click()
    cy.contains('Add Exercises')

    // Select Exercise
    cy.get('button.select-exercise').click()
    cy.get('div.dropdown-cell').contains('squat', { matchCase: false }).click()

    cy.get('.exercise-type-selector').click()
    cy.get('.exercise-type-selector #react-select-3-option-0').click()
    cy.get('.path-item input').type(5)
    cy.get('button.add-set-btn').click().click().click().click().click()
    cy.get('.path-item').first().children('button.delete-item-btn').click()
    cy.get('.path-item').should('have.length', 5)

    cy.get('button.add-exercise-btn').click()
    cy.get('.exercise-item')
      .eq(1)
      .within(() => {
        cy.get('button.select-exercise').click()
        cy.get('.dropdown input.search-input').type('deadlift')
        cy.get('div.exercise-cell').eq(0).click()
      })

    // cy.get('.exercise-item div.dropdown-cell input.search-input')
    //   .eq(1)
    //   .type('deadlift')
    // cy.get('.exercise-item')
    //   .eq(1)
    //   .within(() => {
    //     cy.get('div.exercise-cell').eq(0).click()
    //   })
  })
})
