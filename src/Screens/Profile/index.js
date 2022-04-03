import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component, useEffect, useState, useContext } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import RenderHotel from '../../Components/RenderHotel';
import GlobalStyles from '../../Utils/GlobalStyles';
import GlobalVar from '../../Utils/GlobalVar';
import NotLogged from '../../Components/NotLogged';
import { ContextProvider } from '../../Context/BaseContext';
import FastImage from 'react-native-fast-image';
import { hideEmail } from '../../Utils/GlobalFunc';

export default function Profile({ navigation, route }) {
  const context = useContext(ContextProvider)
  const [profile, setProfile] = useState(context.user)
  const [wishlist, setWishlist] = useState([])
  const [booking, setBooking] = useState([])

  async function getProfile() {
    let prof = JSON.parse(await AsyncStorage.getItem('profile'))
    let book = JSON.parse(await AsyncStorage.getItem('booking_' + prof.username)) || []
    let wish = JSON.parse(await AsyncStorage.getItem('wishlist_' + prof.username)) || []
    if (prof) {
      setProfile(prof)
    }
    if (book) {
      setBooking(book)
    }
    if (wish) {
      setWishlist(wish)
    }
  }

  return (
    <SafeAreaView style={[GlobalStyles.container, { padding: 0, flex: 1 }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[GlobalStyles.cardBody, { borderRadius: 0, marginTop: 0, padding: 20 }]}>
          <View style={[GlobalStyles.row, {marginTop:20}]}>
            <View style={{ alignItems: 'center' }}>
              <FastImage
                source={{
                  uri: profile?.avatar.avatar
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
                  <Text style={[GlobalStyles.fontPrimary, { fontWeight: '500', fontSize: 18 }]}>{booking.length}</Text>
                  <Text style={[GlobalStyles.fontSecondary, {}]}>Artikel disukai</Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                  <Text style={[GlobalStyles.fontPrimary, { fontWeight: '500', fontSize: 18 }]}>0</Text>
                  <Text style={[GlobalStyles.fontSecondary, {}]}>Koleksi</Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                  <Text style={[GlobalStyles.fontPrimary, { fontWeight: '500', fontSize: 18 }]}>{wishlist.length}</Text>
                  <Text style={[GlobalStyles.fontSecondary, {}]}>Artikel</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  )
}