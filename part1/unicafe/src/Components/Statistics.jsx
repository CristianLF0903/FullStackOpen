const Statistics = (props) => {
  return (
    <div>
      <h1>Statistics</h1>
      {props.total === 0 ? (
        <p>No feedback given</p>
      ) : (
        <>
          <p>good {props.good}</p>
          <p>neutral {props.neutral}</p>
          <p>bad {props.bad}</p>
          <p>all {props.total}</p>
          <p>average {props.avg}</p>
          <p>positive {props.percent} %</p>
        </>
      )}
    </div>
  );
};

export default Statistics;
