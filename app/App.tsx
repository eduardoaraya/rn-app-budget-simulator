import 'react-native-gesture-handler';
import React from 'react';
import {Router} from './routes/Router';
import {AuthProvider} from './contexts/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
};

export default App;
