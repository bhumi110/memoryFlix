import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import "../styles/watch.css";

const Watch = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [showUI, setShowUI] = useState(true);

  const video = state?.video;

  if (!video) {
  navigate("/browse");
  return null;
}

  useEffect(() => {
    let timer;
    if (showUI) {
      timer = setTimeout(() => setShowUI(false), 3000);
    }
    return () => clearTimeout(timer);
  }, [showUI]);

  return (
    <div
      className="watch-container"
      onMouseMove={() => setShowUI(true)}
    >
      {/* TOP BAR */}
      <div className={`watch-top ${showUI ? "visible" : ""}`}>
        <button className="watch-close" onClick={() => navigate("/browse")}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="watch-meta">
          {/* <span className="episode">Episode 1</span> */}
          <h1>{video.title}</h1>
        </div>
      </div>

      {/* VIDEO */}
      <video
        ref={videoRef}
        src={`http://localhost:8080${video.videoUrl}`}
        autoPlay
        controls
        playsInline
        className="watch-video"
      />
    </div>
  );
};

export default Watch;
