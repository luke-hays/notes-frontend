import { useEffect, useMemo, useState } from "react";
import { createEditor, Descendant } from "slate";
import { Slate, Editable, withReact } from 'slate-react'

type Note = {
  id: string,
  content: string,
  createdDate: Date,
  owner: string
}

const placeholder: any = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paraghraph' }]
  }
]

const Editor = ({activeNote}: {activeNote : string}) => {
  const [editor] = useState(() => withReact(createEditor()))
  const [text, setText] = useState('')

  useEffect(() => {
    setText(activeNote)
  }, [activeNote])

  const onEditorChange = (value: Descendant[]) => {
    const isAstChange = editor.operations.some(
      op => 'set_selection' !== op.type
    )
    if (isAstChange) {
      const note = JSON.stringify(value)
      setText(note)
      localStorage.setItem('activeNote', note)
    }
  }

  return (
  <Slate 
    editor={editor} 
    value={text}
    onChange={onEditorChange}>
    <Editable 
      style={{
        border: '1px solid black',
        maxWidth: '600px',
        minHeight: '500px',
      }}
    />
  </Slate>
  )
}

export default Editor