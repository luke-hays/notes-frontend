import { useState } from "react"
import Editor from "../Editor/Editor"
import './Notes.css'
import { v4 as uuidv4 } from 'uuid'

type Note = {
  id: string,
  content: string,
  createdDate: Date,
  owner: string
}

const placeholder: any = [
  {
    type: 'paragraph',
    children: [{ text: '' }]
  }
]

const Notes = () => {
  const [activeNote, setActiveNote] = useState<any>(null)

  // create should bring up a new note editor and add one to a list
  const onClickCreate = () => {
    const newNote: Note = {
      id: uuidv4(),
      content: '',
      createdDate: new Date(),
      owner: 'user'
    }

    localStorage.setItem('activeNote', '')

    setActiveNote(JSON.stringify([
      {
        type: 'paragraph',
        children: [{ text: '' }]
      }
    ]))
  }

  const onClickDelete = () => {
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
          {activeNote && <Editor activeNote={activeNote}/>}
        </div>
        <div className='buttons'>
          <button onClick={onClickCreate}>Create Note</button>
          <button onClick={onClickDelete}>Delete Note</button>        
        </div>
      </div>
    </>
  )
}

export default Notes