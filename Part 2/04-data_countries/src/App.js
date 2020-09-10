import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newCountry, setNewCountry] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log(response.data.forEach(country => console.log(country.flag)))
        setCountries(response.data)
      })
  }, [])


  const handleFilterChange = (event) => {
    const filter = event.target.value
    console.log(filter)
    setNewFilter(filter)
  }

  const countriesToShow = newFilter === '' ? countries : countries.filter(c => c.name.toLowerCase().includes(newFilter.toLowerCase()))

  console.log(countriesToShow)



  return (
    <div>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <Countries countriesToShow={countriesToShow} />
    </div>
  )
}

export default App 