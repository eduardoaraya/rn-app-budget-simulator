import api from './api';

export type AuthData = string;

const AuthService = async (
  email: string,
  password: string,
): Promise<string | void> => {
  if (!email || !password) {
    return;
  }
  const result = await api.post('/auth/login', {
    email,
    password,
  });
  return result.data.token;
};

export default AuthService;
