import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    useEffect(() => {
        personService
            .getPeople()
            .then(initialPeople => {
                setPersons(initialPeople)
            })
    }, [])

    const deletePerson = (id) => {
        personService
            .deletePerson(id)
            .then(() => {
                let newArr = persons.filter(person => person.id !== id)
                setPersons(newArr)
            })
    }

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
            // Save the numbers that are added to the backend server
            personService
                .create(person)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                })
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

            <Persons peopleToShow={peopleToShow} deletePerson={deletePerson} />

        </div>
    )
}

export default App