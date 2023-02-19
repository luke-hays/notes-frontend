import {GET, POST, PATCH, DELETE} from './API'
import Note from '../types/Note.type'

const url = 'http://localhost:3001'

const getNote = async (noteID: string) => {
  await GET({url: `${url}/notes/${noteID}`, data: {}, config: {}})
}

const getNotes = async (userID: string) => {
  await GET({url: `${url}/notes/`, data: {userID}, config: {}})
}

const createNote = async (note: Note) => {
  await POST({url: `${url}/notes/`, data: {}, config: {}})
}

const updateNote = async (noteID: string, data: any) => {
  await PATCH({url: `${url}/notes/${noteID}`, data: {}, config: {}})
}

const deleteNote = async (noteID: string) => {
  await DELETE({url: `${url}/notes/${noteID}`, data: {}, config: {}})
}

export {getNote, getNotes, createNote, updateNote, deleteNote}