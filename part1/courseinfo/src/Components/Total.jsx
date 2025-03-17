const Total = (props) => {
  // Suma todos los valores del array exercises
  const total = props.exercises.reduce((acc, curr) => acc + curr, 0);

  return <p>Number of exercises {total}</p>;
};

export default Total;
