import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component, useEffect, useState, useContext } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import GlobalStyles from '../../Utils/GlobalStyles';
import GlobalVar from '../../Utils/GlobalVar';
import { ContextProvider } from '../../Context/BaseContext';
import FastImage from 'react-native-fast-image';
import { getRequest, hideEmail, showNotification } from '../../Utils/GlobalFunc';

import Feat from 'react-native-vector-icons/Feather'
import ButtonPrimary from '../../Components/ButtonPrimary';
import CardVertical from '../../Components/CardVertical';
import Loading from '../../Components/Loading';

export default function Profile({ navigation, route }) {
  const context = useContext(ContextProvider)
  const [profile, setProfile] = useState(null)
  const [myArticles, setMyArticles] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  async function getArticles() {
    setIsLoading(true)
    let { data } = await getRequest('homes/my-articles')
    if (data) {
      setMyArticles(data.my_articles)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getArticles()
  }, [])

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
              <Text style={[GlobalStyles.fontSecondary, {}]}>Lihat statistik semua Artikel kamu disini!</Text>
            </View>
          </View>
        </TouchableOpacity>
        {isLoading ?
            <Loading />
          :
          <View style={[GlobalStyles.p20]}>
            <Text style={[GlobalStyles.fontPrimary, GlobalStyles.fontTitle, { marginBottom: 20 }]}>Artikel Saya</Text>
            {myArticles.map((item, index) => <CardVertical item={item} key={index} index={index} statistik={true} navigation={navigation}  onPress={() => navigation.navigate('DetailArticle', { id: item.id })} />)}
          </View>
        }
      </ScrollView>
    </SafeAreaView>
  )

  function RenderTop() {
    return (
      <View style={[GlobalStyles.cardBody, { borderRadius: 0, marginTop: 0, padding: 20 }]}>
        <ButtonPrimary
          style={{ alignSelf: 'flex-end' }}
          onPress={handleLogout}
          text="Keluar"
          color='firebrick'
          type='label'
          icon='log-out'
        />
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
                <Text style={[GlobalStyles.fontPrimary, { fontWeight: '500', fontSize: 18 }]}>{profile?.total_views}</Text>
                <Text style={[GlobalStyles.fontSecondary, {}]}>Artikel dilihat</Text>
              </View>

              <View style={{ alignItems: 'center' }}>
                <Text style={[GlobalStyles.fontPrimary, { fontWeight: '500', fontSize: 18 }]}>{secondsToHms(profile ? profile.sum_duration : 0)}</Text>
                <Text style={[GlobalStyles.fontSecondary, {}]}>Total tayang</Text>
              </View>

              <View style={{ alignItems: 'center' }}>
                <Text style={[GlobalStyles.fontPrimary, { fontWeight: '500', fontSize: 18 }]}>{profile?.total_articles}</Text>
                <Text style={[GlobalStyles.fontSecondary, {}]}>Artikel</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }

  function secondsToHms(d) {
    var date = new Date(0);
    date.setSeconds(d); // specify value for SECONDS here
    var timeString = date.toISOString().substr(11, 8);
    return timeString
  }

  async function handleLogout() {
    Alert.alert(
      "Konfirmasi",
      "Anda yakin ingin keluar?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK", onPress: async () => {
            AsyncStorage.getAllKeys().then(key => {
              AsyncStorage.multiRemove(key)
              showNotification('success', 'Keluar', 'Anda telah keluar')
              context.setUser(null)
              navigation.reset({
                index: 0,
                routes: [{ name: 'SplashScreen' }],
              });
            })
          }
        }
      ]
    );
  }
}