import axios from "./axios";

export const getVideos = () => axios.get("/videos");
export const getVideoById = (id) => axios.get(`/videos/${id}`);
export const searchVideos = (query) => axios.get(`/videos/search?query=${query}`);
export const getSeriesVideos = (seriesId) => axios.get(`/videos/series/${seriesId}`);
export const uploadVideo = (videoData) => axios.post("/videos/upload", videoData, {
  headers: { "Content-Type": "multipart/form-data" },
});
export const updateVideo = (id, data) => axios.put(`/videos/${id}`, data);
export const deleteVideo = (id) => axios.delete(`/videos/${id}`);
