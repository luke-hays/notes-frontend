import { useEffect, useState } from "react";
import Note from "../types/Note.type";

const Editor = ({note, notes, createNote}: {note: Note | null, notes: Array<Note>, createNote: any}) => {
  const [editorValue, setEditorValue] = useState('')

  useEffect(() => {
    if (note) setEditorValue(note.content)
  }, [note])

  const handleEditorChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value
    const title = (content.length > 0) ? content.substring(0, 11,) : 'Untitled'

    const newNotes = JSON.parse(localStorage.getItem('notes') ?? '[]')
    newNotes.splice(notes.findIndex(n => n.id === note?.id), 1, {...note, content, title})

    localStorage.setItem('activeNote', JSON.stringify({...note, content, title}))
    localStorage.setItem('notes', JSON.stringify(newNotes))

    setEditorValue(content)
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
      value={editorValue}
      onChange={(e) => handleEditorChange(e)}
      placeholder='Begin typing a note...'>
    </textarea>
  )
}

export default Editor