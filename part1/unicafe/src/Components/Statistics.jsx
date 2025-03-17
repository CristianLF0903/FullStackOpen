import StatisticLine from "./StatisticLine";

const Statistics = (props) => {
  return (
    <div>
      <h1>Statistics</h1>
      {props.total === 0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            <StatisticLine text="good" value={props.good} />
            <StatisticLine text="neutral" value={props.neutral} />
            <StatisticLine text="bad" value={props.bad} />
            <StatisticLine text="total" value={props.total} />
            <StatisticLine text="average" value={props.avg} />
            <StatisticLine text="positive" value={props.percent + " %"} />
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Statistics;
