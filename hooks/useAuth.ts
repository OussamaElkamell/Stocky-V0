import { useState, useEffect } from 'react';
import authService from '@/services/authService';
import { useRouter } from 'next/navigation';
import type { User } from '@/types/user'
import { toast } from 'sonner';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    loading: false,
    error: null,
  });
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setAuthState({
        user: null,
        token: storedToken,
        loading: false,
        error: null,
      });
      fetchUser(storedToken);
    } else {
      setAuthState(prevState => ({ ...prevState, loading: false }));
    }
  }, []);

  const fetchUser = async (token: string) => {
    setAuthState(prevState => ({ ...prevState, loading: true }));
    try {
      const user = await authService.getMe();
      setAuthState({ user, token, loading: false, error: null });
    } catch (error: any) {
      setAuthState({ user: null, token: null, loading: false, error: error.message });
      localStorage.removeItem('token');
    }
  };


  const signup = async (data: Record<string, any>) => {
    setAuthState({ user: null, token: null, loading: true, error: null });
    try {
      const { token, user } = await authService.signup(data);
      localStorage.setItem('token', token);
      setAuthState({ user, token, loading: false, error: null });
      router.push('/onboarding');
    } catch (error: any) {
      setAuthState({ user: null, token: null, loading: false, error: error.message });
    }
  };

  const login = async (data: Record<string, any>) => {
    setAuthState({ user: null, token: null, loading: true, error: null });
    try {
      const { token, user } = await authService.login(data);
      localStorage.setItem('token', token);
      setAuthState({ user, token, loading: false, error: null });
      router.push('/dashboard');
    } catch (error: any) {
      setAuthState({ user: null, token: null, loading: false, error: error.message });
    }
  };

  const logout = async () => {
    setAuthState({ user: null, token: null, loading: true, error: null });
    try {
      await authService.logout();
      localStorage.removeItem('token');
      setAuthState({ user: null, token: null, loading: false, error: null });
      router.push('/login');
    } catch (error: any) {
      setAuthState({ user: null, token: null, loading: false, error: error.message });
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    setAuthState(prevState => ({ ...prevState, loading: true, error: null }));
    try {
      await authService.updatePassword(currentPassword, newPassword);
      setAuthState(prevState => ({ ...prevState, loading: false }));
      toast("Password updated successfully!");
    } catch (error: any) {
      setAuthState(prevState => ({ ...prevState, loading: false, error: error.message }));
    }
  };

  return {
    ...authState,
    signup,
    login,
    logout,
    updatePassword,
  };
};

export default useAuth;