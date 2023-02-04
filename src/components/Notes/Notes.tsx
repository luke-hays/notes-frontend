import { useState } from "react"
import Editor from "../Editor/Editor"
import './Notes.css'

const Notes = () => {
  const [activeNote, setActiveNote] = useState(null)

  // create should bring up a new note editor and add one to a list
  const onClickCreate = () => {
 
  }

  const onClickDelete = () => {

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
          {/* {activeNote && <Editor />} */}
          <Editor />
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