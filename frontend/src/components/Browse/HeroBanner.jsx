import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import "./HeroBanner.css";
import Navbar from "../Navbar/Navbar";

const HeroBanner = ({ video, onPlay }) => {
  return (
    <>
    <div
      className="hero-banner"
      style={{
        backgroundImage: `url(http://localhost:8080${video.thumbnailUrl})`
      }}
    >
      <div className="hero-overlay" />

      <div className="hero-content">
        <span className="badge rounded-pill text-bg-secondary">{video.mood.toUpperCase()}</span>

        <h1 className="hero-title">{video.title}</h1>

        <p className="hero-desc">{video.description}</p>

        <div className="hero-actions">
          <button className="hero-play" onClick={onPlay}>
            <PlayArrowIcon /> Play
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default HeroBanner;
