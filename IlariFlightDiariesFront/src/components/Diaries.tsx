import { DiaryEntry } from "../../../IlariFlightDiaries/src/types"

const Diaries = ({diaries}: {diaries: DiaryEntry[]}) => {
  return (
    <div>
      <h1>Diary entries:</h1>
      {diaries.map((diary: DiaryEntry) => {
        return (
          <div key={diary.id}>
            <h2>{diary.date}</h2>
            <p>visibility: {diary.visibility}</p>
            <p>weather: {diary.weather}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Diaries