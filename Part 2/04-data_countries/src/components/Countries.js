import React, { useState } from 'react'
import Country from './Country'

const Countries = ({ countriesToShow }) => {

    const [showCountryInfo, setShowCountryInfo] = useState('')

    const amountOfCountries = countriesToShow.map(country =>
        <div key={country.name}>{country.name}</div>
    ).length;

    return (
        <div>
            {
                amountOfCountries > 10 ? 'Too many matches, specify another filter'
                    : amountOfCountries === 1 ? countriesToShow.map(country =>
                        <Country name={country.name} capital={country.capital} population={country.population} languages={country.languages} flag={country.flag} />
                    ) : countriesToShow.map(country => {
                        return (
                            <div key={country.name}>
                                {country.name} <button onClick={() => setShowCountryInfo(country.name)}>show</button>
                                {showCountryInfo === country.name ? <Country name={country.name} capital={country.capital} population={country.population} languages={country.languages} flag={country.flag} /> : ''}
                            </div>
                        )

                    }
                    )
            }
        </div>
    )
}

export default Countries