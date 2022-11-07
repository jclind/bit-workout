describe('Workout Tests', () => {
  it('App Flow Test', () => {
    cy.callFirestore('update', `workoutData/${Cypress.env('TEST_UID')}`, {
      isWorkoutRunning: false,
      runningWorkout: {},
    })
    cy.login()
    cy.visit('/')
    cy.closeSplashScreen()

    // Dashboard Page
    cy.get('div.character').within(() => {
      cy.get('div.img-container img').should('exist')
      cy.get('div.username').should('contain.text', 'jesselind')
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
    cy.get("[class='past-workouts-container loading']").should('not.exist')
    cy.get('.past-workouts-item')
      .eq(0)
      .within(el => {
        cy.get(el).click()
        cy.get('.start-finish-time').contains('Timespan', { matchCase: false })
        cy.get('.coins').contains('Coins Earned', { matchCase: false })
        cy.get('.exp').contains('Experience Earned', { matchCase: false })
        cy.get('.workout-path-exercise')
          .eq(0)
          .within(el => {
            cy.get(el).click()
            cy.get('div.set-num').eq(0).contains('SET 1:', { matchCase: false })
          })
      })

    Cypress.Commands.add('selectPastWorkoutSortingOption', name => {
      cy.get('.sort-options .select').click()
      cy.get('.sort-options .select')
        .contains(name, { matchCase: false })
        .click()
      cy.get("[class='past-workouts-container loading']").should('not.exist')
      cy.get('.past-workouts-item').eq(0).should('exist')
    })
    cy.selectPastWorkoutSortingOption('oldest')
    cy.selectPastWorkoutSortingOption('longest')
    cy.selectPastWorkoutSortingOption('shortest')

    // Account page
    cy.visit('/account')
    cy.get('div.user-name').contains('Jesse Lind', { matchCase: false })
    cy.get('.info-tile')
      .eq(0)
      .should('contain', 'height')
      .and('contain', '5\' 11"')
    cy.get('.info-tile')
      .eq(1)
      .within(el => {
        cy.get(el).should('contain', 'weight')
        cy.get(el).click()
      })

    // Weight Chart Page
    cy.get('button.time-span-btn').each(el => {
      cy.get(el).click()
      cy.get('canvas').should('exist')
    })
    cy.get('button.add-weight').click()

    const randomWeight = (Math.floor(Math.random() * (2999 - 1500)) + 1500) / 10

    cy.get('.weight input').type(randomWeight)
    cy.get('button.add-weight-btn').click()
    cy.clickBackButton()

    cy.get('.Toastify__toast').click({ force: true })

    // Check that the account info tile contains the newly inputted weight
    cy.get('.info-tile').eq(1).contains(randomWeight)

    Cypress.Commands.add('clickSettingsButton', btnText => {
      cy.get('button.settings-button')
        .contains(btnText, { matchCase: false })
        .click()
    })

    cy.get('.settings-btn-container').click()

    // Settings Page
    // Manage Account
    cy.clickSettingsButton('Manage Account')

    const randomNumber = Math.floor(Math.random() * 10000)
    // Update Name
    cy.clickSettingsButton('Jesse Lind')
    const newName = `Jesse Lind ${randomNumber}`
    cy.get('input').clear().type(newName)
    cy.get('button.save.active').click()
    cy.get('button.settings-button').contains(newName)

    cy.get('.Toastify__toast').click({ force: true })

    // Update Username
    cy.clickSettingsButton('jesselind')
    const newUsername = `jesselind${randomNumber}`
    cy.get('input').clear().type(newUsername)
    cy.get('button.save.active').click()
    cy.get('button.settings-button').contains(newUsername)

    cy.clickBackButton()

    cy.get('.Toastify__toast').click({ force: true })

    // Workout Settings
    cy.clickSettingsButton('Workout Settings')
    cy.get('button.settings-button').contains('Chime', { matchCase: false })
    cy.clickBackButton()

    // Feedback Page
    cy.clickSettingsButton('Feedback')
    cy.get('.text').contains('Category', { matchCase: false })
    cy.get('.text').contains('Title', { matchCase: false })
    cy.get('.text').contains('Description', { matchCase: false })
    cy.clickBackButton()

    // Logout
    cy.clickSettingsButton('Logout')
    cy.get('button.signup').contains('GET STARTED', { matchCase: false })
  })
})
