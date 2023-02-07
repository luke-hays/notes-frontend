import './Notes.css'
import Note from '../../types/Note.type'
import { useNotesContext } from '../../hooks/useNotesContext'

const Notes = () => {
  const {notes, setActiveNote} = useNotesContext()

  const getNote = (id: string) => {
    const note = notes.find((n: {id: string}) => n.id === id)
    setActiveNote(note)
  }

  return (
    <ul id='notes-list'>
      {notes.map((note: Note) => 
        <li 
          key={note.id} 
          onClick={() => { getNote(note.id) }}
        >
          {note.title.length === 0 ? 'Untitled' : note.title}
        </li>
      )}
    </ul>
  )
}

export default Notes