import axios from "./axios";

export const getVideos = () => axios.get("/videos");
export const getVideoById = (id) => axios.get(`/videos/${id}`);
export const searchVideos = (query) => axios.get(`/videos/search?query=${query}`);
export const getSeriesVideos = (seriesId) => axios.get(`/videos/series/${seriesId}`);
export const uploadVideo = (formData) => {
  return axios.post(
    "http://localhost:8080/videos/upload",
    formData
  );
};

export const updateVideo = (id, data) => axios.put(`/videos/${id}`, data);
export const deleteVideo = (id) => axios.delete(`/videos/${id}`);