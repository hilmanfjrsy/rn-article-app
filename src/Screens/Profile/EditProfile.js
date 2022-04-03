import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component, useContext, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import ButtonPrimary from '../../Components/ButtonPrimary';
import RenderTextHorizontal from '../../Components/RenderTextHorizontal';
import { ContextProvider } from '../../Context/BaseContext';
import { hideEmail, setStorage, showNotification } from '../../Utils/GlobalFunc';
import GlobalStyles from '../../Utils/GlobalStyles';
import Feat from 'react-native-vector-icons/Feather'

export default function EditProfile({ navigation, route }) {
  const context = useContext(ContextProvider)
  const profile = context.user
  const [fullName, setFullName] = useState(profile?.name)
  const [description, setDescription] = useState(profile?.description)

  return (
    <SafeAreaView style={[GlobalStyles.container, GlobalStyles.p20, { paddingBottom: 0, backgroundColor: 'white' }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <Text style={[GlobalStyles.fontPrimary, { fontSize: 30, fontWeight: 'bold', marginBottom: 30 }]}>Edit Profile</Text> */}
        <View>
          <FastImage
            source={{
              uri: profile?.avatar.avatar
            }}
            style={{ height: 100, width: 100, borderRadius: 100, alignSelf: 'center' }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <ButtonPrimary
            onPress={() => { }}
            type="label"
            text="Ubah Gambar"
            style={{ alignSelf: 'center', marginTop: 10 }}
          />
          <RenderTextHorizontal
            disabled
            textInput
            text={'Email'}
            valueTextInput={hideEmail(profile.email)}
            inputDisabled
          />
          <RenderTextHorizontal
            disabled
            textInput
            text={'Nama Lengkap'}
            onChangeText={(v) => setFullName(v)}
            valueTextInput={fullName}
          />
          <RenderTextHorizontal
            disabled
            textInput
            text={'Bio'}
            onChangeText={(v) => setDescription(v)}
            valueTextInput={description}
          />
          <ButtonPrimary
            text={'Update Profile'}
            style={{ marginTop: 30 }}
            onPress={() => saveProfile()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )

  async function saveProfile() {
    let newUpdate = {
      name: fullName,
      avatar_id: avatarId,
      description
    }
    // await setStorage('user', all)
    // await setStorage('user', all)
    showNotification('success', 'Berhasil', 'Profil telah diperbarui')
    navigation.goBack()
  }
}