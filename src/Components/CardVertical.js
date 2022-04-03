import React from 'react';
import { TouchableOpacity, Text, Dimensions, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import GlobalStyles from '../Utils/GlobalStyles';
import GlobalVar from '../Utils/GlobalVar';
import CardOwner from './CardAvatar';
import LabelCategory from './LabelCategory';

import Oct from 'react-native-vector-icons/Octicons'
import moment from 'moment';

export default function CardVertical({ item, index }) {
  return (
    <TouchableOpacity
      style={[GlobalStyles.spaceBetween, { marginBottom: 15, backgroundColor: 'white', padding: 10, borderRadius: 10 }]}
    >
      <View style={{ flex: 1, marginRight: 10 }}>
        <View style={[GlobalStyles.row, { marginBottom: 10 }]}>
          {[1, 2].map((item, index) => <LabelCategory title={'Teknologi'} key={index} />)}
        </View>
        <Text numberOfLines={2} style={[GlobalStyles.fontPrimary, GlobalStyles.fontTitle, { flex: 1, fontSize: 16, marginBottom: 5 }]}>Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</Text>
        <View style={[GlobalStyles.row, {}]}>
          <CardOwner
            size='s'
          />
          <Oct name="dot-fill" size={7} color={GlobalVar.greyColor} style={{ marginHorizontal: 10 }} />
          <Text style={[GlobalStyles.fontSecondary, { fontSize: 10 }]}>{moment().format("D MMM YY")}</Text>
        </View>
      </View>
      <FastImage
        source={{
          uri: 'https://i.picsum.photos/id/866/400/300.jpg?hmac=JMubLT0llOloTrCSJIptm4kmT13cmWrNcdbpI9vJwmw'
        }}
        style={{ minHeight: 90, width: 90, borderRadius: 10 }}
        resizeMode={FastImage.resizeMode.cover}
      />
    </TouchableOpacity>
  )
}