import './App.css'
import Editor from "./Editor/Editor"
import Notes from './Notes/Notes'
import {useNotesContext } from '../hooks/useNotesContext'

const App = () => {
  const {addNote, removeNote, updatingNote, loading, activeNote} = useNotesContext()

  const activeNoteUnavailable = !activeNote|| updatingNote

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
          <button onClick={addNote} disabled={loading}>Create Note</button>
          <button onClick={removeNote} disabled={loading || activeNoteUnavailable}>Delete Note</button>     
        </div>
      </div>
    </>
  )
}

export default App