import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createSeries } from "../../api/series.api";

const SeriesForm = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    description: ""
  });

  const submit = async (e) => {
    e.preventDefault();

    if (!data.title) return alert("Series title required");

    await createSeries(data);
    navigate("/browse");
  };

  return (
    <form onSubmit={submit} className="video-form">
      <TextField
        label="Series Title"
        fullWidth
        required
        onChange={(e) => setData({ ...data, title: e.target.value })}
      />

      <TextField
        label="Description"
        multiline
        rows={4}
        fullWidth
        onChange={(e) => setData({ ...data, description: e.target.value })}
      />

      <Button type="submit">Create Series</Button>
    </form>
  );
};

export default SeriesForm;