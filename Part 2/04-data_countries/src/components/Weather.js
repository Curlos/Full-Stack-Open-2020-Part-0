import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
    const [weather, setWeather] = useState('')

    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

    useEffect(() => {
        console.log('effect')
        axios
            .get(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${capital}`)
            .then(response => {
                setWeather(response.data.current)
            })
    }, [])

    console.log(weather)

    if (weather != undefined) {
        return (
            <div>
                <h2>Weather in {capital}</h2>
                <b>temperature: </b> {weather.temperature}
                <div>
                    <img src={weather.weather_icons}></img>
                </div>
                <b>wind: </b> {weather.wind_speed} {weather.wind_dir}
            </div>
        )
    } else {
        return (
            <div>
                <h2>No weather data available for this country since there is no capital</h2>
            </div>
        )
    }
}

export default Weather