import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ListBudget from '../budget/ListBudget';
import Profile from '../profile/Profile';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../../components/core/colors';

const Tab = createBottomTabNavigator();

const TabIcons = {
  List: 'list',
  Profile: 'cog',
};

const Home = ({signOut}) => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          return <Icon name={TabIcons[route.name]} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: Colors.primaryColor,
        inactiveTintColor: Colors.secundaryColor,
      }}>
      <Tab.Screen
        name="List"
        options={{
          title: '',
        }}
        component={ListBudget}
      />
      <Tab.Screen
        name="Profile"
        options={{
          title: '',
        }}
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default Home;
