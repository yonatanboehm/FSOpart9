import { useState } from "react"

const DiaryForm = ({createEntry}: {createEntry: Function}) => {
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
    setVisibility('')
    setWeather('')
    setComment('')
    createEntry(diaryToAdd)
  }

  return (
    <div>
      <h1>Add new entry</h1>
      <form onSubmit={handleCreate}>
        <p>date <input value={date} onChange={(event) => setDate(event.target.value)}/></p>
        <p>visibility <input value={visibility} onChange={(event) => setVisibility(event.target.value)}/></p>
        <p>weather <input value={weather} onChange={(event) => setWeather(event.target.value)}/></p>
        <p>comment <input value={comment} onChange={(event) => setComment(event.target.value)}/></p>
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default DiaryForm