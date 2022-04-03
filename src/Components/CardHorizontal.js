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
          uri: 'https://i.picsum.photos/id/280/400/300.jpg?hmac=2AvK0iDA3KTsfE1gkIrasmqdvvK2eLaWgSe-NMRH3_k'
        }}
        style={{ height: 200, width: '100%', borderRadius: 20 }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={[GlobalStyles.cardHorizontal, { justifyContent: 'space-between' }]}>
        <View style={GlobalStyles.row}>
          {[1, 2].map((item, index) => <LabelCategory key={index} title={'Teknologi'} />)}
        </View>
        <View>
          <Text numberOfLines={2} style={[GlobalStyles.fontPrimary, GlobalStyles.fontTitle, { marginBottom: 15 }]}>Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</Text>
          <CardOwner size='m' />
        </View>
      </View>
    </TouchableOpacity>
  )
}