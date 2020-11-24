import React from 'react'
import { connect } from 'react-redux'
import { incrementVotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

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

const AnecdoteList = (props) => {
  return(
    <div>
        {props.anecdotes.map(anecdote =>
            <Anecdote 
            anecdote={anecdote}
            key={anecdote.id} 
            handleClick={() => {
              props.incrementVotes(anecdote)
              props.setNotification(`you voted '${anecdote.content}'`)
            }}
            />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes
  }
}

const mapDispatchToProps = {
  incrementVotes,
  setNotification
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdotes