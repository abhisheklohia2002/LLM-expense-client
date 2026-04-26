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

export const createTab = async(payload)=>{
  return await api.post(`/chat/create`,payload);
}

export const getTab = async(userId)=>{
  if(userId){
    return await api.get(`/chat/get/${userId}`);
  }
  return 
}


export const updateTab = async(payload,chatId)=>{
  return await api.put(`/chat/update/${chatId}`,payload);
}

export const deleteTab = async(payload,chatId)=>{
  return await api.delete(`/chat/delete/${chatId}`,payload);
}
