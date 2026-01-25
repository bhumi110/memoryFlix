import { useState } from "react";
import MoodRow from "./MoodRow";
import HeroBanner from "./HeroBanner";
import VideoPreviewModal from "./VideoPreview";
import "./BrowseContent.css";

const BrowseContent = ({ videos }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  if (!videos || videos.length === 0) return null;

  const heroVideo = videos[0];

  // group remaining videos by mood
  const videosByMood = videos.slice(1).reduce((acc, video) => {
    acc[video.mood] = acc[video.mood] || [];
    acc[video.mood].push(video);
    return acc;
  }, {});

  return (
    <div className="browse-page">
      {/* HERO */}
      <HeroBanner
        video={heroVideo}
        onPlay={() => setSelectedVideo(heroVideo)}
      />

      {/* ROWS */}
      {Object.entries(videosByMood).map(([mood, vids]) => (
        <MoodRow
          key={mood}
          mood={mood}
          videos={vids}
          onSelect={setSelectedVideo}
        />
      ))}

      {/* MODAL */}
      {selectedVideo && (
        <VideoPreviewModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
};

export default BrowseContent;
