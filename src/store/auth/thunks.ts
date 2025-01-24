import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers";
import { AppDispatch } from "../store"
import { checkingCredentials, login, logout } from "./authSlice"

export const checkingAuthentication = ( email: string, password: string ) => {
  return async(dispatch: AppDispatch) => {
    dispatch(checkingCredentials());
  }
}

export const startGoogleSignIn = () => {
  return async ( dispatch: AppDispatch ) => {
    dispatch(checkingCredentials());

    const result = await singInWithGoogle();
    if( !result.ok ) return dispatch ( logout( result.errorMessage));
    dispatch( login( result ));

  }
} 

export const startCreatingUserWithEmailPassword = ({ email, password, displayName}: Record<string,string>) => {

  return async( dispatch: AppDispatch ) => {
    dispatch( checkingCredentials());

    const { ok, uid, photoURL, errorMessage} = await registerUserWithEmailPassword({ email, password, displayName});

    if( !ok ) return dispatch( logout({errorMessage}))

    dispatch( login( { uid, displayName, email, photoURL } ));

  }

}

export const startLoginWithEmailPassword = ({ email, password}: Record<string,string>) => {
  return async(dispatch: AppDispatch) => {
    dispatch( checkingCredentials() );
    const result = await loginWithEmailPassword({ email, password });
    console.log(result);

    if( !result.ok ) return dispatch ( logout( result ));
    dispatch( login( result ));
  }


}

export const startLogout = () => {
  return async( dispatch: AppDispatch ) => {
    await logoutFirebase();

    dispatch(logout());
  }
}