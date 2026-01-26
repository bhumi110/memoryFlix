import { useState } from "react";
import MoodRow from "./MoodRow";
import HeroBanner from "./HeroBanner";
import VideoPreviewModal from "./VideoPreview";
import "./BrowseContent.css";

const BrowseContent = ({ videos }) => {
  const [allVideos, setAllVideos] = useState(videos);
  const [selectedVideo, setSelectedVideo] = useState(null);

  if (!videos || videos.length === 0) return null;

  // Pick hero (featured)
  const heroVideo = videos[0];

  const handleVideoDeleted = (videoId) => {
    setAllVideos(prev =>
      prev.filter(v => v._id !== videoId)
    );
  };

  // Group ALL videos by mood (including hero)
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
          onDeleted={handleVideoDeleted}
        />
      )}
    </div>
  );
};

export default BrowseContent;
