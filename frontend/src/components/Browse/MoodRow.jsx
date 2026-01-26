import { useState } from "react";
import "./BrowseContent.css";
import VideoPreviewModal from "./VideoPreview";

const MoodRow = ({ mood, videos, onSelect }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <div className="mood-row">
      <h2 className="row-title">{mood}</h2>

      <div className="row-thumbnails">
        {videos.map((video) => (
          <div
            key={video._id}
            className="thumbnail-card"
            onClick={() => onSelect(video)}
          >
            <img
              src={`http://localhost:8080${video.thumbnailUrl}`}
              alt={video.title}
            />
            <div className="thumbnail-overlay">
              <p>{video.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* PREVIEW MODAL */}
      <VideoPreviewModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </div>
  );
};

export default MoodRow;
