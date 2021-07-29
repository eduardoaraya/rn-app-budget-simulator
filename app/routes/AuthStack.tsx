import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Auth from '../screens/auth/Auth';
import Home from '../screens/home/Home';

const Stack = createStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Auth"
        options={{
          title: '',
        }}
        component={Auth}
      />
    </Stack.Navigator>
  );
};
