import { CoursePart, courseParts } from "./types"
import { useState } from "react"

const Header = ({header}: {header: string}) => {
  return <h1>{header}</h1>
}

const Part = ({part}: {part: CoursePart}) => {
  switch (part.kind) {
    case "background":
      return (
        <div>
          Info: <i>{part.description}</i>, {part.backgroundMaterial}
        </div>
      )
    case "basic":
      return (
        <div>
          Info: <i>{part.description}</i>
        </div>
      )  
    case "group":
      return (
        <div>
          Project count: <i>{part.groupProjectCount}</i>
        </div>
      )
    case "special":
      return (
        <div>
          <p>Info: <i>{part.description}</i></p>
          <p>Required skills: {part.requirements.join(', ')}</p>
        </div>
      )
    default:
      return null 
  }
}

const Content = ({courseParts}: {courseParts: CoursePart[]}) => {
  return (
    <ul>
      {courseParts.map((part: CoursePart) => {
        return (
          <li>
            <p>
              <strong>{part.name}</strong>, total exercises: {part.exerciseCount}
            </p>
            <p>
              <Part part={part}/>
            </p>
          </li>
        )
      })}
    </ul>
  )
}

const Total = ({total}: {total: number}) => {
  return <p>Number of exercises {total}</p>
}

const App = () => {
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState<CoursePart[]>([]);

  const courseName: string = "Half Stack application development";
  
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
