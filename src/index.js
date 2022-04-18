import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './globals.scss'
import 'normalize.css'
import { Provider } from 'react-redux'
import store from './redux/store'
import Auth from './Auth'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
