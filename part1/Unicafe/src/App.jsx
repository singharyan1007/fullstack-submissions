import { useState } from 'react'


const Button = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )

}
const Statistics = ({ good, bad, neutral, all, average, positive }) => {

  if (good == 0 && bad == 0 && neutral == 0) {
    return (
      <h1>Give the Feedback</h1>
    )
  } else {
    return (
      <table>
        <tbody>
          <tr><StatisticLine text="good" value={good} /></tr>
          <tr><StatisticLine text="neutral" value={neutral} /></tr>
          <tr><StatisticLine text="bad" value={bad} /></tr>
          <tr><StatisticLine text="all" value={all} /></tr>
          <tr><StatisticLine text="average" value={isNaN(average) ? 0 : average} /></tr>
          <tr><StatisticLine text="positive" value={isNaN(positive) ? 0 : positive + " %"} /></tr>


        </tbody>


      </table>
    )
  }

}

const StatisticLine = ({ text, value }) => {
  return (
    <td>{text} {value}</td>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const handleGood = () => {
    setGood(good + 1);
  }
  const handleBad = () => {
    setBad(bad + 1);
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1);
  }

  const all = good + neutral + bad;
  const average = ((good - bad) / all) * 100;
  const positive = ((good / all)) * 100;
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text={"Good"} handleClick={() => handleGood()} />
      <Button text={"Bad"} handleClick={() => handleBad()} />
      <Button text={"Neutral"} handleClick={() => handleNeutral()} />
      <h1>Statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} all={all} average={average} positive={positive} />
    </div>
  )
}

export default App
