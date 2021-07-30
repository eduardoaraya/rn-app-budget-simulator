import React from 'react';
import {useEffect} from 'react';
import {Loading} from '../../components/Loading';
import {useAuth} from '../../contexts/AuthContext';

const Logout = () => {
  const {signOut} = useAuth();
  useEffect(() => {
    signOut();
  }, []);
  return <Loading />;
};

export default Logout;
