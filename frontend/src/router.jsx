import { createBrowserRouter } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Profiles from "./pages/Profiles";
import Browser from "./pages/Browser";
import ProtectedRoute from "./layouts/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
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
    path: "/profiles",
    element: (
      <ProtectedRoute>
        <Profiles />
      </ProtectedRoute>
    ),
  },
  {
    path: "/browse",
    element: (
      <ProtectedRoute>
        <Browser />
      </ProtectedRoute>
    ),
  },
]);

export default router;
