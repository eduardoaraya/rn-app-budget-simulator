/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {interceptorUnauthorized, setClientToken} from '../services/api';
import AuthService, {AuthData} from '../services/AuthService';
import {UserType} from '../shared/UserType';
import jwt_decode from 'jwt-decode';

export const AUTH_STORAGE = '@AuthData';
export const USER_STORAGE = '@UserData';

type AuthContextData = {
  authData?: AuthData;
  loading: boolean;
  signIn({email, password}: {email: string; password: string}): Promise<void>;
  signOut(): void;
  setDataAuthentication(token: string): Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({children}) => {
  const [authData, setAuthData] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  const signOut = async () => {
    setAuthData(undefined);
    await AsyncStorage.removeItem(AUTH_STORAGE);
  };

  useEffect(() => {
    loadStorageData();
    interceptorUnauthorized(signOut);
    return () => setLoading(false);
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

  const setDataAuthentication = async (token: string) => {
    const data = jwt_decode<UserType>(token);
    await AsyncStorage.setItem(AUTH_STORAGE, token);
    await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(data));
    setAuthData(token);
    await setClientToken(token);
  };

  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const token = await AuthService(email, password);
    if (token) {
      setDataAuthentication(token);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authData,
        loading,
        signIn,
        signOut,
        setDataAuthentication,
      }}>
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
