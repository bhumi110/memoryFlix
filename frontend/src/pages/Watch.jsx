import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/watch.css";

const Watch = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const [showUI, setShowUI] = useState(true);
  const lastSavedRef = useRef(0);

  const video = state?.video;
  const resumeAt = state?.resumeAt || 0;


  useEffect(() => {
    if (!video) {
      navigate("/browse", { replace: true });
    }
  }, [video, navigate]);


  useEffect(() => {
    if (videoRef.current && resumeAt > 0) {
      videoRef.current.currentTime = resumeAt;
    }
  }, [resumeAt]);

  useEffect(() => {
    let timer;
    if (showUI) {
      timer = setTimeout(() => setShowUI(false), 3000);
    }
    return () => clearTimeout(timer);
  }, [showUI]);

  if (!video) return null;

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;

    const currentTime = Math.floor(videoRef.current.currentTime);


    if (currentTime - lastSavedRef.current < 5) return;

    lastSavedRef.current = currentTime;

    api.post("/progress", {
      videoId: video._id,
      progress: currentTime,
      duration: Math.floor(videoRef.current.duration),
    }).catch(() => {});
  };
  const handleEnded = async () => {
  try {
    await api.delete(`/progress/${video._id}`);
  } catch (err) {}
};

  return (
    <div
      className="watch-container"
      onMouseMove={() => setShowUI(true)}
    >
      {/* TOP BAR */}
      <div className={`watch-top ${showUI ? "visible" : ""}`}>
        <button
          className="watch-close"
          onClick={() => navigate("/browse")}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="watch-meta">
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
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
    </div>
  );
};

export default Watch;
