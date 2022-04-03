import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import ButtonPrimary from '../../Components/ButtonPrimary';
import { getRequest } from '../../Utils/GlobalFunc';
import GlobalStyles from '../../Utils/GlobalStyles';
import GlobalVar from '../../Utils/GlobalVar';

export default function PickAvatar({ navigation, route }) {
  const [allAvatar, setAllAvatar] = useState([])
  const [avatarId, setAvatarId] = useState(route.params.avatar_id)
  const [avatar, setAvatar] = useState(route.params.avatar)

  async function getAvatar() {
    let { data } = await getRequest('users/getAllAvatar')
    if (data) {
      return data.avatar
    }
  }
  useEffect(() => {
    let isMounted = true;               // note mutable flag
    getAvatar().then(data => {
      if (isMounted) setAllAvatar(data);    // add conditional check
    })
    return () => { isMounted = false }; // cleanup toggles value, if unmounted
  }, []); 
  return (
    <SafeAreaView style={[GlobalStyles.container, GlobalStyles.p20, { backgroundColor: 'white' }]}>
      <FlatList
        data={allAvatar}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        keyExtractor={(item, index) => index}
        renderItem={({ item, index }) => <RenderAvatar item={item} index={index} />}
      />
      <ButtonPrimary
        onPress={()=>{
          route.params.setAvatar(avatar)
          route.params.setId(avatarId)
          navigation.goBack()
        }}
        text="Pilih Avatar"
      />
    </SafeAreaView>
  )

  function RenderAvatar({ item, index }) {
    let borderColor = 'transparent'
    let borderWidth = 0
    if (item.id == avatarId) {
      borderColor = GlobalVar.primaryColor
      borderWidth = 3
    }
    return (
      <TouchableOpacity
        onPress={() => {setAvatarId(item.id);setAvatar(item.avatar)}}
        style={[GlobalStyles.cardBody, { borderColor, borderWidth, backgroundColor: GlobalVar.greyColor + 30, borderRadius: 10 }]}
      >
        <FastImage
          source={{
            uri: item.avatar
          }}
          style={{ width: 90, height: 90, borderRadius: 100 }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </TouchableOpacity>
    )
  }
}