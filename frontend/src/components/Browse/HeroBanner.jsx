import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useNavigate } from "react-router-dom";
import "./HeroBanner.css";

const HeroBanner = ({ video }) => {
  const navigate = useNavigate();

  if (!video) return null;

  return (
    <div
      className="hero-banner"
      style={{
        backgroundImage: `url(http://localhost:8080${video.thumbnailUrl})`,
      }}
    >
      <div className="hero-overlay" />

      <div className="hero-content">
        <span className="badge rounded-pill text-bg-secondary">
          {video.mood.toUpperCase()}
        </span>

        <h1 className="hero-title">{video.title}</h1>

        <p className="hero-desc">{video.description}</p>

        <div className="hero-actions">
          <button
            className="hero-play"
            onClick={() => navigate(`/watch/${video._id}`, { state: { video } })}
          >
            <PlayArrowIcon /> Play
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
