import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, Feather } from '@expo/vector-icons';

import Home from '../pages/home';
import Profile from '../pages/profile';
import Map from '../pages/map';
import { Platform } from 'react-native';


const Tab = createBottomTabNavigator();

export default function MainTab(){
  return(
    
    <Tab.Navigator  
      initialRouteName='Inicio'
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'white',
          paddingBottom: Platform.OS === 'ios' ? 20 : 2, 
          paddingTop: 5,
        },
        headerShown: false,
        tabBarActiveTintColor: '#FD4872',
        tabBarInactiveTintColor: '#6C6C80',

      }}
    >
      <Tab.Screen 
        name ="Procurar" 
        component={Map}
        options={{
          tabBarIcon: ({size, color}) => (
            <Feather name="search" size={size} color={color}/>
          )
        }}
      />
      <Tab.Screen 
        name ="Inicio" 
        component={Home}
        options={{
          tabBarIcon: ({size, color}) => (
            <Entypo name="home" size={size} color={color}/>
          )
        }}
      />
      <Tab.Screen 
        name ="Perfil" 
        component={Profile}
        options={{
          tabBarIcon: ({size, color}) => (
            <Feather name="user" size={size} color={color}/>
          )
        }}
      />
    </Tab.Navigator>
  )
}