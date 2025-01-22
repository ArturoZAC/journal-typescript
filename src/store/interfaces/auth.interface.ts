export interface AuthState {
  status: Status;
  uid: string | null;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  errorMessage: string | null;
}

export type Status = 'checking' | 'not-authenticated' | 'authenticated';
