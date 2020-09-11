import React from 'react'

const Persons = ({ peopleToShow, deletePerson }) => {
    return (
        <div>
            {peopleToShow.map(person =>
                <div key={person.name}>
                    {person.name} {person.number} <button onClick={deletePerson}>delete</button>
                </div>
            )}
        </div>
    )
}

export default Persons

