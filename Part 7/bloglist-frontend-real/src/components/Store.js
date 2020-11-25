import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogReducer from '../reducers/blogReducer'
import notificationReducer from '../reducers/notificationReducer'

const reducer = combineReducers({
    blogs: blogReducer,
    notifications: notificationReducer,
})

const Store = createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk)
))

export default Store