import { useCallback, useEffect, useState } from "react";
import { useNotesContext } from "../../hooks/useNotesContext";

const Editor = () => {
  const {activeNote, modifyNote} = useNotesContext()
  const [textContent, setTextContent] = useState('')
  const [debouceValue, setDebounceValue] = useState('')

  useEffect(() => {
    setTextContent(activeNote?.content ?? '')
  }, [activeNote])

  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(textContent), 500)
    return () => clearTimeout(timer)
  }, [textContent])

  useEffect(() => {
    modifyNote(debouceValue)
  }, [debouceValue])

  if (!activeNote) {
    return (
      <textarea
        rows={10} 
        cols={30}
        value=''
        placeholder='Click create to begin...'
        readOnly>
      </textarea>  
    )
  }

  return (
    <textarea
      rows={10} 
      cols={30} 
      value={textContent}
      onChange={(e) => setTextContent(e.target.value)}
      placeholder='Begin typing a note...'>
    </textarea>
  )
}

export default Editor