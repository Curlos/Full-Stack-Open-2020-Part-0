import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import { useMutation } from '@apollo/client'

import { ALL_AUTHORS, EDIT_YEAR } from '../queries'

const BirthYearForm = ({show, authors, setError}) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const authorNames = authors.map(author => {
    return (
      {value: author.name, label: author.name}
    )
  });
  console.log(authorNames)

  const [ changeBorn, result ] = useMutation(EDIT_YEAR, {
    refetchQueries: [ {query: ALL_AUTHORS} ],
  })

  const submit = (event) => {
    event.preventDefault()

    changeBorn({ variables: { name, born } })

    setName('')
    setBorn('')
  }

  const handleNameChange = (selectedName) => {
    setName(selectedName.value)
  }

  useEffect(() => {
    if(result.data && result.data.editAuthor === null) {
      setError('author not found')
    }
  }, [result.data])

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>Set birthyear</h2>

      <form onSubmit={submit}>
        <Select
          value={name}
          onChange={handleNameChange}
          options={authorNames}
        />
        <div>
          born <input
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default BirthYearForm