import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Preload from '../pages/preload';
import Login from '../pages/login';
import Register from '../pages/register';
import MainTab from '../components/menu';
import Detail from '../pages/detail';
import RegisterReminder from '../pages/register-reminder';
const Stack = createStackNavigator();

export default () => (

  <Stack.Navigator
  initialRouteName='Preload'
  screenOptions={{ headerShown: false, cardStyle: {backgroundColor: '#f0f0f5'} }}
  >
    <Stack.Screen name="Preload" component={Login}/>
    <Stack.Screen name="Login" component={Login}/>
    <Stack.Screen name="Register" component={Register}/>
    <Stack.Screen name="MainTab" component={MainTab}/>
    <Stack.Screen name='Detail' component={Detail}/>
    <Stack.Screen name='RegisterReminder' component={RegisterReminder}/>
  </Stack.Navigator>

);