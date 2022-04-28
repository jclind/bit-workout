import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './globals.scss'
import 'normalize.css'
import { Provider } from 'react-redux'
import store from './redux/store'
import Auth from './Auth'
import { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <SkeletonTheme baseColor='#3a495e' highlightColor='#406f86'>
        <Auth />
        <App />
      </SkeletonTheme>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
