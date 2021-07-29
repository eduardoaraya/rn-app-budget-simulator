import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ListBudget from '../budget/ListBudget';
import Profile from '../profile/Profile';

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="List" component={ListBudget} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default Home;
