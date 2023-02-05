import { useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid'
import './Notes.css'
import Editor from "../Editor/Editor"

type Note = {
  id: string,
  content: string,
  createdDate: Date,
  owner: string
}

const Notes = () => {
  const [activeNote, setActiveNote] = useState<any>(null)

  useEffect(() => {
    let note = localStorage.getItem('activeNote')
    if (note) setActiveNote(JSON.parse(note))
  }, [])

  // create should bring up a new note editor and add one to a list
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
  
  return (
    <>
      <div className='grid'>
        <div id="header">
          <h1>Notes</h1>
        </div>
        <div id='noteslist'>
          <ul>
            <li>note1</li>
            <li>note2</li>
          </ul>
        </div>
        <div id='editor'>
          {<Editor note={activeNote} setActiveNote={setActiveNote}/>}
        </div>
        <div className='buttons'>
          <button onClick={createNote}>Create Note</button>
          <button onClick={deleteNote}>Delete Note</button>        
        </div>
      </div>
    </>
  )
}

export default Notes