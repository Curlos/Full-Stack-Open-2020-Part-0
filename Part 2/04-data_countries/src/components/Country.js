import React from 'react'
import Weather from './Weather'

const Country = (props) => {
    const name = props.name
    const capital = props.capital
    const population = props.population
    const languages = props.languages
    const flag = props.flag

    return (
        <div>
            <h1>{name}</h1>
            <div>capital {capital}</div>
            <div>population {population}</div>

            <h2>languages</h2>
            <ul>
                {languages.map(language => <li key={language.name}>{language.name}</li>)}
            </ul>

            <img src={flag} width="120px" height="120px"></img>

            <Weather capital={capital} />
        </div>
    )
}

export default Country