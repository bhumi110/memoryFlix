import axios from "./axios";

export const getAllSeries = () => axios.get("/series/all");
export const getSeriesById = (id) => axios.get(`/series/${id}`);
export const createSeries = (data) => axios.post("/series/create", data);
export const updateSeries = (id, data) => axios.put(`/series/update/${id}`, data);
export const deleteSeries = (id) => axios.delete(`/series/delete/${id}`);

export const uploadCover = (seriesId, file) => {
  const formData = new FormData();
  formData.append("cover", file);
  return axios.post(`/series/${seriesId}/cover`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
