import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button, MenuItem, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { uploadVideo } from "../api/video.api";
// import { createSeries } from "../api/series.api";
import "../styles/create.css";

const MOODS = ["calm", "happy", "sad", "healing", "confused", "hopeful"];

const Create = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [thumbPreview, setThumbPreview] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    mood: "",
    videoFile: null,
    thumbnailFile: null,
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (!file) return;

    if (name === "video") {
      setFormData((prev) => ({ ...prev, videoFile: file }));
    }

    if (name === "thumbnail") {
      setFormData((prev) => ({ ...prev, thumbnailFile: file }));
      setThumbPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.videoFile) {
      alert("Upload a video");
      return;
    }

    try {
      if (formData.videoFile) {
        const uploadData = new FormData();

        uploadData.append("title", formData.title);
        uploadData.append("description", formData.description);
        uploadData.append("mood", formData.mood.toLowerCase());
        uploadData.append("video", formData.videoFile);

        if (formData.thumbnailFile) {
          uploadData.append("thumbnail", formData.thumbnailFile);
        }
        await uploadVideo(uploadData);
        navigate("/browse");
        return;
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="create-video-page">
      <h1>Upload New Memory</h1>
      <p className="subtitle">Capture and preserve your moments forever</p>

      <form className="video-form" onSubmit={handleSubmit}>
        <label className={`upload-box ${formData.thumbnailFile ? "active" : ""}`}>
          <input
            type="file"
            accept="image/png,image/jpeg"
            name="thumbnail"
            hidden
            onChange={handleFileChange}
          />

          {thumbPreview ? (
            <img src={thumbPreview} alt="Thumbnail preview" />
          ) : (
            <>
              <span>Upload thumbnail</span>
              <small>PNG, JPG up to 10MB</small>
            </>
          )}
        </label>

        <label className={`upload-box ${formData.videoFile ? "active" : ""}`}>
          <input
            type="file"
            accept="video/*"
            name="video"
            hidden
            onChange={handleFileChange}
          />

          {formData.videoFile ? (
            <>
              <span className="file-name">{formData.videoFile.name}</span>
              <small>
                {(formData.videoFile.size / (1024 * 1024)).toFixed(2)} MB
              </small>
            </>
          ) : (
            <>
              <span>Upload video</span>
              <small>MP4, MOV, WEBM</small>
            </>
          )}
        </label>


        <TextField
          fullWidth
          variant="filled"
          label="Memory Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required={!!formData.videoFile}
        />


        <TextField
          fullWidth
          variant="filled"
          multiline
          rows={4}
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />


        <TextField
          select
          fullWidth
          variant="filled"
          label="Mood"
          name="mood"
          value={formData.mood}
          onChange={handleChange}
          required={!!formData.videoFile}
        >
          {MOODS.map((m) => (
            <MenuItem key={m} value={m}>
              {m}
            </MenuItem>
          ))}
        </TextField>

        {/* ACTIONS */}
        <div className="actions">
          <Button type="submit" className="primary-btn">
            Save Memory
          </Button>
          <Button
            className="secondary-btn"
            onClick={() => navigate("/browse")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Create;
