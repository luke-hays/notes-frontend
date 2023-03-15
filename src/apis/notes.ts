import {GET, POST, PATCH, DELETE} from './API'
import Note from '../types/Note.type'

const url = process.env.REACT_APP_NOTES_URL

const getNote = async (noteID: string) => {
  return await GET({url: `${url}/notes/${noteID}`, data: {}, config: {}})
}

const getNotes = async () => {
  return await GET({url: `${url}/notes/`, data: {}, config: {}})
}

const createNote = async (note: Note) => {
  return await POST({url: `${url}/notes/`, data: {note}, config: {}})
}

const updateNote = async (note: Note) => {
  return await PATCH({url: `${url}/notes/`, data: {id: note.id, content: note.content}, config: {}})
}

const deleteNote = async (note: Note) => {
  return await DELETE({url: `${url}/notes/`, data: {id: note.id?.toString()}, config: {}})
}

export {getNote, getNotes, createNote, updateNote, deleteNote}