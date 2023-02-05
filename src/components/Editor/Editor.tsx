import { useNotesContext } from "../../hooks/useNotesContext";

const Editor = () => {
  const {note, notes, createNote, setNote, setNotes} = useNotesContext()

  const handleEditorChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value
    const title = (content.length > 0) ? content.substring(0, 11,) : 'Untitled'

    const newNote = {...note, content, title}
    const newNotes = JSON.parse(localStorage.getItem('notes') ?? '[]')
    newNotes.splice(notes.findIndex((n: { id: any; }) => n.id === note?.id), 1, {...note, content, title})

    localStorage.setItem('activeNote', JSON.stringify({...note, content, title}))
    localStorage.setItem('notes', JSON.stringify(newNotes))

    setNote(newNote)
    setNotes(newNotes)
  }

  if (!note) {
    return (
      <textarea
        rows={10} 
        cols={30}
        value=''
        placeholder='Click create to begin...'
        onFocus={() => {createNote()}}
        readOnly>
      </textarea>  
    )
  }

  return (
    <textarea
      rows={10} 
      cols={30} 
      value={note.content}
      onChange={(e) => handleEditorChange(e)}
      placeholder='Begin typing a note...'>
    </textarea>
  )
}

export default Editor