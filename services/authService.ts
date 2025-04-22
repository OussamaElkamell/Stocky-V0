import apiFetch from "./api-client";
import type { User } from "@/types/user";

const authService = {
  async signup(data: Record<string, any>): Promise<{ token: string; user: User }> {
    return apiFetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async login(data: Record<string, any>): Promise<{ token: string; user: User }> {
    return apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async logout(): Promise<void> {
    return apiFetch('/auth/logout', { method: 'GET' });
  },

  async forgotPassword(email: string): Promise<void> {
    return apiFetch('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  async resetPassword(token: string, password: string): Promise<void> {
    return apiFetch(`/auth/reset-password/${token}`, {
      method: 'PATCH',
      body: JSON.stringify({ password }),
    });
  },

  async updatePassword(currentPassword: string, newPassword: string): Promise<void> {
    return apiFetch('/auth/update-password', {
      method: 'PATCH',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  },

  async getMe(): Promise<User> {
    return apiFetch('/auth/me', { method: 'GET' });
  },
};

export default authService;