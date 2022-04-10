import React from 'react';
import { TouchableOpacity, Text, Dimensions, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import GlobalStyles from '../Utils/GlobalStyles';
import GlobalVar from '../Utils/GlobalVar';
import CardOwner from './CardAvatar';
import LabelCategory from './LabelCategory';

import Oct from 'react-native-vector-icons/Octicons'
import moment from 'moment';
import ButtonPrimary from './ButtonPrimary';

export default function CardVertical({ item, index, statistik = false, navigation }) {
  return (
    <>
      <TouchableOpacity
        style={[GlobalStyles.spaceBetween, { marginBottom: 15, backgroundColor: 'white', padding: 10, borderRadius: 10 }]}
      >
        <View style={{ flex: 1, marginRight: 10 }}>
          <View style={[GlobalStyles.row, { marginBottom: 10 }]}>
            <LabelCategory title={item.total_views} />
          </View>
          <Text numberOfLines={2} style={[GlobalStyles.fontPrimary, GlobalStyles.fontTitle, { flex: 1, fontSize: 16, marginBottom: 5 }]}>{item.title}</Text>
          <View style={[GlobalStyles.row, {}]}>
            <CardOwner
              size='s'
              user={item.user}
            />
            <Oct name="dot-fill" size={7} color={GlobalVar.greyColor} style={{ marginHorizontal: 10 }} />
            <Text style={[GlobalStyles.fontSecondary, { fontSize: 10 }]}>{moment(item.createdAt).format("D MMM YY")}</Text>
          </View>
        </View>
        <FastImage
          source={{
            uri: item.img
          }}
          style={{ minHeight: 90, width: 90, borderRadius: 10 }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </TouchableOpacity>
      {statistik ? <ButtonPrimary
        style={{ marginBottom: 20, marginTop: -10 }}
        onPress={() => navigation.navigate('Statistik', { article_id: item.id })}
        fontSize={12}
        icon={'activity'}
        text="Lihat Statistik"
        height={30}
      /> : null}
    </>
  )
}