import { useState } from 'react'

const Header = ({ heading }) => {
  return (
    <>
      <h1>{heading}</h1>
    </>
  );
}

const Button = ({heading, onClick}) => {
  return (
    <>
      <button onClick={onClick}>
        {heading}
      </button>
    </>
  )
}

const Info = ({property, amount}) => {
  return (
    <>
      <p>{property} {amount}</p>
    </>
  );
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const sectionOneHeading = 'give feedback';
  const sectionTwoHeading = 'statistics';

  const handleGood = () => {
    setGood(good + 1);
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  }

  const handleBad = () => {
    setBad(bad + 1);
  }

  return (
    <>
      <Header heading={sectionOneHeading}/>
      <Button heading={'good'} onClick={handleGood}/>
      <Button heading={'neutral'} onClick={handleNeutral}/>
      <Button heading={'bad'} onClick={handleBad}/>
      <Header heading={sectionTwoHeading}/>
      <Info property={'good'} amount={good}/>
      <Info property={'neutral'} amount={neutral}/>
      <Info property={'bad'} amount={bad}/>
    </>
  );
}

export default App;
