import axios from 'axios';

const API_BASE_URL = 'https://notehub-public.goit.study/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export default apiClient;
