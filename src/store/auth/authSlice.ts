import { createSlice } from '@reduxjs/toolkit';
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
    login: ( state, action) => {

    },
    logout: ( state, action) => {

    },
    checkingCredentials: ( state ) => {
      state.status = 'checking';
    }
  }
});

export const { login, logout, checkingCredentials } = authSlice.actions;