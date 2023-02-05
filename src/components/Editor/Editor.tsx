import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid'

type Note = {
  id: string,
  content: string,
  createdDate: Date,
  owner: string
}

const Editor = ({note, setActiveNote}: {note: Note, setActiveNote: any}) => {
  const [editorValue, setEditorValue] = useState('')

  useEffect(() => {
    if (note) {
      setEditorValue(note.content)
    }
  }, [note])

  const handleEditorChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    
    localStorage.setItem('activeNote', JSON.stringify({...note, content: text}))
    setEditorValue(text)
  }

    // create should bring up a new note editor and add one to a list
    const createNote = () => {
      const newNote: Note = {
        id: uuidv4(),
        content: '',
        createdDate: new Date(),
        owner: 'user'
      }
  
      localStorage.setItem('activeNote', JSON.stringify(newNote))
      setActiveNote(newNote)
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