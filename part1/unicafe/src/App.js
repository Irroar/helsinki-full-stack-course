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

const Statistic = ({clicks}) => {
  const all = clicks.good + clicks.neutral + clicks.bad;
  const avg = (clicks.good * 1 + clicks.bad * -1) / all;
  const positive = clicks.good * (100 / all);

  if (all === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }

  return (
    <>
      <table>
        <tbody>
          <StatisticLine text="good" value={clicks.good}/>
          <StatisticLine text="neutral" value={clicks.neutral}/>
          <StatisticLine text="bad" value={clicks.bad}/>

          <StatisticLine text="all" value={all}/>
          <StatisticLine text="average" value={isNaN(avg) ? 0: avg}/>
          <StatisticLine text="positive" value={isNaN(positive) ? 0 : positive + ' %'}/>
        </tbody>
      </table>
      
    </>
  );
}

const StatisticLine = ({text, value}) => {
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  );
}

const App = () => {
  const [clicks, setClicks] = useState({
    good: 0, neutral: 0, bad: 0
  });

  const sectionOneHeading = 'give feedback';
  const sectionTwoHeading = 'statistics';

  const handleGood = () => {
    setClicks({...clicks, good: clicks.good + 1});
  }

  const handleNeutral = () => {
    setClicks({...clicks, neutral: clicks.neutral + 1});
  }

  const handleBad = () => {
    setClicks({...clicks, bad: clicks.bad + 1});
  }

  return (
    <>
      <Header heading={sectionOneHeading}/>
      <Button heading={'good'} onClick={handleGood}/>
      <Button heading={'neutral'} onClick={handleNeutral}/>
      <Button heading={'bad'} onClick={handleBad}/>
      <Header heading={sectionTwoHeading}/>
      <Statistic clicks={clicks}/>
    </>
  );
}

export default App;
