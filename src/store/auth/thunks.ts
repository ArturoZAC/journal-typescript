import { singInWithGoogle } from "../../firebase/providers";
import { AppDispatch } from "../store"
import { checkingCredentials } from "./authSlice"

export const checkingAuthentication = ( email: string, password: string ) => {
  return async(dispatch: AppDispatch) => {
    dispatch(checkingCredentials());
  }
}

export const startGoogleSignIn = () => {
  return async ( dispatch: AppDispatch ) => {
    dispatch(checkingCredentials());

    const result = await singInWithGoogle();
    console.log({result})

  }
}