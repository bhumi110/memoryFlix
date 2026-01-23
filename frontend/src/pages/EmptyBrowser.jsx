import { Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import "../styles/emptyBrowse.css";
import { Link } from "react-router-dom";

const EmptyBrowse = () => {
  const { user,loading } = useAuth();
  if (loading) return null;
console.log("USER OBJECT:", user);

  return (
    <div className="empty-browse">
      <div className="empty-overlay" />

      <div className="empty-content">
        <h1>Welcome<span> {user?.name}</span> </h1>
        <p>
          Your memory vault is empty.
          <br />
          Start by creating your first video memory.
        </p>

        < Link to="/create" className="create-memory-btn" >
          <i className="fa-solid fa-plus"></i> Create Memory
        </Link>
      </div>
    </div>
  );
};

export default EmptyBrowse;
