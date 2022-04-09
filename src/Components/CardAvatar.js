import React from 'react';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import GlobalStyles from '../Utils/GlobalStyles';

export default function CardOwner({ size = 'm', user }) {
  if (size == 's') {
    return (
      <View style={[GlobalStyles.row, {}]}>
        <FastImage
          source={{
            uri: user?.avatar.avatar
          }}
          style={{ width: 20, height: 20, borderRadius: 100 }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Text style={[GlobalStyles.fontSecondary, GlobalStyles.fontTitle, { marginLeft: 5, fontSize: 10 }]} >{user?.name}</Text>
      </View>
    )
  } else if (size == 'm') {
    return (
      <View style={[GlobalStyles.row, {}]}>
        <FastImage
          source={{
            uri: user?.avatar.avatar
          }}
          style={{ width: 30, height: 30, borderRadius: 100 }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Text style={[GlobalStyles.fontPrimary, GlobalStyles.fontTitle, { color:'white', marginLeft: 10, fontSize: 12 }]} >{user?.name}</Text>
      </View>
    )
  } else {
    return (
      <View style={[GlobalStyles.row, {}]}>
        <FastImage
          source={{
            uri: user?.avatar.avatar
          }}
          style={{ width: 45, height: 45, borderRadius: 100 }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Text style={[GlobalStyles.fontPrimary, GlobalStyles.fontTitle, { color:'white', marginLeft: 15, fontSize: 14 }]} >{user?.name}</Text>
      </View>
    )
  }
}