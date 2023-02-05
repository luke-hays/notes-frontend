import { useState, useEffect } from "react"
import Note from "../components/types/Note.type"
import { v4 as uuidv4 } from 'uuid'

const useNote = () => {
  const [activeNote, setActiveNote] = useState<Note | null>(null)

  useEffect(() => {
    let note = localStorage.getItem('activeNote')
    if (note) setActiveNote(JSON.parse(note))
  }, [])

  const createNote = () => {
    const newNote: Note = {
      id: uuidv4(),
      content: '',
      createdDate: new Date(),
      owner: 'user'
    }
  
    localStorage.setItem('activeNote', JSON.stringify(newNote))
    setActiveNote(newNote)
  }

  const deleteNote = () => {
    localStorage.removeItem('activeNote')
    setActiveNote(null)
  }

  return {note: activeNote, createNote, deleteNote}
}

export default useNote