import { createContext, useContext } from "react"
import { useState, useEffect } from "react"
import Note from "../types/Note.type"
import { v4 as uuidv4 } from 'uuid'

let NotesContext = createContext({} as any)

const NotesProvider = ({children}: {children: any}) => {
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

  const contextValue = {
    note: activeNote,
    setActiveNote,
    notes,
    createNote,
    deleteNote,
    setNote: setActiveNote,
    setNotes

  }

  return (
    <NotesContext.Provider value={contextValue}>
      {children}
    </NotesContext.Provider>
  )
}

const useNotesContext = () => {
  const context = useContext(NotesContext)
  if (!context) throw new Error('Unable to retrieve notes context')
  return context
}

export {useNotesContext, NotesProvider}