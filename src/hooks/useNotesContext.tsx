import { createContext, useContext } from "react"
import { useState, useEffect } from "react"
import Note from "../types/Note.type"
import { v4 as uuidv4 } from 'uuid'
import * as request from "../apis/notes"

let NotesContext = createContext({} as any)

const NotesProvider = ({children}: {children: any}) => {
  const [notes, setNotes] = useState<Array<Note>>([])
  const [activeNote, setActiveNote] = useState<Note | null>(null)
  const [pendingRequests, setPendingRequests] = useState(new Set())

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

  const addPendingRequest = (key: string) => {
    let requests = new Set(pendingRequests)
    pendingRequests.add(key)
    setPendingRequests(requests)
  }
  
  const removePendingRequest = (key: string) => {
    let requests = new Set(pendingRequests)
    pendingRequests.delete(key)
    setPendingRequests(requests)
  }

  const sendRequest = async (key: string, request: any) => {
    addPendingRequest(key)
    await request()
    removePendingRequest(key)
  }

  const getNote = async (noteID: string) => {
    await sendRequest('getNote', () => request.getNote(noteID))
  }

  const getAllNotes = async () => {
    await sendRequest('getNotes', () => request.getNotes(''))
  }

  const updateNote = async (noteID: string, data: any) => {
    await sendRequest('updateNote', () => request.updateNote('', null))
  }

  const createNote = async () => {
    const newNote: Note = {
      id: uuidv4(),
      content: '',
      createdDate: new Date(),
      owner: 'user',
      title: ''
    }

    await sendRequest('createNote', () => request.createNote(newNote))

    const newNotes = [...notes, newNote]

    setActiveNote(newNote)
    setNotes(newNotes)

    localStorage.setItem('activeNote', JSON.stringify(newNote))
    localStorage.setItem('notes', JSON.stringify(newNotes))
  }

  const deleteNote = async () => {
    if (!activeNote) return
    
    await sendRequest('deleteNote', () => request.deleteNote(activeNote.id))

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
    getNote,
    getAllNotes,
    updateNote,
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