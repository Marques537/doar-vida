import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/login';
import AuthRoutes from '../routes/auth.routes';


const Stack = createStackNavigator();


export default () => (
  <Stack.Navigator
  initialRouteName='Preload'
  screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="Preload" component={Login}/>
    <Stack.Screen name="Login" component={Login}/>
    <Stack.Screen name="MainTab" component={AuthRoutes}/>

  </Stack.Navigator>
);