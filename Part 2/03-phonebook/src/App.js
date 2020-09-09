import React, { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const addPerson = (event) => {
        event.preventDefault()

        const person = {
            name: newName,
            number: newNumber,
            id: persons.length + 1,
        }

        const names = persons.map(p => p.name)

        if (names.includes(person.name)) {
            alert(`${person.name} is already added to the phonebook`)
        } else {
            setPersons(persons.concat(person))
            setNewName('')
            setNewNumber('')
        }

    }

    const handleNameChange = (event) => {
        const name = event.target.value
        setNewName(name)
    }

    const handleNumberChange = (event) => {
        const number = event.target.value
        setNewNumber(number)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    number: <input value={newNumber} onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>

            {persons.map(person =>
                <div key={person.name}>{person.name} {person.number}</div>
            )}

        </div>
    )
}

export default App