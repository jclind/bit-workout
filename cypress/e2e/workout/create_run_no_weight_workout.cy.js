describe('Workout Tests', () => {
  it('Create No Weight Workout Test', () => {
    cy.callFirestore('update', `workoutData/${Cypress.env('TEST_UID')}`, {
      isWorkoutRunning: false,
      runningWorkout: {},
    })
    localStorage.clear()
    cy.login()
    cy.visit('/workout')
    cy.get('.create-workout-link', { timeout: 10000 }).click()
    cy.contains('Add Exercises')

    // Add Exercises Page

    // Exercise 1
    cy.get('button.select-exercise').click()
    cy.get('.dropdown input.search-input').type('other')
    cy.get('div.exercise-cell').eq(1).click()
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
    cy.get('button.next-btn').trigger('click')

    // Workout Rest Time Page
    cy.get('button.next-btn').trigger('click')

    // Workout Info Page
    const workoutName = `Test ${new Date().getTime()}`
    cy.get('.workout-title input').type(workoutName)
    cy.get('.workout-description textarea').type(
      'Description testing: Eiusmod irure pariatur adipisicing proident. Exercitation officia sunt excepteur et labore anim esse excepteur laboris labore id laborum esse.'
    )
    cy.get('button.next-btn').trigger('click')

    // Workout Type Page
    cy.get('button.temp').click()
    cy.get('button.next-btn').trigger('click')

    // Active Workout
    cy.get('div.exercise-weight').contains('no weights', {
      matchCase: false,
    })
    cy.validateWorkoutPath(1)

    cy.completeSet(true)
    cy.completeSet(true)
    cy.completeSet(true)
    cy.completeSet(true)
    cy.completeSet()

    cy.get('.workout-complete').should('be.visible')
    cy.get('button.back-home-btn').click()
  })
})
