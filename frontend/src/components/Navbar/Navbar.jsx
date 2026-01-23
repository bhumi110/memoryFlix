import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "navbar--black" : ""}`}>
      <div className="navbar__left">
        <Link to="/" className="navbar__logo">
          MemoryFlix
        </Link>

        <Link to="/browse" className="navbar__link">Home</Link>
        <Link to="/create" className="navbar__link">Create</Link>
      </div>

      <div className="navbar__right">
        <Link to="/profile" className="navbar__profile">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="Profile"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
