// // ***********************************************************
// // This example support/e2e.js is processed and
// // loaded automatically before your test files.
// //
// // This is a great place to put global configuration and
// // behavior that modifies Cypress.
// //
// // You can change the location of this file or turn off
// // automatically serving support files with the
// // 'supportFile' configuration option.
// //
// // You can read more here:
// // https://on.cypress.io/configuration
// // ***********************************************************

// // Import commands.js using ES2015 syntax:
import '../commands'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'
import 'firebase/compat/firestore'
import { attachCustomCommands } from 'cypress-firebase'

const fbConfig = {
  apiKey: 'AIzaSyBd6q8SnjOSvT6ZB7ANUm68s5OcrifcQy4',
  authDomain: 'workout-app-30261.firebaseapp.com',
  projectId: 'workout-app-30261',
  storageBucket: 'workout-app-30261.appspot.com',
  messagingSenderId: '656690318764',
  appId: '1:656690318764:web:848b6e82f5ec93f348fe09',
  measurementId: 'G-ZEE8NWY6J2',
}

firebase.initializeApp(fbConfig)

attachCustomCommands({ Cypress, cy, firebase })

// // Alternatively you can use CommonJS syntax:
// // require('./commands')
