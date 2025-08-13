import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const createRegister = (data) => api.post('/registers', data);
export const updateRegister = (id, data) => api.put(`/registers/${id}`, data);
export const getRegisters = (search) => api.get(`/registers?search=${search || ''}`);
export const deleteRegister = (id) => api.delete(`/registers/${id}`);
export const getDealers = () => api.get('/dealers');
export const getSizesByBrand = (brand) => api.get(`/sizes?brand=${brand}`);
export const getConsultants = () => api.get('/consultants');