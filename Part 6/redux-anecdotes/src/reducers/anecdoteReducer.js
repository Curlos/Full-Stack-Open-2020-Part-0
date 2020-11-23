import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state.map(obj => {
        return (
          obj.id === action.data.id ? {
            ...obj, 
            votes: obj.votes + 1
          } : obj
        )
      })
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANEC':
      return action.data
    default: 
      return state
  }
}

export const incrementVotes = (id) => {
  return {
    type: 'INCREMENT',
    data: { id }
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    console.log(newAnecdote)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANEC',
      data: anecdotes
    })
  }
}

export default anecdoteReducer