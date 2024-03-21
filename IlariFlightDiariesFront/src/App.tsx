import { useState, useEffect } from "react";
import { getAll, createDiary } from "./services/diaryService";
import { DiaryEntry, NewDiaryEntry } from "../../IlariFlightDiaries/src/types";
import Diaries from "./components/Diaries";
import DiaryForm from "./components/DiaryForm";
import Notification from "./components/Notification";
import { AxiosError } from "axios";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [notification, setNotification] = useState('')

  useEffect(() => {
    (async () => {
      const allDiaries = await getAll()
      setDiaries(allDiaries)
    })()
  }, [])

  const createEntry = async (newDiaryEntry: NewDiaryEntry) => {
    try {
      const newDiary: DiaryEntry = await createDiary(newDiaryEntry)
      setDiaries(diaries.concat(newDiary))
    } catch(error: unknown) {
      console.error(error)
      if (error instanceof AxiosError) {
        setNotification(error?.response?.data)
      } else {
        setNotification('Error: something went wrong')
      }
      setTimeout(() => {
        setNotification('')
      }, 5000)
    }
  }

  return (
    <div>
      <DiaryForm createEntry={createEntry} notification={notification}/>
      <Diaries diaries={diaries} />
    </div>
  )
}

export default App