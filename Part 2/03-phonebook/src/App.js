import React, { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')

    const addName = (event) => {
        event.preventDefault()

        const nameObject = {
            name: newName,
            id: persons.length + 1,
        }

        const names = persons.map(person => person.name)

        if (names.includes(nameObject.name)) {
            alert(`${nameObject.name} is already added to the phonebook`)
        } else {
            console.log('hello poop')
            setPersons(persons.concat(nameObject))
            setNewName('')
        }

    }

    const handleNameChange = (event) => {
        const name = event.target.value
        console.log(name)
        setNewName(name)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addName}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>

            {persons.map(person =>
                <div key={person.name}>{person.name}</div>
            )}

        </div>
    )
}

export default App