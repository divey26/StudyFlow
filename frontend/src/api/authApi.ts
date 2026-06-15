import { LoginInput, LoginResponse, RegisterInput, User } from '../types/auth';
import { apiClient } from './client';

export const authApi = {
  async register(input: RegisterInput) {
    const { data } = await apiClient.post<{ user: User }>('/auth/register', input);
    return data;
  },
  async login(input: LoginInput) {
    const { data } = await apiClient.post<LoginResponse>('/auth/login', input);
    return data;
  },
  async me() {
    const { data } = await apiClient.get<User>('/auth/me');
    return data;
  },
};
