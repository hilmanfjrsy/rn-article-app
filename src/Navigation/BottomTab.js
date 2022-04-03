import React, { Component, useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feat from 'react-native-vector-icons/Feather'
import Oct from 'react-native-vector-icons/Octicons'
import GlobalVar from '../Utils/GlobalVar';

import Search from '../Screens';
import Setting from '../Screens/Setting';
import NotLogged from '../Components/NotLogged';
import { getStorage } from '../Utils/GlobalFunc';
import Profile from '../Screens/Profile';
import Explore from '../Screens/Explore';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  const [isSignin, setIsSignin] = useState(false)

  async function getStatusLogin() {
    const token = await getStorage('token')
    if (token) setIsSignin(true)
  }
  useEffect(() => {
    getStatusLogin()
  }, [])
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { minHeight: 60 },
        tabBarActiveTintColor: GlobalVar.primaryColor,
      }}

    >
      <Tab.Screen name="Search" component={Search}
        options={({ navigation, route }) => ({
          unmountOnBlur: true,
          tabBarLabel: ({ focused, color }) => {
            if (focused) {
              return <Oct name={'dot-fill'} color={color} size={10} style={{ marginBottom: 5 }} />
            } else {
              return <Text style={{ fontSize: 10, color, marginBottom: 5 }}>Home</Text>
            }
          },
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Feat name={'home'} color={color} size={20} />
          )
        })} />
      <Tab.Screen name="Explore" component={Explore}
        options={({ navigation, route }) => ({
          unmountOnBlur: true,
          tabBarLabel: ({ focused, color }) => {
            if (focused) {
              return <Oct name={'dot-fill'} color={color} size={10} style={{ marginBottom: 5 }} />
            } else {
              return <Text style={{ fontSize: 10, color, marginBottom: 5 }}>Explore</Text>
            }
          },
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Feat name={'compass'} color={color} size={20} />
          )
        })} />
      <Tab.Screen name="Profile" component={Profile}
        options={({ navigation, route }) => ({
          unmountOnBlur: true,
          headerShown: false,
          tabBarLabel: ({ focused, color }) => {
            if (focused) {
              return <Oct name={'dot-fill'} color={color} size={10} style={{ marginBottom: 5 }} />
            } else {
              return <Text style={{ fontSize: 10, color, marginBottom: 5 }}>Collection</Text>
            }
          },
          tabBarIcon: ({ focused, color }) => (
            <Feat name={'user'} color={color} size={20} />
          )
        })} />
      <Tab.Screen name="Setting" component={isSignin ? Setting : NotLogged}
        options={({ navigation, route }) => ({
          unmountOnBlur: true,
          tabBarLabel: ({ focused, color }) => {
            if (focused) {
              return <Oct name={'dot-fill'} color={color} size={10} style={{ marginBottom: 5 }} />
            } else {
              return <Text style={{ fontSize: 10, color, marginBottom: 5 }}>Menu</Text>
            }
          },
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Feat name={'menu'} color={color} size={20} />
          )
        })} />
    </Tab.Navigator>
  );
}