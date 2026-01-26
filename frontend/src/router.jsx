import { createBrowserRouter } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Profiles from "./pages/Profiles";
import Browser from "./pages/Browser";
import Create from "./pages/Create";
import ProtectedRoute from "./layouts/ProtectedRoute";
import Watch from "./pages/Watch";
import Profile from "./pages/Profile";

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
  {
    path: "/create",
    element: (
      <ProtectedRoute>
        <Create />
      </ProtectedRoute>
    ),
  },

  {
    path: "/watch/:id",
    element: (
      <ProtectedRoute>
        <Watch />
      </ProtectedRoute>
    ),
  },
  {
  path: "/profile",
  element: (
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  ),
}
]);


export default router;
