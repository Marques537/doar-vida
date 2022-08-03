import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Preload from '../pages/preload';
import Login from '../pages/login';
import Register from '../pages/register';
import AuthRoutes from '../routes/auth.routes';
import Detail from '../pages/detail';
const Stack = createStackNavigator();

export default () => (

  <Stack.Navigator
  initialRouteName='Preload'
  screenOptions={{ headerShown: false, cardStyle: {backgroundColor: '#f0f0f5'} }}
  >
    <Stack.Screen name="Preload" component={Login}/>
    <Stack.Screen name="Login" component={Login}/>
    <Stack.Screen name="Register" component={Register}/>
    <Stack.Screen name="MainTab" component={AuthRoutes}/>
    <Stack.Screen name='Detail' component={Detail}/>
  </Stack.Navigator>

);