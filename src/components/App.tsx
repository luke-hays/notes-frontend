import './App.css'
import Editor from "./Editor/Editor"
import Notes from './Notes/Notes'
import {useNotesContext } from '../hooks/useNotesContext'

const App = () => {
  const {createNote, deleteNote} = useNotesContext()

  return (
    <>
      <div className='grid'>
        <div id="header">
          <h1>Notes</h1>
        </div>
        <div id='noteslist'>
          <Notes />
        </div>
        <div id='editor'>
          {<Editor />}
        </div>
        <div className='buttons'>
          <button onClick={() => createNote()}>Create Note</button>
          <button onClick={() => deleteNote()}>Delete Note</button>        
        </div>
      </div>
    </>
  )
}

export default App