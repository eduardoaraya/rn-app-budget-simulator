import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Auth from '../screens/auth/Auth';
import Register from '../screens/register/Register';

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
      <Stack.Screen
        name="Register"
        options={{
          title: '',
        }}
        component={Register}
      />
    </Stack.Navigator>
  );
};
