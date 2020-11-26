import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import Store from './components/Store'
import {
  BrowserRouter as Router,
} from "react-router-dom"
import './styles.css'

ReactDOM.render(
  <Router>
    <Provider store={Store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
)