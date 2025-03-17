import Header from "./Components/Header";
import Content from "./Components/Content";
import Total from "./Components/Total";

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  const data = [
    { title: part1, exercisesNum: exercises1 },
    { title: part2, exercisesNum: exercises2 },
    { title: part1, exercisesNum: exercises3 },
  ];

  return (
    <div>
      <Header course={course} />
      <Content data={data} />
      <Total exercises={[exercises1, exercises2, exercises3]} />
    </div>
  );
};

export default App;
