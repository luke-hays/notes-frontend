import { useEffect, useState } from "react";
import Note from "../../types/Note.type";

const Editor = ({note, createNote}: {note: Note | null, createNote: any}) => {
  const [editorValue, setEditorValue] = useState('')

  useEffect(() => {
    if (note) setEditorValue(note.content)
  }, [note])

  const handleEditorChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    localStorage.setItem('activeNote', JSON.stringify({...note, content: text}))
    setEditorValue(text)
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