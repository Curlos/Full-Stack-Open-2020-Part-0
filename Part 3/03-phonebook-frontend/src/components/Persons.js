import React from 'react'

const Persons = ({ peopleToShow, deletePerson }) => {
    return (
        <div>
            {peopleToShow.map(person =>
                <div key={person.name}>
                    {person.name} {person.number} <button onClick={() => window.confirm(`Delete ${person.name}?`) ? deletePerson(person.id) : ''}>delete</button>
                </div>
            )}
        </div>
    )
}

export default Persons

