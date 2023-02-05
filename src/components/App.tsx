import './App.css'
import useNote from "../hooks/useNote"
import Editor from "./Editor/Editor"
import Notes from './Notes/Notes'

const App = () => {
  const {note, notes, createNote, deleteNote} = useNote()

  return (
    <>
      <div className='grid'>
        <div id="header">
          <h1>Notes</h1>
        </div>
        <div id='noteslist'>
          <Notes notes={notes}/>
        </div>
        <div id='editor'>
          {<Editor note={note} notes={notes} createNote={createNote}/>}
        </div>
        <div className='buttons'>
          <button onClick={createNote}>Create Note</button>
          <button onClick={deleteNote}>Delete Note</button>        
        </div>
      </div>
    </>
  )
}

export default App