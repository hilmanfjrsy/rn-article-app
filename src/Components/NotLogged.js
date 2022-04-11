import React, { Component } from 'react';
import { SafeAreaView, Text, View, TextInput, StyleSheet } from 'react-native';
import GlobalStyles from '../Utils/GlobalStyles';
import ButtonPrimary from './ButtonPrimary';
import Feat from 'react-native-vector-icons/Feather'

export default function NotLogged({ navigation, route, icon = 'log-in', text = 'Anda Belum Login', showButton = true }) {
  return (
    <SafeAreaView style={[GlobalStyles.container, { justifyContent: 'center',alignSelf:'center' }]}>
      <View style={{ alignItems: 'center' }}>
        <Feat name={icon} size={80} color={'grey'} />
        <Text style={[GlobalStyles.fontSecondary, { fontSize: 14, marginBottom: 20, marginTop: 30 }]}>{text}</Text>
        {showButton && <ButtonPrimary onPress={() => navigation.navigate('Login')} text={'Login'} />}
      </View>
    </SafeAreaView>
  )
}
