import React, { Component } from 'react';
import { SafeAreaView, Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import GlobalStyles from '../Utils/GlobalStyles';
import ButtonPrimary from './ButtonPrimary';
import Feat from 'react-native-vector-icons/Feather'
import Ent from 'react-native-vector-icons/Entypo'
import GlobalVar from '../Utils/GlobalVar';

export default function NotLogged({ navigation, route, icon = 'log-in', text = 'Anda Belum Login', showButton = true }) {
  return (
    <SafeAreaView style={[GlobalStyles.container, { justifyContent: 'center', alignSelf: 'center' }]}>
      <View style={{ alignItems: 'center' }}>
        <Feat name={icon} size={80} color={'grey'} />
        <Text style={[GlobalStyles.fontSecondary, { fontSize: 14, marginBottom: 20, marginTop: 30 }]}>{text}</Text>
        {showButton &&
          <>
            <ButtonPrimary onPress={() => navigation.navigate('Login')} text={'Login'} />

            <View style={[GlobalStyles.row, { marginTop: 80 }]}>
              <TouchableOpacity
                hitSlop={GlobalVar.hitSlop}
                onPress={() => { navigation.navigate('Faq') }}
              >
                <Text style={[GlobalStyles.fontSecondary, { fontSize: 14 }]}>FAQ</Text>
              </TouchableOpacity>
              <Ent size={15} color={GlobalVar.greyColor} name='dot-single' style={{ marginHorizontal: 10 }} />
              <TouchableOpacity
                hitSlop={GlobalVar.hitSlop}
                onPress={() => { navigation.navigate('About') }}
              >
                <Text style={[GlobalStyles.fontSecondary, { fontSize: 14 }]}>Tentang Aplikasi</Text>
              </TouchableOpacity>
            </View>
          </>
        }
      </View>
    </SafeAreaView>
  )
}
