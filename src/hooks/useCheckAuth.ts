import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store";
import { login, logout } from "../store/auth/authSlice";
import { FirebaseAuth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { startLoadingNotes } from "../store/journal/thunk";

export const useCheckAuth = () => {
    const { status } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
  
    useEffect(() => {
      onAuthStateChanged( FirebaseAuth, async( user ) => {
        if(!user) return dispatch( logout());
  
        const {uid,email,displayName,photoURL} = user;
        dispatch( login({uid,email,displayName,photoURL}));
        dispatch( startLoadingNotes());
      })
    }, [])

    return status;
}
