import axios from "./axios";

export const getVideos = () => axios.get("/videos");
export const getVideoById = (id) => axios.get(`/videos/${id}`);
export const searchVideos = (query) => axios.get(`/videos/search?query=${query}`);
export const getSeriesVideos = (seriesId) => axios.get(`/videos/series/${seriesId}`);
export const uploadVideo = (data) => axios.post("/videos/upload", data);
export const updateVideo = (id, data) => axios.put(`/videos/${id}`, data);
export const deleteVideo = (id) => axios.delete(`/videos/${id}`);
