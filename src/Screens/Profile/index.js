import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component, useEffect, useState, useContext } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import GlobalStyles from '../../Utils/GlobalStyles';
import GlobalVar from '../../Utils/GlobalVar';
import { ContextProvider } from '../../Context/BaseContext';
import FastImage from 'react-native-fast-image';
import { hideEmail } from '../../Utils/GlobalFunc';

import Feat from 'react-native-vector-icons/Feather'

export default function Profile({ navigation, route }) {
  const context = useContext(ContextProvider)
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    setProfile(Object.create(context.user))
  }, [context])

  return (
    <SafeAreaView style={[GlobalStyles.container, { padding: 0, flex: 1 }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <RenderTop />
        <TouchableOpacity
          onPress={() => navigation.navigate('Statistik')}
          style={[GlobalStyles.cardBody, { marginHorizontal: 20 }]}
        >
          <View style={[GlobalStyles.row, {}]}>
            <Feat name="activity" size={20} color={GlobalVar.primaryColor} />
            <View style={{ marginLeft: 10 }}>
              <Text style={[GlobalStyles.fontPrimary, GlobalStyles.fontTitle, { fontSize: 14 }]}>Dashboard Kreator</Text>
              <Text style={[GlobalStyles.fontSecondary, {}]}>Lihat statistik Artikel kamu disini</Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )

  function RenderTop() {
    return (
      <View style={[GlobalStyles.cardBody, { borderRadius: 0, marginTop: 0, padding: 20 }]}>
        <View style={[GlobalStyles.row, { marginTop: 20 }]}>
          <View style={{ alignItems: 'center' }}>
            <FastImage
              source={{
                uri: profile?.avatar?.avatar
              }}
              style={{ height: 80, width: 80, borderRadius: 100 }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('EditProfile', { profile })}
              style={{ borderWidth: 1, borderColor: GlobalVar.primaryColor, marginTop: 15, borderRadius: 5, paddingHorizontal: 15, paddingVertical: 5 }}
            >
              <Text style={[GlobalStyles.fontSecondary, { color: GlobalVar.primaryColor, fontWeight: '500' }]}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginHorizontal: 20, flex: 1 }}>
            <Text style={[GlobalStyles.fontPrimary, { fontWeight: '500', fontSize: 18 }]}>{profile?.name}</Text>
            <Text style={[GlobalStyles.fontSecondary, {}]}>{hideEmail(profile?.email)}</Text>

            <View style={[GlobalStyles.spaceBetween, { marginTop: 20 }]}>
              <View style={{ alignItems: 'center' }}>
                <Text style={[GlobalStyles.fontPrimary, { fontWeight: '500', fontSize: 18 }]}>{0}</Text>
                <Text style={[GlobalStyles.fontSecondary, {}]}>Artikel disukai</Text>
              </View>

              <View style={{ alignItems: 'center' }}>
                <Text style={[GlobalStyles.fontPrimary, { fontWeight: '500', fontSize: 18 }]}>0</Text>
                <Text style={[GlobalStyles.fontSecondary, {}]}>Koleksi</Text>
              </View>

              <View style={{ alignItems: 'center' }}>
                <Text style={[GlobalStyles.fontPrimary, { fontWeight: '500', fontSize: 18 }]}>{0}</Text>
                <Text style={[GlobalStyles.fontSecondary, {}]}>Artikel</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
  async function handleLogout() {
    console.log('asd')
    Alert.alert(
      "Confirmation",
      "You want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK", onPress: async () => {
            AsyncStorage.getAllKeys().then(key => { AsyncStorage.multiRemove(key) })
            showNotification('success', 'Keluar', 'Anda telah keluar')
            navigation.reset({
              index: 0,
              routes: [{ name: 'SplashScreen' }],
            });
          }
        }
      ]
    );
  }
}