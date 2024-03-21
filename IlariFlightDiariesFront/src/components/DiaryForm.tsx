import { SyntheticEvent, useState } from "react"
import Notification from "./Notification"

const DiaryForm = ({createEntry, notification}: {createEntry: Function, notification: string}) => {
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')

  const handleCreate = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const diaryToAdd = {
      date,
      visibility,
      weather,
      comment
    }
    setDate('')
    setComment('')
    createEntry(diaryToAdd)
  }

  return (
    <div>
      <h1>Add new entry</h1>
      <Notification notification={notification} />
      <form onSubmit={handleCreate}>
        <p>date <input 
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)} />
        </p>
        <p onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setVisibility(event.target.value)}}>visibility:
          great<input type="radio" name="visibility" value="great"/>
          good<input type="radio" name="visibility" value="good"/>
          ok<input type="radio" name="visibility" value="ok"/>
          poor<input type="radio" name="visibility" value="poor"/>
        </p>
        <p onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setWeather(event.target.value)}}>weather:
          sunny<input type="radio" name="weather" value="sunny"/>
          windy<input type="radio" name="weather" value="windy"/>
          rainy<input type="radio" name="weather" value="rainy"/>
          cloudy<input type="radio" name="weather" value="cloudy"/>
          stormy<input type="radio" name="weather" value="stormy"/>
        </p>
        <p>comment <input value={comment} onChange={(event) => setComment(event.target.value)}/></p>
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default DiaryForm