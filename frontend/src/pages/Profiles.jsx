import { useNavigate } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AddIcon from "@mui/icons-material/Add";

const Profiles = () => {
  const navigate = useNavigate();

  return (
    <div className="profiles-page">
      {/* LOGO */}
      <div className="profiles-logo">MEMORYFLIX</div>

      {/* CENTER CONTENT */}
      <div className="profiles-center">
        <h1>Who's watching?</h1>

        <div className="profiles-list">
          {/* MAIN PROFILE */}
          <div
            className="profile-card active"
            onClick={() => navigate("/browse")}
          >
            <div className="profile-avatar">
              <PersonOutlineIcon sx={{ fontSize: 60 }} />
            </div>
            <p>My Memories</p>
          </div>

          {/* ADD PROFILE (DISABLED) */}
          <div className="profile-card disabled">
            <div className="profile-avatar disabled-avatar">
              <AddIcon sx={{ fontSize: 50 }} />
            </div>
            <p className="disabled-text">Add Profile</p>
          </div>
        </div>

        {/* MANAGE */}
        <button className="manage-btn">Manage Profiles</button>
      </div>
    </div>
  );
};

export default Profiles;
