import React from 'react'
import Person from './Person'

const PersonForm = (props) => {
    return (
        <form onSubmit={props.addPerson}>
            <Person newName={props.newName} handleNameChange={props.handleNameChange} newNumber={props.newNumber} handleNumberChange={props.handleNumberChange} />
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm

