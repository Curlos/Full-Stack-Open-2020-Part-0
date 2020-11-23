import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { incrementVotes } from '../reducers/anecdoteReducer'
import { notificationVote, emptyNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <div key={anecdote.id}>
        <div>
            {anecdote.content}
        </div>
        <div>
            has {anecdote.votes}
            <button onClick={handleClick}>vote</button>
        </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)

  return(
    <div>
        {anecdotes.map(anecdote =>
            <Anecdote 
            anecdote={anecdote}
            key={anecdote.id} 
            handleClick={() => {
              dispatch(incrementVotes(anecdote.id))
              dispatch(notificationVote(anecdote.content))
              setTimeout(() => dispatch(emptyNotification()), 5000)
            }}
            />
      )}
    </div>
  )
}

export default AnecdoteList