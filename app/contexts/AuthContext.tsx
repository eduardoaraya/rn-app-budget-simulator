import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {interceptorUnauthorized, setClientToken} from '../services/api';
import AuthService, {AuthData} from '../services/AuthService';

export const AUTH_STORAGE = '@AuthData';

type AuthContextData = {
  authData?: AuthData;
  loading: boolean;
  signIn({email, password}: {email: string; password: string}): Promise<void>;
  signOut(): void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({children}) => {
  const [authData, setAuthData] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  const signOut = async () => {
    setAuthData(undefined);
    await AsyncStorage.removeItem(AUTH_STORAGE);
  };

  useEffect(() => {
    loadStorageData();
    interceptorUnauthorized(signOut);
  }, []);

  async function loadStorageData(): Promise<void> {
    try {
      const authDataSerialized = await AsyncStorage.getItem(AUTH_STORAGE);
      if (authDataSerialized) {
        const _authData: string = authDataSerialized;
        setAuthData(_authData);
        setClientToken(_authData);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const token = await AuthService(email, password);
    if (token) {
      setAuthData(token);
      await AsyncStorage.setItem(AUTH_STORAGE, token);
      setClientToken(token);
    }
  };

  return (
    <AuthContext.Provider value={{authData, loading, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export {AuthContext, AuthProvider, useAuth};
