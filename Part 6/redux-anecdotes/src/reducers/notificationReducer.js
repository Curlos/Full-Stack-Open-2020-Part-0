const initialState = 'initial notification'

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET':
        return action.message
      case 'EMPTY':
        return null
      default:
        return state
    }
  }


  export const notificationVote = (anecdote) => {
    return {
      type: 'VOTE',
      anecdote,
    }
  }

  export const notificationNewAnecdote = (anecdote) => {
    return {
      type: 'ADD',
      anecdote,
    }
  }

  export const setNotification = (message, time = 5) => {
    return async dispatch => {
      setTimeout(() => {
        dispatch(emptyNotification())
      }, time * 1000)
      dispatch({
        type: 'SET',
        message,
        time
      })
    }
  }

  export const emptyNotification = () => {
    return {
      type: 'EMPTY'
    }
  }
  
  export default notificationReducer