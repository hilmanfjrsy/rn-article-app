import React, { Component, useEffect } from 'react';
import { View, Text, StatusBar, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';

import splash from './Assets/splash.jpg'

const { width, height } = Dimensions.get('screen')
export default function SplashScreen({ navigation, route }) {

  useEffect(() => {
    setTimeout(async () => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'BottomTab' }],
      });
    }, 3000);
  }, [])
  return (
    <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
      <StatusBar hidden />
      <FastImage
        source={splash}
        style={{ width, height }}
        resizeMode='contain'
      />
    </View>
  )
}