import { useState, useEffect } from "react";
import { getAll, createDiary } from "./services/diaryService";
import { DiaryEntry, NewDiaryEntry } from "../../IlariFlightDiaries/src/types";
import Diaries from "./components/Diaries";
import DiaryForm from "./components/DiaryForm";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    (async () => {
      const allDiaries = await getAll()
      setDiaries(allDiaries)
    })()
  }, [])

  const createEntry = async (newDiaryEntry: NewDiaryEntry) => {
    const newDiary: DiaryEntry = await createDiary(newDiaryEntry)
    setDiaries(diaries.concat(newDiary))
  }

  return (
    <div>
      <DiaryForm createEntry={createEntry}/>
      <Diaries diaries={diaries} />
    </div>
  )
}

export default App