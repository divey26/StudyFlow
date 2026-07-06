import axios from 'axios';

// In production (Vercel), frontend and backend share the same domain.
// API requests go to /api/* which Vercel proxies to the serverless function.
// In local dev, the backend runs separately on port 4000.
const baseURL = import.meta.env.VITE_API_URL
  ?? (import.meta.env.PROD ? '' : 'http://localhost:4000');

export const apiClient = axios.create({
  baseURL,
});

export function getApiError(error: unknown) {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;
    if (Array.isArray(message)) return message.join(', ');
    return message ?? error.message;
  }
  return 'Something went wrong';
}
