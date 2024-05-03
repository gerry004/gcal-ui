import api from '../constants/axios';

export const fetchAuthUrl = async () => {
  const { data } = await api.get('/request');
  return data.url;
}