import React, { useState, useContext } from "react"
import { AlertContext } from "../context/alert/alertContext"
import { FirebaseContext } from "../context/firebase/firebaseContext"

export const Form = () => {

  const [value, setValue] = useState('')
  const alert = useContext(AlertContext)
  const firebase = useContext(FirebaseContext)

  const submitHandler = e => {
    e.preventDefault()

    if(value.trim()) {
      firebase.addNote(value.trim()).then(() => {
        alert.show("Заметка была создана", 'success')
      }).catch( () => {
        alert.show("WTF?",'danger')
      })
      setValue('')
    } else {
      alert.show("Введите название заметки")
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="form-group">
        <input 
        type="text" 
        className="form-control"
        placeholder="Writing..."
        value={value}
        onChange={e => setValue(e.target.value)}
        />
      </div>
    </form>
  )
}