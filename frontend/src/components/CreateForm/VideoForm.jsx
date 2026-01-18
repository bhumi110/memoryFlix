import { useState } from "react";
import { TextField, MenuItem, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { uploadVideo } from "../../api/video.api";


const MOODS = ["calm", "happy", "sad", "healing", "confused", "hopeful"];

const VideoForm = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    description: "",
    mood: "",
    video: null,
    thumbnail: null
  });

  const handleFile = (e) => {
    setData((p) => ({ ...p, [e.target.name]: e.target.files[0] }));
  };

  const handleChange = (e) => {
    setData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!data.video) return alert("Video required");

    const fd = new FormData();
    Object.entries(data).forEach(([k, v]) => v && fd.append(k, v));

    await uploadVideo(fd);
    navigate("/browse");
  };

  return (
    <form onSubmit={submit} className="video-form">
      <input type="file" name="video" accept="video/*" onChange={handleFile} />
      <input type="file" name="thumbnail" accept="image/*" onChange={handleFile} />

      <TextField name="title" label="Title" fullWidth onChange={handleChange} required />
      <TextField
        name="description"
        label="Description"
        multiline
        rows={4}
        fullWidth
        onChange={handleChange}
      />

      <TextField select name="mood" label="Mood" fullWidth onChange={handleChange}>
        {MOODS.map((m) => (
          <MenuItem key={m} value={m}>
            {m}
          </MenuItem>
        ))}
      </TextField>

      <Button type="submit">Upload</Button>
    </form>
  );
};

export default VideoForm;