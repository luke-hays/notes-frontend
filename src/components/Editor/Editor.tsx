import { useMemo, useState } from "react";
import { createEditor, Descendant } from "slate";
import { Slate, Editable, withReact } from 'slate-react'

const placeholder: any = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paraghraph' }]
  }
]

const Editor = () => {
  const [editor] = useState(() => withReact(createEditor()))

  const initialValue: any = useMemo(() => JSON.parse(localStorage.getItem('note') ?? JSON.stringify(placeholder)), [])

  const onEditorChange = (value: Descendant[]) => {
    const isAstChange = editor.operations.some(
      op => 'set_selection' !== op.type
    )
    if (isAstChange) {
      const note = JSON.stringify(value)
      localStorage.setItem('note', note)
    }
  }

  return (
  <Slate 
    editor={editor} 
    value={initialValue}
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
