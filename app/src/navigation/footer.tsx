import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Home from '../components/home/mainHome';
import Pet from '../components/Pet/mainPet';
import Profile from '../components/profile/profile';
import { TabParamList } from "../navigation/types";

const Tab = createBottomTabNavigator<TabParamList>();

export default function Footer() {
  return (
      <Tab.Navigator screenOptions={{ headerShown: false }} >
        <Tab.Screen name="Home" component={Home}   />
        <Tab.Screen name="Profile" component={Profile}  />
        <Tab.Screen name="Pet" component={Pet}  />
      </Tab.Navigator>
  );
}