import admin from 'firebase-admin'
import { defineConfig } from 'cypress'
import { plugin as cypressFirebasePlugin } from 'cypress-firebase'

const cypressConfig = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      cypressFirebasePlugin(on, config, admin)
      // e2e testing node events setup code
    },
    excludeSpecPattern: process.env.CI ? 'cypress/e2e/all.cy.js' : [],
  },
  projectId: 'ttvr1j',
})

export default cypressConfig