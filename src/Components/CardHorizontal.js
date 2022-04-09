import React from 'react';
import { TouchableOpacity, Text, Dimensions, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import GlobalStyles from '../Utils/GlobalStyles';
import GlobalVar from '../Utils/GlobalVar';
import CardOwner from './CardAvatar';
import LabelCategory from './LabelCategory';

const { width } = Dimensions.get('screen')

export default function CardHorizontal({ item, index }) {
  return (
    <TouchableOpacity
      style={{ width: width - 100, marginLeft: index == 0 ? 20 : 0, marginRight: 20 }}
    >
      <FastImage
        source={{
          uri: item.img
        }}
        style={{ height: 200, width: '100%', borderRadius: 20 }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={[GlobalStyles.cardHorizontal, { justifyContent: 'space-between' }]}>
        <View style={GlobalStyles.row}>
          <LabelCategory key={index} title={item.total_views} />
        </View>
        <View>
          <Text numberOfLines={2} style={[GlobalStyles.fontPrimary, GlobalStyles.fontTitle, { color:'white',marginBottom: 15 }]}>{item.title}</Text>
          <CardOwner size='m' user={item.user} />
        </View>
      </View>
    </TouchableOpacity>
  )
}