import { createBrowserRouter, Navigate } from "react-router-dom";
import { JournalPage } from "./journal/pages/JournalPage";
import { LoginPage, RegisterPage } from "./auth/pages";

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <JournalPage />
    },
    {
      path: '/auth/',
      children: [
        {
          path: 'login',
          element: <LoginPage />
        },
        {
          path: 'register',
          element: <RegisterPage />
        },
        {
          path: '*',
          element: <Navigate to='/auth/login' />
        }
      ]
    },

    {
      path: '/*',
      element: <Navigate to='/'/>
    }
  ]
)