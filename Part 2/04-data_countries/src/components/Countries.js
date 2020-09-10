import React from 'react'
import Country from './Country'

const Countries = ({ countriesToShow }) => {

    const amountOfCountries = countriesToShow.map(country =>
        <div key={country.name}>{country.name}</div>
    ).length;

    if (amountOfCountries > 10) {
        return <div>'Too many matches, specify another filter'</div>
    } else if (amountOfCountries === 1) {
        countriesToShow.map(country =>
            <div key={country.name}>{country.name}</div>
        )
    } else if (amountOfCountries > 1 && amountOfCountries <= 10) {
        countriesToShow.map(country =>
            <div key={country.name}>{country.name}</div>
        )
    }

    return (
        <div>
            {
                amountOfCountries > 10 ? 'Too many matches, specify another filter'
                    : amountOfCountries === 1 ? countriesToShow.map(country =>
                        <Country name={country.name} capital={country.capital} population={country.population} languages={country.languages} flag={country.flag} />
                    ) : countriesToShow.map(country =>
                        <div key={country.name}>{country.name}</div>
                    )
            }
        </div>
    )
}

export default Countries