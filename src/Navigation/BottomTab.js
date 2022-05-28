import React, { Component, useContext, useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feat from 'react-native-vector-icons/Feather'
import Oct from 'react-native-vector-icons/Octicons'
import GlobalVar from '../Utils/GlobalVar';

import Search from '../Screens';
import NotLogged from '../Components/NotLogged';
import { getStorage } from '../Utils/GlobalFunc';
import Profile from '../Screens/Profile';
import Explore from '../Screens/Explore';
import { Text } from 'react-native';
import { ContextProvider } from '../Context/BaseContext';
import CreateArticle from '../Screens/CreateArticle';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  const context = useContext(ContextProvider)
  // const [isSignin, setIsSignin] = useState(false)

  // async function getStatusLogin() {
  //   const token = await getStorage('token')
  //   if (token) setIsSignin(true)
  // }
  // useEffect(() => {
  //   getStatusLogin()
  // }, [])
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard:true,
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
      <Tab.Screen name="CreateArticle" component={context.user ? CreateArticle : NotLogged}
        options={({ navigation, route }) => ({
          unmountOnBlur: true,
          tabBarLabel: ({ focused, color }) => {
            if (focused) {
              return <Oct name={'dot-fill'} color={color} size={10} style={{ marginBottom: 5 }} />
            } else {
              return <Text style={{ fontSize: 10, color, marginBottom: 5 }}>Buat Artikel</Text>
            }
          },
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Feat name={'plus-circle'} color={color} size={20} />
          )
        })} />
      <Tab.Screen name="Profile" component={context.user ? Profile : NotLogged}
        options={({ navigation, route }) => ({
          unmountOnBlur: true,
          headerShown: false,
          tabBarLabel: ({ focused, color }) => {
            if (focused) {
              return <Oct name={'dot-fill'} color={color} size={10} style={{ marginBottom: 5 }} />
            } else {
              return <Text style={{ fontSize: 10, color, marginBottom: 5 }}>Profile</Text>
            }
          },
          tabBarIcon: ({ focused, color }) => (
            <Feat name={'user'} color={color} size={20} />
          )
        })} />
    </Tab.Navigator>
  );
}