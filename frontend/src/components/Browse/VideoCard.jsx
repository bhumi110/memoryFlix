const VideoCard = ({ video }) => {
  return (
    <div className="video-card">
      <img
        src={`http://localhost:8080${video.thumbnailUrl}`}
        alt={video.title}
      />

      <div className="video-overlay">
        <p>{video.title}</p>
      </div>
    </div>
  );
};

export default VideoCard;
