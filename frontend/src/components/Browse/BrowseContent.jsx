import { useState } from "react";
import MoodRow from "./MoodRow";
import HeroBanner from "./HeroBanner";
import VideoPreviewModal from "./VideoPreview";
import ContinueWatchingRow from "./ContinueRow";
import "./BrowseContent.css";

const BrowseContent = ({ videos }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  if (!videos || videos.length === 0) return null;

  // Pick hero
  const heroVideo = videos[0];

  const handleVideoDeleted = (videoId) => {
    // optional: handle if needed later
  };

  // Group videos by mood
  const videosByMood = videos.reduce((acc, video) => {
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

      {/* CONTINUE WATCHING (self-contained) */}
      <ContinueWatchingRow />

      {/* MOOD ROWS */}
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
          onDeleted={handleVideoDeleted}
        />
      )}
    </div>
  );
};

export default BrowseContent;
