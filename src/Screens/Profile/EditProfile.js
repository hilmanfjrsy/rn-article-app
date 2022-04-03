import React, { useContext, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import ButtonPrimary from '../../Components/ButtonPrimary';
import RenderTextHorizontal from '../../Components/RenderTextHorizontal';
import { ContextProvider } from '../../Context/BaseContext';
import { hideEmail, postRequest, setStorage, showNotification } from '../../Utils/GlobalFunc';
import GlobalStyles from '../../Utils/GlobalStyles';

export default function EditProfile({ navigation, route }) {
  const context = useContext(ContextProvider)
  const profile = context.user
  const [fullName, setFullName] = useState(profile?.name)
  const [description, setDescription] = useState(profile?.description)
  const [idAvatar, setIdAvatar] = useState(profile?.avatar_id)
  const [avatar, setAvatar] = useState(profile?.avatar.avatar)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <SafeAreaView style={[GlobalStyles.container, GlobalStyles.p20, { paddingBottom: 0, backgroundColor: 'white' }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <FastImage
            source={{
              uri: avatar
            }}
            style={{ height: 100, width: 100, borderRadius: 100, alignSelf: 'center' }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <ButtonPrimary
            onPress={() => navigation.navigate('PickAvatar', { avatar_id: profile?.avatar.id, avatar: avatar, setId: (v) => setIdAvatar(v), setAvatar: (v) => setAvatar(v) })}
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
            isLoading={isLoading}
            text={'Simpan Perubahan'}
            style={{ marginTop: 30 }}
            onPress={() => saveProfile()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )

  async function saveProfile() {
    setIsLoading(true)
    let newUpdate = {
      name: fullName,
      avatar_id: idAvatar,
      description
    }

    let { data } = await postRequest('users/updateProfile', newUpdate)
    if (data) {
      await setStorage('user', data.data)
      context.setUser(data.data)
      showNotification('success', 'Berhasil', data.message)
      navigation.goBack()
    }
    setIsLoading(false)
  }
}