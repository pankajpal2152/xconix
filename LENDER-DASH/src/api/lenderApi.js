import api from "./api";

export const listLenders = (params) =>
  api.get("/lender/list", { params });

export const createLender = (payload) =>
  api.post("/lender/create", payload);

export const getLenderById = (id) =>
  api.get(`/lender/read/${id}`);

export const updateLender = (id, payload) =>
  api.put(`/lender/update/${id}`, payload);

export const deleteLender = (id) =>
  api.delete(`/lender/delete/${id}`);
