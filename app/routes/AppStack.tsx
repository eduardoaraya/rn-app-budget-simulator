import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/home/Home';
import NewBudget from '../screens/budget/NewBudget';

const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        options={{
          title: '',
        }}
        component={Home}
      />
      <Stack.Screen
        name="NewBudget"
        options={{
          title: 'Novo orçamento',
        }}
        component={NewBudget}
      />
    </Stack.Navigator>
  );
};
