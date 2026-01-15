import { AppBar, Toolbar, IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: "rgba(0,0,0,0.9)",
        paddingX: 2,
      }}
    >
      <Toolbar className="d-flex justify-content-between">
        {/* LEFT */}
        <div
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/browse")}
        >
          <h4 style={{ color: "#e50914", fontWeight: "bold" }}>
            MEMORYFLIX
          </h4>
        </div>

        {/* RIGHT */}
        <div className="d-flex align-items-center gap-3">
          {/* SEARCH */}
          <div
            style={{
              background: "#111",
              padding: "4px 10px",
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
            }}
          >
            <SearchIcon fontSize="small" />
            <InputBase
              placeholder="Search"
              sx={{
                color: "#fff",
                marginLeft: 1,
                fontSize: 14,
              }}
            />
          </div>

          {/* LOGOUT */}
          <IconButton onClick={handleLogout} color="inherit">
            <LogoutIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
