import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <ButtonHeader />
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />

      <StatisticsHeader />
      <Statistics value={good} text="good" />
      <Statistics value={neutral} text="neutral" />
      <Statistics value={bad} text="bad" />
    </div>
  )
}

const ButtonHeader = (props) => {
  return (
    <div>
      <h1>give feedback</h1>
    </div>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticsHeader = (props) => {
  return (
    <div>
      <h1>statistics</h1>
    </div>
  )
}

const Statistics = (props) => {
  return (
    <div>
      {props.text} {props.value}
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)