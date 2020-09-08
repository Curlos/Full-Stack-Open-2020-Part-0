import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// Gather statistics
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
      <div>{props.text[0]} {good}</div>
      <div>{props.text[1]} {neutral}</div>
      <div>{props.text[2]} {bad}</div>
      <div>all {total}</div>
      <div>average {average}</div>
      <div>positive {positive}%</div>
    </div>
  )
}

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

ReactDOM.render(<App />,
  document.getElementById('root')
)