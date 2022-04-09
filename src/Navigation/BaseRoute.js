// In App.js in a new project

import React, { useEffect } from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './BottomTab';
import SplashScreen from '../SplashScreen';
import Login from '../Screens/Auth/Login';
import Register from '../Screens/Auth/Register';
import DetailHotel from '../Screens/DetailHotel';

import EditProfile from '../Screens/Profile/EditProfile';
import PickAvatar from '../Screens/Profile/PickAvatar';
import Statistik from '../Screens/Statistik';

const Stack = createNativeStackNavigator();

export default function BaseRoute() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'SplashScreen'}>
        <Stack.Screen name="BottomTab" component={BottomTab} options={({ navigation, route }) => ({
          headerShown: false
        })} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={({ navigation, route }) => ({
          headerShown: false
        })} />
        <Stack.Screen name="Login" component={Login} options={({ navigation, route }) => ({
          headerShown: false
        })} />
        <Stack.Screen name="Register" component={Register} options={({ navigation, route }) => ({
          headerShown: false
        })} />
        <Stack.Screen name="DetailHotel" component={DetailHotel} options={({ navigation, route }) => ({
          headerShown: true,
          headerTransparent: true,
          headerShadowVisible: false,
          headerTitle: ''
        })} />
        <Stack.Screen name="EditProfile" component={EditProfile} options={({ navigation, route }) => ({
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: '',
        })} />
        <Stack.Screen name="PickAvatar" component={PickAvatar} options={({ navigation, route }) => ({
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: '',
        })} />
        <Stack.Screen name="Statistik" component={Statistik} options={({ navigation, route }) => ({
          headerShown: true,
          headerTransparent: false,
          headerShadowVisible: false,
          headerTitle: 'Statistik',
        })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}