const initialState = 'initial notification'

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'VOTE':
        return `you voted '${action.anecdote}'`
      case 'ADD':
        return `you added '${action.anecdote}'`
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

  export const emptyNotification = () => {
    return {
      type: 'EMPTY'
    }
  }
  
  export default notificationReducer