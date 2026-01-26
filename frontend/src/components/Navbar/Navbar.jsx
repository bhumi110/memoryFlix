import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/navbar.css";
import {
  Avatar,
  Menu,
  MenuItem,
  Stack,
  IconButton,
  Divider,
} from "@mui/material";
import ProfileMenu from "./ProfileMenu";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);

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
          <IconButton
            className="mobile-menu-btn"
            onClick={() => setOpenMenu(!openMenu)}
            sx={{ color: "white" }}
          >
            <i className="fa-solid fa-bars"></i>
          </IconButton>

          <Stack direction="row" spacing={2}>
            <ProfileMenu user={user} />
          </Stack>
        </div>
      </nav>
      {openMenu && (
        <div className="mobile-menu">
          <Link to="/browse" onClick={() => setOpenMenu(false)}>
            Home
          </Link>
          <Link to="/create" onClick={() => setOpenMenu(false)}>
            Create Memory
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
