'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import generatedLetter from './default-content copy'
import TextAlign from '@tiptap/extension-text-align'


const Tiptap = () => {

   const  content= `
    <p style="text-align: center">This is a paragraph with center alignment.</p>
    <p style="text-align: right">This is a paragraph with right alignment.</p>
  `;
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
        defaultAlignment: 'center',
      }),
    ],
    content: generatedLetter,
  })

  return (
    <EditorContent editor={editor} />
  )
}

export default Tiptap