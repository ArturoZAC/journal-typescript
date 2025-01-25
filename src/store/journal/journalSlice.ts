import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { JournalState, Note } from '../interfaces/journal.interface';


const initialState: JournalState = {
  isSaving: false,
  messageSaved: '',
  notes: [],
  active: null
}


export const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true;
    },   
    addNewEmptyNote: ( state, { payload }: PayloadAction<Note> ) => {
      state.notes.push( payload );
      state.isSaving = false;
    },
    setActiveNote: ( state, { payload }: PayloadAction<Note> ) => {
      state.active = payload;
      state.messageSaved = '';
    },
    setNotes: ( state, { payload }: PayloadAction<Note[]> ) => {
      state.notes = payload;
    },
    setSaving: ( state ) => {
      state.isSaving = true;
      state.messageSaved = '';
    },
    setPhotosToActiveNote: ( state, { payload }: PayloadAction<string[]>) => {
      if (state.active) {
        state.active.imageUrls = [...state.active.imageUrls!, ...payload];
      }
      state.isSaving = false;
    },
    updateNote: ( state, { payload }: PayloadAction<Note> ) => {
      state.isSaving = false;
      state.notes = state.notes.map( note => {
        if( note.id === payload.id) {
          return payload;
        }
        return note;
      })
      state.messageSaved = `${ payload.title}, actualizada correctamente.`
    },
    clearNotesLogout: ( state ) => {
      state.isSaving = false;
      state.messageSaved = '';
      state.notes = [];
      state.active = null;
    },
    deleteNoteById: ( state, { payload }: PayloadAction<string> ) => {
      state.active = null;
      state.notes = state.notes.filter( note => note.id !== payload)
    }
  }
});

export const { 
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  deleteNoteById ,
  savingNewNote,
  setPhotosToActiveNote,
  clearNotesLogout
} = journalSlice.actions;