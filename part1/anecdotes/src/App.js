import { useState } from 'react'

const Header = ({heading}) => {
  return (
    <>
      <h1>{heading}</h1>
    </>
  );
}

const Button = ({text, onClick}) => {
  return (
    <>
      <button onClick={onClick}> {text} </button>
    </>
  );
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVote] = useState(Array(anecdotes.length).fill(0));
 
  const nextButtonHandler = () => {
    const newValue = Math.floor(Math.random() * anecdotes.length);
    setSelected(newValue);
  };

  const voteHandler = () => {
    const newValues = [...votes];
    newValues[selected] += 1;
    setVote(newValues);
  }

  const getMaxVotes = (arr) => {
    const max = Math.max(...arr);
    return arr.indexOf(max);
  }
  
  return (
    <>
      <Header heading="Anecdote of the day"/>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button text="vote" onClick={voteHandler}/>
      <Button text="next anecdote" onClick={nextButtonHandler}/>
      <Header heading="Anecdote with most votes"/>
      <p>{anecdotes[getMaxVotes(votes)]}</p>
    </>
  );
}

export default App;
