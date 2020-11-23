import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from '../reducers/anecdoteReducer'

const Store = createStore(reducer)

export default Store