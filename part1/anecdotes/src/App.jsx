import { useEffect, useState } from 'react'


function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [index, setIndex] = useState(0);
  const [votes, setVotes] = useState(new Array(8).fill(0));
  const [maxVotes, setMaxVotes] = useState(-1);
  const handleClick = () => {
    const rn = Math.floor(Math.random() * anecdotes.length);
    setIndex(rn);
    console.log(index);
  }
  const handleVotes = () => {
    const copiedVotes = [...votes];
    copiedVotes[index] += 1;
    setVotes(copiedVotes);
  }

  const Anecdote = ({ anecdote, points }) => {
    return (
      <>
        <p>{anecdote}</p>
        <p>has {points} votes</p>

      </>

    )
  }

  const getMaxPoints = () => {
    if (Math.max(...votes) === 0) {
      setMaxVotes(-1);
    } else {
      setMaxVotes(votes.indexOf(Math.max(...votes)))
    }
  }
  useEffect(() => {
    getMaxPoints();
    console.log("USeeffect")
  })
  return (
    <div>
      <h1>Anecdotes Application</h1>
      <Anecdote anecdote={anecdotes[index]} points={votes[index]} />
      <button onClick={handleClick}>Random Anecdotes</button>
      <button onClick={handleVotes}>Vote</button>
      <p>Anecdote with maximum votes is </p>
      {maxVotes !== -1 && <Anecdote anecdote={anecdotes[maxVotes]} points={votes[maxVotes]} />}
    </div>
  )
}

export default App
