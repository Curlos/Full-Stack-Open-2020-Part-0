const notificationReducer = (state = '', action) => {
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

  let timerID = 0

  export const setNotification = (message, time = 2) => {
    clearTimeout(timerID)

    return async dispatch => {
      timerID = setTimeout(() => {
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