import './Notes.css'
import Note from '../../types/Note.type'
import { useNotesContext } from '../../hooks/useNotesContext'

const Notes = () => {
  const {notes, setActiveNote} = useNotesContext()

  const getNote = (id: string) => {
    const note = notes.find((n: {id: string}) => n.id === id)
    setActiveNote(note)
    localStorage.setItem('activeNote', note.id)
  }

  return (
    <div id='notes-list'>
      {notes.map((note: Note) => (
        <div
        key={note.id} 
        onClick={() => getNote(note.id ?? '')}
      >
        {!note.summary || note.summary.length === 0 ? 'Untitled' : note.summary}
      </div>
      )

      )}
    </div>
  )
}

export default Notes