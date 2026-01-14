import { createBrowserRouter } from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Signup/Signup";
import AuthSuccess from "./pages/Auth/AuthSuccess";

import Profiles from "./pages/Profiles";
import Browse from "./pages/Browse";
import SeriesDetails from "./pages/SeriesDetails";
import Watch from "./pages/Watch";

import ProtectedRoute from "./layouts/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/auth-success",
    element: <AuthSuccess />
  },

  // AUTH REQUIRED
  {
    path: "/profiles",
    element: (
      <ProtectedRoute>
        <Profiles />
      </ProtectedRoute>
    )
  },
  {
    path: "/browse",
    element: (
      <ProtectedRoute>
        <Browse />
      </ProtectedRoute>
    )
  },
  {
    path: "/series/:id",
    element: (
      <ProtectedRoute>
        <SeriesDetails />
      </ProtectedRoute>
    )
  },
  {
    path: "/watch/:videoId",
    element: (
      <ProtectedRoute>
        <Watch />
      </ProtectedRoute>
    )
  },

  // fallback
  {
    path: "*",
    element: <Login />
  }
]);

export default router;
