import "bootstrap/dist/css/bootstrap.min.css";
import './index.css'
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.tsx'
import Home from "./pages/Home/Home.tsx"
import Signup from "./components/Sign-up/Sign-up.tsx";
import Login from "./components/Login/Login.tsx";
import ErrorPage from "./pages/Error.tsx";
import Bag from "./pages/Bag/Bag.tsx"
import Scores from "./pages/Scores/Scores.tsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/bag",
        element: <Bag />,
      },
      {
        path: "/scores",
        element: <Scores />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
