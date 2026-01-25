import { Link } from "react-router-dom";
import "../styles/landing.css";
import SpotlightCard from "../components/Modals/SpotlightCard";

const Landing = () => {
  return (
    <div className="landing">
      {/* NAVBAR */}
      <nav className="landing-nav">
        <h1 className="logo" onClick={() => navigate("/")}>
          MEMORYFLIX
        </h1>
        {/* <Link to="/login" className="nav-signin">Sign In</Link> */}
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Your life, stored <br />
            like a <span>series</span>.
          </h1>

          <p>
            A private, cinematic vault for your most precious memories. Watch
            your life unfold like a Netflix original.
          </p>

          <div className="hero-actions">
            <Link to="/signup" className="btn-primary">
              <i className="fa-solid fa-play"></i> Get Started
            </Link>
            <Link to="/login" className="btn-secondary">
              Sign In <i className="fa-solid fa-right-to-bracket"></i>
            </Link>
          </div>
        </div>

        <div className="scroll-indicator"></div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <h2>
          Your memories deserve the <span>spotlight</span>
        </h2>

        <div className="feature-grid">
          <div className="feature-card highlight">
            <SpotlightCard
              className="custom-spotlight-card"
              spotlightColor="rgba(245, 5, 33,0.3)"
            >
              <h3>
                <i
                  className="fa-solid fa-lock"
                  style={{ color: "#db0606" }}
                ></i>{" "}
                Private by Design
              </h3>
              <p>
              Your videos are yours alone. No sharing, no audience, no social
              pressure.
            </p>
            </SpotlightCard>
            {/* <h3>
              <i className="fa-solid fa-lock" style={{ color: "#db0606" }}></i>{" "}
              Private by Design
            </h3> */}
            {/* <p>
              Your videos are yours alone. No sharing, no audience, no social
              pressure.
            </p> */}
          </div>

          <div className="feature-card highlight">
            <SpotlightCard
              className="custom-spotlight-card"
              spotlightColor="rgba(245, 5, 33,0.3)"
            >
            <h3>
              <i className="fa-solid fa-film" style={{ color: "#db0606" }}></i>{" "}
              Organize into Series
            </h3>
            <p>
              Group moments into seasons and episodes. Turn your life into binge
              worthy content.
            </p>
            </SpotlightCard>
          </div>

          <div className="feature-card highlight">
            <SpotlightCard
              className="custom-spotlight-card"
              spotlightColor="rgba(245, 5, 33,0.3)"
            >
            <h3>
              <i className="fa-solid fa-heart" style={{ color: "#db0606" }}></i>{" "}
              Watch Like Netflix
            </h3>
            <p>
              Horizontal rows, cinematic thumbnails, smooth playback, but
              personal.
            </p>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>
          Ready to start your <span>story</span>?
        </h2>
        <p>Begin capturing and organizing your memories today.</p>
        <Link to="/signup" className="btn-primary">
          <i className="fa-solid fa-play"></i> Get Started Free
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <span>MEMORYFLIX</span>
        <span>© 2026 Memoryflix. Your memories, your story.</span>
      </footer>
    </div>
  );
};

export default Landing;
