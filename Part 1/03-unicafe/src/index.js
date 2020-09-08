import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = (good + neutral + bad) / 3

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
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />

      <h1>statistics</h1>
      <Statistics values={[good, neutral, bad]} text={["good", "neutral", "bad"]} />
    </div>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistic = ({ text, value }) => {
  if (text === 'positive') {
    return (
      <div>
        {text} {value}%
      </div>
    )
  }

  return (
    <div>
      {text} {value}
    </div>
  )
}

const Statistics = (props) => {
  const good = props.values[0]
  const neutral = props.values[1]
  const bad = props.values[2]
  const total = good + neutral + bad;
  const average = (good + neutral + bad) / 3;
  let positive = !isNaN(good / total) ? good / total * 100 : 0;

  if (total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <div>
      <Statistic text="good" value={good} />
      <Statistic text="neutral" value={neutral} />
      <Statistic text="bad" value={bad} />
      <Statistic text="total" value={good + neutral + bad} />
      <Statistic text="average" value={total / 3} />
      <Statistic text="positive" value={!isNaN(good / total) ? good / total * 100 : 0} />
    </div>
  )
}


ReactDOM.render(<App />,
  document.getElementById('root')
)