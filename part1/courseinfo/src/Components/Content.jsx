import Part from "./Part";

const Content = (props) => {
  return (
    <div>
      {props.data.map((part, index) => {
        return (
          <Part key={index} part={part.title} exercises={part.exercisesNum} />
        );
      })}
    </div>
  );
};

export default Content;
