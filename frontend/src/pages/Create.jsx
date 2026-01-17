import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button, MenuItem, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { uploadVideo } from "../api/video.api";
import "../styles/create.css";

const MOODS = ["calm", "happy", "sad", "healing", "confused", "hopeful"];

// const GENRES = ["Travel", "Lifestyle", "Personal", "Daily Vlog"];

const Create = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [thumbPreview, setThumbPreview] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    // genre: "",
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

  console.log("FILE SELECTED:", name, file);

  if (!file) return;

  if (name === "video") {
    setFormData((prev) => ({ ...prev, videoFile: file }));
  }

  if (name === "thumbnail") {
    setFormData((prev) => ({ ...prev, thumbnailFile: file }));
    setThumbPreview(URL.createObjectURL(file));
  }
};

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("UPLOADER USER DETAILS");
    console.log(user);

    console.log("UPLOAD DATA");
    console.log("STATE BEFORE SUBMIT:", formData);
    const uploadData = new FormData();
    uploadData.append("title", formData.title);
    uploadData.append("description", formData.description);
    // uploadData.append("genre", formData.genre);
    uploadData.append("mood", formData.mood.toLowerCase());
    uploadData.append("video", formData.video);
    uploadData.append("thumbnail", formData.thumbnail);

    console.log("VIDEO UPLOADED");
    console.log({
      title: formData.title,
      description: formData.description,
      //   genre: formData.genre,
      mood: formData.mood,
      video: formData.videoFile,
      thumbnail: formData.thumbnailFile,
    });
    console.log("SENDING FORM DATA...");

    const res = await uploadVideo(uploadData);

    console.log("BACKEND RESPONSE:", res.data);

    navigate("/browse");
  };

  return (
    <div className="create-video-page">
      <h1>Upload New Memory</h1>
      <p className="subtitle">Capture and preserve your moments forever</p>

      <form className="video-form" onSubmit={handleSubmit}>
        {/* Thumbnail Upload */}
        <label className={`upload-box ${formData.thumbnail ? "active" : ""}`}>
          <input
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            name="thumbnail"
            style={{ display: "none" }}
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

        {/* Video Upload */}
        <label className={`upload-box ${formData.video ? "active" : ""}`}>
          <input
            type="file"
            accept="video/*"
            name="video"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          {formData.video ? (
            <>
              <span className="file-name">{formData.video.name}</span>
              <small>
                {(formData.video.size / (1024 * 1024)).toFixed(2)} MB
              </small>
            </>
          ) : (
            <>
              <span>Upload video</span>
              <small>MP4, MOV, WEBM</small>
            </>
          )}
        </label>

        {/* Title */}
        <TextField
          fullWidth
          variant="filled"
          label="Memory Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        {/* Description */}
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

        {/* Genre + Mood */}
        <div className="row">
          {/* <TextField
            select
            fullWidth
            variant="filled"
            label="Genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
          >
            {GENRES.map((g) => (
              <MenuItem key={g} value={g}>
                {g}
              </MenuItem>
            ))}
          </TextField> */}

          <TextField
            select
            fullWidth
            variant="filled"
            label="Mood"
            name="mood"
            value={formData.mood}
            onChange={handleChange}
            required
          >
            {MOODS.map((m) => (
              <MenuItem key={m} value={m}>
                {m}
              </MenuItem>
            ))}
          </TextField>
        </div>

        {/* Actions */}
        <div className="actions">
          <Button type="submit" className="primary-btn">
            Upload Memory
          </Button>
          <Button
            className="secondary-btn"
            onClick={() => navigate("/browser")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Create;
