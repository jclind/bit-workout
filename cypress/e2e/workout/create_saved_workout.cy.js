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

    // Exercise 1
    cy.get('button.select-exercise').click()
    cy.get('div.dropdown-cell').contains('squat', { matchCase: false }).click()

    cy.get('.exercise-type-selector').click()
    cy.get('.exercise-type-selector #react-select-3-option-0').click()
    cy.get('.path-item input').type(5)
    cy.get('button.add-set-btn').click().click().click().click().click()
    cy.get('.path-item').eq(0).children('button.delete-item-btn').click()
    cy.get('.path-item').should('have.length', 5)
    cy.get('button.add-description-btn').click()
    cy.get('textarea.description').type(
      'Do consequat minim tempor elit nisi non cillum Lorem Lorem ex voluptate eu. Magna nisi veniam dolore ipsum.',
      { delay: 2 }
    )

    // Exercise 2
    cy.get('button.add-exercise-btn').click()
    cy.get('.exercise-item')
      .eq(1)
      .within(() => {
        cy.get('button.select-exercise').click()
        cy.get('.dropdown input.search-input').type('deadlift')
        cy.get('div.exercise-cell').eq(0).click()

        cy.get('.exercise-type-selector').click()
        cy.get('.exercise-type-selector')
          .get('[id^=react-select-][id$=-option-1]')
          .click()

        cy.get('input.start-weight-input').type(80)
        cy.get('input.end-weight-input').type(60)
        cy.get('input.weight-decrease-input').type(5)
        cy.get('button.add-description-btn').click()
        cy.get('textarea.description').type(
          'Dolore qui duis cillum et veniam enim reprehenderit. Sunt in non incididunt in. Aute qui pariatur aute occaecat commodo consequat occaecat id aute Lorem sint minim sunt.',
          { delay: 2 }
        )
      })

    // Exercise 3
    cy.get('button.add-exercise-btn').click()
    cy.get('.exercise-item')
      .eq(2)
      .within(() => {
        cy.get('button.select-exercise').click()
        cy.get('.dropdown input.search-input').type('bench press')
        cy.get('div.exercise-cell').eq(0).click()

        cy.get('.exercise-type-selector').click()
        cy.get('.exercise-type-selector')
          .get('[id^=react-select-][id$=-option-2]')
          .click()

        cy.get('input.minutes-input').type(1)
        cy.get('input.seconds-input').type(30)
        cy.get('input.weight-input').type(100)
        cy.get('button.add-set-btn').click().click().click()
        cy.get('.path-item')
          .eq(0)
          .within(() => {
            cy.get('button.delete-item-btn').click()
          })
        cy.get('.path-item').should('have.length', 3)
        cy.get('button.add-description-btn').click()
        cy.get('textarea.description').type(
          'Irure dolor in velit do enim aute ullamco consequat incididunt est incididunt ipsum excepteur tempor. Dolor magna cupidatat velit duis id est fugiat anim. Proident exercitation nostrud nostrud eiusmod enim fugiat.',
          { delay: 2 }
        )
      })

    cy.get('button.next-btn').click()

    // Workout Rest Time Page
  })
})
