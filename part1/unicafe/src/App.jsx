import { useState } from "react";
import Statistics from "./Components/Statistics";
import Button from "./Components/Button";

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onGoodClick = () => {
    setGood(good + 1);
  };

  const onNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const onBadClick = () => {
    setBad(bad + 1);
  };

  const total = good + bad + neutral;
  const average = total === 0 ? 0 : (good - bad) / total;
  const goodPercent = total === 0 ? 0 : (good / total) * 100;

  return (
    <div>
      {/* Buttons */}
      <div>
        <h1>Give Feedback</h1>
        <Button handleClick={onGoodClick}>Good</Button>
        <Button handleClick={onNeutralClick}>Neutral</Button>
        <Button handleClick={onBadClick}>Bad</Button>
      </div>
      {/* Statistics */}
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        avg={average}
        percent={goodPercent}
      />
    </div>
  );
};

export default App;
