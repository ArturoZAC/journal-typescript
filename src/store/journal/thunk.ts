import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { AppDispatch, RootState } from "../store"
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers/fileUpload";

export const startNewNote = () => {
  return async( dispatch: AppDispatch, getState: () => RootState ) => {

    dispatch( savingNewNote());

    const { uid } = getState().auth;

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    }

    const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes`));
    await setDoc( newDoc, newNote);

    const newNoteOff = {id: newDoc.id, ...newNote}

    dispatch( addNewEmptyNote( newNoteOff ));
    dispatch( setActiveNote( newNoteOff ));

  }
}

export const startLoadingNotes = () => {
  return async( dispatch: AppDispatch, getState: () => RootState ) => {
    const { uid } = getState().auth;
    if( !uid ) throw new Error('El UID del usuario no existe');

    const notes = await loadNotes( uid );
    dispatch( setNotes( notes ));
  }
}

export const startSaveNote = () => {
  return async ( dispatch: AppDispatch, getState: () => RootState) => {
    dispatch( setSaving());

    const { uid } = getState().auth;
    const { active:note } = getState().journal;
    
    const noteToFireStore = { ...note };
    delete noteToFireStore.id;
    // console.log({noteToFireStore})
    const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note?.id }`);
    await setDoc( docRef, noteToFireStore, { merge: true } );

    dispatch( updateNote( note! ));
  }

}

export const startUploadingFiles = ( files: any[] = []) => {
  return async(dispatch: AppDispatch) => {
    dispatch( setSaving());

    // await fileUpload( files[0]);
    const fileUploadPromises = [];
    for (const file of files) {
      fileUploadPromises.push( fileUpload( file ) );
    }
    
    const photosUrls = await Promise.all( fileUploadPromises );
    // console.log(photosUrls)
    dispatch( setPhotosToActiveNote(photosUrls))
  }
}

export const startDeletingNote = () => {
  return async ( dispatch: AppDispatch, getState: () => RootState) => {

    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note?.id}`)
    await deleteDoc( docRef );

    dispatch( deleteNoteById( note?.id! ));
  }
}