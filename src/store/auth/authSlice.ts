import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../interfaces/auth.interface';

const initialState: AuthState = {
  status: 'not-authenticated',
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage:null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: ( state, { payload }: PayloadAction<any>) => {
      state.status = 'authenticated',
      state.uid = payload.uid;
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.photoURL = payload.phtotoURL;
      state.errorMessage = null;
    },
    logout: ( state, { payload }: PayloadAction<{ errorMessage?: string } | undefined>) => {
      state.status = 'not-authenticated',
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.photoURL = null;
      state.errorMessage = payload?.errorMessage || null;
    },
    checkingCredentials: ( state ) => {
      state.status = 'checking';
    }
  }
});

export const { login, logout, checkingCredentials } = authSlice.actions;