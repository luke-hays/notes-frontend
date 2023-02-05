import './Notes.css'
import Note from '../types/Note.type'

const Notes = ({notes}: {notes: Array<Note>}) => {
  return (
    <ul id='notes-list'>
      {notes.map(note => <li key={note.id}>{note.title + '...'}</li>)}
    </ul>
  )
}

export default Notes