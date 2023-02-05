import { useState, useEffect } from "react"
import Note from "../components/types/Note.type"
import { v4 as uuidv4 } from 'uuid'

const useNote = () => {
  const [notes, setNotes] = useState<Array<Note>>([])
  const [activeNote, setActiveNote] = useState<Note | null>(null)

  useEffect(() => {
    let note = localStorage.getItem('activeNote')
    if (note) setActiveNote(JSON.parse(note))

    let collection = localStorage.getItem('notes')
    if (collection) {
      setNotes([...JSON.parse(collection)])
    } else {
      localStorage.setItem('notes', JSON.stringify([]))
    }
  }, [])

  const createNote = () => {
    const newNote: Note = {
      id: uuidv4(),
      content: '',
      createdDate: new Date(),
      owner: 'user',
      title: ''
    }
    const newNotes = [...notes, newNote]

    setActiveNote(newNote)
    setNotes(newNotes)

    localStorage.setItem('activeNote', JSON.stringify(newNote))
    localStorage.setItem('notes', JSON.stringify(newNotes))
  }

  const deleteNote = () => {
    const newNotes = [...notes]
    newNotes.splice(notes.findIndex(note => note.id === activeNote?.id), 1)

    setActiveNote(null)
    setNotes(newNotes)

    localStorage.removeItem('activeNote')
    localStorage.setItem('notes', JSON.stringify(newNotes))
  }

  return {note: activeNote, createNote, deleteNote, notes}
}

export default useNote