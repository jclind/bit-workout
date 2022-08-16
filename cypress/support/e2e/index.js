import '../commands'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'
import 'firebase/compat/firestore'
import { attachCustomCommands } from 'cypress-firebase'

const fbConfig = {
  apiKey: Cypress.env('API_KEY'),
  authDomain: Cypress.env('AUTH_DOMAIN'),
  projectId: Cypress.env('FIREBASE_PROJECT_ID'),
  storageBucket: Cypress.env('STORAGE_BUCKET'),
  messagingSenderId: Cypress.env('MESSAGING_SENDER_ID'),
  appId: Cypress.env('APP_ID'),
  measurementId: Cypress.env('MEASUREMENT_ID'),
}

firebase.initializeApp(fbConfig)

attachCustomCommands({ Cypress, cy, firebase })
