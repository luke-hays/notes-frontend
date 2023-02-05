import './Notes.css'
import Editor from "../Editor/Editor"
import useNote from "../../hooks/useNote"

const Notes = () => {
  const {note, createNote, deleteNote} = useNote()

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
          {<Editor note={note} createNote={createNote}/>}
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