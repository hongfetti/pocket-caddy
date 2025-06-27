// import "bootstrap/dist/css/bootstrap.min.css";
import './index.css'
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.tsx'
import Home from "./pages/Home/Home.tsx"
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";
import ErrorPage from "./pages/Error.tsx";
// import Add from "./pages/add/AddItem";
// import Bag from "./pages/Bag"
// import Scores from "./pages/Scores"

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
      // {
      //   path: "/login",
      //   element: <Login />,
      // },
      // {
      //   path: "/signup",
      //   element: <Signup />,
      // },
      // {
      //   path: "/add",
      //   element: <Add />,
      // },
      // {
      //   path: "/bag",
      //   element: <Bag />,
      // },
      // {
      //   path: "/scores",
      //   element: <Scores />,
      // },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
