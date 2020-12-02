import React, { useState } from 'react'
import { useMutation } from '@apollo/client'

import { ALL_BOOKS, CREATE_BOOK } from '../queries'

const BookForm = ({ setError }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genres, setGenres] = useState([])

  const [ createBook ] = useMutation(CREATE_BOOK, {
    refetchQueries: [  {query: ALL_BOOKS} ],
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    createBook({
      variables: { title, author, published, genres }
    })

    setTitle('')
    setAuthor('')
    setPublished('')
    setGenres([])
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submit}>
        <div>
          title <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
        author <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          street <input
            value={street}
            onChange={({ target }) => setStreet(target.value)}
          />
        </div>
        <div>
          add genre <input
            value={genre}
            onChange={({ target }) => setGenres(...genres, target.value)}
          />
          genres: {genres}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default BookForm