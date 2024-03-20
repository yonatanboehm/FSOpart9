interface Part {
  name: string
  exerciseCount: number
}

const Header = ({header}: {header: string}) => {
  return <h1>{header}</h1>
}

const Content = ({courseParts}: {courseParts: Part[]}) => {
  return (
    <div>
      {courseParts.map((part: Part) => {
        return (
          <p>
            {part.name} {part.exerciseCount}
          </p>
        )
      })}
    </div>
  )
}

const Total = ({total}: {total: number}) => {
  return <p>Number of exercises {total}</p>
}

const App = () => {

  const courseName = "Half Stack application development";
  const courseParts = [
  {
    name: "Fundamentals",
    exerciseCount: 10
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14
  }
  ];
  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header header={courseName}/>
      <Content courseParts={courseParts} />
      <Total total={totalExercises} />
    </div>
  );
};

export default App;
