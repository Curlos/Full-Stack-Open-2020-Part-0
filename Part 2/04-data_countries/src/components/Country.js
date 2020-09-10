import React from 'react'

const Country = (props) => {
    const name = props.name
    const capital = props.capital
    const population = props.population
    const languages = props.languages
    const flag = props.flag

    console.log(props)
    return (
        <div>
            <h1>{name}</h1>
            <div>capital {capital}</div>
            <div>population {population}</div>

            <h2>languages</h2>
            <ul>
                {languages.map(language => <li>{language.name}</li>)}
            </ul>

            <img src={flag} width="120px" height="120px"></img>
        </div>
    )
}

export default Country