import './Notes.css'
import Note from '../../types/Note.type'
import { useNotesContext } from '../../hooks/useNotesContext'

const Notes = () => {
  const {notes} = useNotesContext()

  return (
    <ul id='notes-list'>
      {notes.map((note: Note)  => <li key={note.id}>{note.title.length === 0 ? 'Untitled' : note.title}</li>)}
    </ul>
  )
}

export default Notes