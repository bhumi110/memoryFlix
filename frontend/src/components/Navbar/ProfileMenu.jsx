import { Avatar, Menu, MenuItem, Stack, IconButton, Divider } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const ProfileMenu = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  function stringToColor(string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = "#";
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
  
    return color;
  }
  
  function stringAvatar(name = "User") {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: name.charAt(0).toUpperCase(),
    };
  }

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Avatar
          {...stringAvatar(user?.name || "User")}
          sx={{ cursor: "pointer", bgcolor: stringToColor }}
        />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            bgcolor: "#141414",
            color: "white",
            border: "1px solid #222",
            mt: 1,
          },
        }}
      >
        <MenuItem
          onClick={() => {
            navigate("/profile");
            handleClose();
          }}
        >
          Profile
        </MenuItem>

        {/* <MenuItem
          onClick={() => {
            navigate("/account");
            handleClose();
          }}
        >
          Account Settings
        </MenuItem> */}

        <Divider sx={{ borderColor: "#222" }} />

        <MenuItem onClick={logout} sx={{ color: "#e50914" }}>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;