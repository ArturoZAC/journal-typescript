import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { JournalPage } from "./journal/pages/JournalPage";
import { LoginPage, RegisterPage } from "./auth/pages";
import { CheckingAuth } from "./ui";
import { useCheckAuth } from "./hooks";

export const AppMainRouter = () => {

  const status = useCheckAuth();

  // Mostramos el componente de carga mientras verificamos el estado
  if (status === "checking") {
    return <CheckingAuth />;
  }

  // Definimos las rutas según el estado del usuario
  const router = createBrowserRouter(
    status === "authenticated"
      ? [
          {
            path: "/",
            element: <JournalPage />,
          },
          {
            path: "/*",
            element: <Navigate to="/" />,
          },
        ]
      : [
          {
            path: "/auth/",
            children: [
              {
                index: true,
                element: <Navigate to="/auth/login" />,
              },
              {
                path: "login",
                element: <LoginPage />,
              },
              {
                path: "register",
                element: <RegisterPage />,
              },
              {
                path: "*",
                element: <Navigate to="/auth/login" />,
              },
            ],
          },
          {
            path: "/*",
            element: <Navigate to="/auth/login" />,
          },
        ]
  );

  return <RouterProvider router={router} />;
};
