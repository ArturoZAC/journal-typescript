import { createSlice } from '@reduxjs/toolkit';




export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null
  },
  reducers: {
    addNewEmptyNote: ( state, action ) => {
      // state.notes.push(action.payload)
    },
    setActiveNote: ( state, action ) => {

    },
    setNotes: ( state, action ) => {

    },
    setSaving: ( state ) => {

    },
    updateNote: ( state, action ) => {

    },
    deleteNodeById: ( state, action ) => {

    }
  }
});

export const { 
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  deleteNodeById ,
} = journalSlice.actions;