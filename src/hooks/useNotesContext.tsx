import { createContext, useContext, useRef } from "react"
import { useState, useEffect } from "react"
import Note from "../types/Note.type"
import {getNotes, createNote, updateNote, deleteNote} from "../apis/notes"

let NotesContext = createContext({} as any)

const NotesProvider = ({children}: {children: any}) => {
  const [notes, setNotes] = useState<Array<Note>>([])
  const [activeNote, setActiveNote] = useState<Note | null>(null)
  const [loading, setLoading] = useState(false)
  const [updatingNote, setUpdatingNote] = useState(false)

  const fetchedRef = useRef(false)

  useEffect(() => {
    if (fetchedRef.current) return;

    fetchedRef.current = true;

    const getAllNotes = async () => {
      setLoading(true)
      const response = await getNotes()
      setNotes(response.data.content)
      setLoading(false)
    }

    getAllNotes()
  }, [])

  const modifyNote = async (content: string) => {
    if (!activeNote) return
    if (activeNote?.content === content) return

    setUpdatingNote(true)
    const newNote = {...activeNote, content}
    let result = await updateNote(newNote)
    if (result) {
      console.log(result)
      setActiveNote(newNote)
    } else {
      // Error implementation here
    }
    setUpdatingNote(false)
  }

  const addNote = async () => {
    const newNote: Note = {
      content: '',
      createdDate: new Date(),
      owner: 'user',
      summary: ''
    }

    let result = await createNote(newNote)

    if (result) {
      const newNotes = [...notes, result.data.content[0]]

      setActiveNote(newNote)
      setNotes(newNotes)
  
      localStorage.setItem('activeNote', result.data.content[0].id.toString())
    } else {
      // Error implementation here
    }
  }

  const removeNote = async () => {
    if (!activeNote) return
    
    let result = await deleteNote(activeNote)

    if (result) {
      const newNotes = [...notes]
      newNotes.splice(notes.findIndex(note => note.id === activeNote?.id), 1)
  
      setActiveNote(null)
      setNotes(newNotes)
  
      localStorage.removeItem('activeNote')
    } else {
      // Error implementation here
    }
  }

  const contextValue = {
    activeNote,
    setActiveNote,
    notes,
    setNotes,
    modifyNote,
    addNote,
    removeNote,
    loading,
    updatingNote
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
