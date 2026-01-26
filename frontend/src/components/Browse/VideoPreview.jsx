import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import "./VideoPreview.css";
import { updateVideo, deleteVideo } from "../../api/video.api";
import { useNavigate } from "react-router-dom";

const VideoPreviewModal = ({ video, onClose, onDeleted }) => {
  if (!video) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(video.title);
  const [description, setDescription] = useState(video.description);

  const handleSave = async () => {
    await updateVideo(video._id, { title, description });
    setIsEditing(false);
  };

  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      console.log("Deleting:", video._id);

      await deleteVideo(video._id);

      onDeleted(video._id);
      onClose();
    } catch (err) {
      console.error("DELETE FAILED", err.response?.data || err);
      alert("Delete failed");
    }
  };

  return (
    <div className="preview-backdrop">
      <div className="preview-modal">
        {/* HERO */}
        <div
          className="preview-hero"
          style={{
            backgroundImage: `url(http://localhost:8080${video.thumbnailUrl})`,
          }}
        >
          <div className="preview-gradient" />

          <button className="close-btn" onClick={onClose}>
            <CloseIcon />
          </button>

          <div className="preview-content">
            {isEditing ? (
              <input
                className="edit-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            ) : (
              <h1>{video.title}</h1>
            )}

            <div className="preview-meta">
              <span className="match">{video.mood}</span>
              <span>{new Date(video.createdAt).getFullYear()}</span>
              {/* <span>HD</span> */}
            </div>

            <div className="preview-actions">
              {!isEditing && (
                <button
                  className="play-btn"
                  onClick={() =>
                    navigate(`/watch/${video._id}`, { state: { video } })
                  }
                >
                  <PlayArrowIcon /> Play
                </button>
              )}

              {!isEditing ? (
                <>
                  <button
                    className="btn btn-outline-warning"
                    style={{ marginRight: "10px" }}
                    onClick={() => setIsEditing(true)}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={handleDelete}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-success btn-sm"
                    style={{ borderRadius: "20%", marginRight: "10px" }}
                    onClick={handleSave}
                  >
                    <i className="fa-regular fa-circle-check"></i>
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    style={{ borderRadius: "20%" }}
                    onClick={() => setIsEditing(false)}
                  >
                    <i className="fa-regular fa-circle-xmark"></i>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* DETAILS */}
        <div className="preview-details">
          <p>
            <strong>Uploaded:</strong>{" "}
            {new Date(video.createdAt).toLocaleString()}
          </p>
          {isEditing ? (
            <textarea
              className="edit-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          ) : (
            <p className="preview-desc">{video.description}</p>
          )}
          {/* <p>
            <strong>Mood:</strong> {video.mood}
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default VideoPreviewModal;
