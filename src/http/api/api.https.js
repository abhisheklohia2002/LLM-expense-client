import api from "../clients/clients.https";

export const login = async (payload) => {
  return await api.post(`/auth/login`,payload);
};

export const signUp = async (payload) => {
  return await api.post(`/auth/register`,payload);
};

export const self = async () => {
  return await api.get(`/auth/self`);
};

export const refreshToken = async (payload) => {
  return await api.post(`/auth/refreshToken`,payload);
};