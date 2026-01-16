import { Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import "../styles/emptyBrowse.css";

const EmptyBrowse = () => {
  const { user } = useAuth();
console.log("USER OBJECT:", user);

  return (
    <div className="empty-browse">
      <div className="empty-overlay" />

      <div className="empty-content">
        <h1>Welcome {user?.name}</h1>
        <p>
          Your memory vault is empty.
          <br />
          Start by creating your first video memory.
        </p>

        <Button variant="contained" className="create-memory-btn">
          + Create Memory
        </Button>
      </div>
    </div>
  );
};

export default EmptyBrowse;
