import React from 'react';
import { Dimensions, Linking, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import GlobalStyles from '../Utils/GlobalStyles';
import splash from '../Assets/splash.jpg'
import GlobalVar from '../Utils/GlobalVar';
import Ant from 'react-native-vector-icons/AntDesign'

const { width } = Dimensions.get('screen')
export default function About() {
  return (
    <SafeAreaView style={[GlobalStyles.container, { backgroundColor: 'white', alignItems: "center", justifyContent: 'space-evenly' }]}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <View style={{ alignItems: "center", justifyContent: 'center' }}>
        <Text style={[GlobalStyles.fontPrimary, GlobalStyles.fontTitle, { fontSize: 20 }]}>Artikel Apps</Text>
        <Text style={[GlobalStyles.fontSecondary, {}]}>Versi 1.0</Text>
        <FastImage
          source={splash}
          style={{ width: width / 2, height: width / 2 }}
          resizeMode='contain'
        />
        <Text style={[GlobalStyles.fontSecondary, { fontSize: 14, textAlign: 'center', marginHorizontal: 40, lineHeight: 20 }]}>Aplikasi ini dibangun dalam rangka memenuhi salah satu persyaratan memperoleh gelar Sarjana pada Fakultas Teknologi Informasi Universitas Adhirajasa Reswara Sanjaya.</Text>
      </View>

      <View style={{ alignItems: "center", justifyContent: 'center' }}>
        <View style={[GlobalStyles.spaceBetween, { width: 70, marginTop: 50, marginBottom: 30 }]}>
          <TouchableOpacity
            hitSlop={GlobalVar.hitSlop}
            onPress={() => Linking.openURL('https://github.com/hilmanfjrsy')}
          >
            <Ant name='github' size={25} color={GlobalVar.greyColor} />
          </TouchableOpacity>
          <TouchableOpacity
            hitSlop={GlobalVar.hitSlop}
            onPress={() => Linking.openURL('https://www.linkedin.com/in/hilmanfjrsy')}
          >
            <Ant name='linkedin-square' size={25} color={GlobalVar.greyColor} />
          </TouchableOpacity>
        </View>
        <Text>&#169; 2022 Hilman Fajri Fahriansyah</Text>
      </View>
    </SafeAreaView>
  )
}