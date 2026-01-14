import axios from "./axios";

export const updateProgress = (data) => axios.post("/progress", data);
export const getContinueWatching = () => axios.get("/progress/continue-watching");
export const removeProgress = (videoId) => axios.delete(`/progress/${videoId}`);