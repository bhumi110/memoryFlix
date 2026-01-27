import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import "./BrowseContent.css";
import {getContinueWatching} from "../../api/progress.api";
import "./ContinueRow.css";

const ContinueWatchingRow = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/progress/continue-watching")
      .then((res) => setItems(res.data))
      .catch(() => {});
  }, []);

  if (!items.length) return null;

  return (
    <div className="mood-row">
      <h2 className="row-title">Continue Watching</h2>

      <div className="row-thumbnails">
        {items.map((item) => {
          const video = item.videoId;

          const percent =
            item.duration > 0
              ? Math.floor((item.progress / item.duration) * 100)
              : 0;

          return (
            <div
              key={item._id}
              className="thumbnail-card"
              onClick={() =>
                navigate(`/watch/${video._id}`, {
                  state: {
                    video,
                    resumeAt: item.progress,
                  },
                })
              }
            >
                
              <img
                src={`http://localhost:8080${video.thumbnailUrl}`}
                alt={video.title}
              />
              <div className="thumbnail-overlay">
              <p>{video.title}</p>
            </div>

              <div className="progress-bar">
                <div
                  className="progress-filled"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      
    </div>
  );
};

export default ContinueWatchingRow;
