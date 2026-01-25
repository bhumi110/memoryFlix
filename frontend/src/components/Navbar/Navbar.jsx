import { useState,useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/navbar.css";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import MenuIcon from "@mui/icons-material/Menu";

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

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const { user } = useAuth();

  return (
    <div className={`navbar ${scrolled ? "scrolled" : ""}`}>
    <nav className="navbar">
      {/* LEFT */}
      <div className="nav-left">
        <Link to="/browse" className="logo">
          {/* <span className="logo-icon">▶</span> */}
          <span className="logo-text">MEMORYFLIX</span>
        </Link>

        <div className="nav-links">
          <NavLink to="/browse" className="nav-link">
            <i className="fa-regular fa-house"></i> Home
          </NavLink>

          {/* <NavLink to="/my-diaries" className="nav-link">
            My Diaries
          </NavLink> */}

          <NavLink to="/create" className="nav-link">
            <i className="fa-solid fa-plus"></i> Create Memory
          </NavLink>
        </div>
      </div>

      {/* RIGHT */}
      <div className="nav-right">
        <Stack direction="row" spacing={2}>
          <Avatar {...stringAvatar(user?.name || "User")} />
        </Stack>
      </div>
    </nav>
    </div>
  );
};

export default Navbar;
