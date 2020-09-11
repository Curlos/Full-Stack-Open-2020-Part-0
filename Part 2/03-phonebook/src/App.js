import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    useEffect(() => {
        console.log('effect')
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fulfilled', response.data)
                setPersons(response.data)
            })
    }, [])

    console.log('render', persons.length, 'people')

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

        axios
            .post('http://localhost:3001/persons', person)
            .then(response => {
                console.log(response)
            })
    }

    const handleNameChange = (event) => {
        const name = event.target.value
        setNewName(name)
    }

    const handleNumberChange = (event) => {
        const number = event.target.value
        setNewNumber(number)
    }

    const handleFilterChange = (event) => {
        const filter = event.target.value
        setNewFilter(filter)
    }

    const peopleToShow = newFilter === '' ? persons : persons.filter(p => p.name.toLowerCase().includes(newFilter.toLowerCase()))

    return (
        <div>
            <h2>Phonebook</h2>

            <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

            <h2>add a new</h2>

            <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

            <h2>Numbers</h2>

            <Persons peopleToShow={peopleToShow} />

        </div>
    )
}

export default App