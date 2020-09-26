import React from 'react'

const Person = (props) => {
    return (
        <div>
            <div>
                name: <input value={props.newName} onChange={props.handleNameChange} />
            </div>
            <div>
                number: <input value={props.newNumber} onChange={props.handleNumberChange} />
            </div>
        </div>
    )
}

export default Person

