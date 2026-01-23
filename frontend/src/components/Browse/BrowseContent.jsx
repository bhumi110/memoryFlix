
import "../Browse/BrowseContent.css";

const MOODS = ["calm", "happy", "sad", "healing", "confused", "hopeful"];

const BrowseContent = ({ videos }) => {
  const getVideosByMood = (mood) =>
    videos.filter((video) => video.mood === mood);

  return (
    <div className="browse-page">
      {MOODS.map((mood) => {
        const moodVideos = getVideosByMood(mood);

        if (moodVideos.length === 0) return null;

        return (
          <div key={mood} className="mood-row">
            <h2 className="mood-title">{mood.toUpperCase()}</h2>

            <div className="video-row">
              {moodVideos.map((video) => (
                <div key={video._id} className="video-card">
                  {video.title}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BrowseContent;
