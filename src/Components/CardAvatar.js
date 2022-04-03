import React from 'react';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import GlobalStyles from '../Utils/GlobalStyles';

export default function CardOwner({ size = 'm', }) {
  if (size == 's') {
    return (
      <View style={[GlobalStyles.row, {}]}>
        <FastImage
          source={{
            uri: "https://i.picsum.photos/id/598/200/200.jpg?hmac=CGTNWD3Wfl8FFUMGok-Kj_SsE7Yc80U-jxup04hpB5k"
          }}
          style={{ width: 20, height: 20, borderRadius: 100 }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Text style={[GlobalStyles.fontSecondary, GlobalStyles.fontTitle, { marginLeft: 5, fontSize: 10 }]} >Hilman Fajri</Text>
      </View>
    )
  } else if (size == 'm') {
    return (
      <View style={[GlobalStyles.row, {}]}>
        <FastImage
          source={{
            uri: "https://i.picsum.photos/id/598/200/200.jpg?hmac=CGTNWD3Wfl8FFUMGok-Kj_SsE7Yc80U-jxup04hpB5k"
          }}
          style={{ width: 30, height: 30, borderRadius: 100 }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Text style={[GlobalStyles.fontPrimary, GlobalStyles.fontTitle, { marginLeft: 10, fontSize: 12 }]} >Hilman Fajri</Text>
      </View>
    )
  } else {
    return (
      <View style={[GlobalStyles.row, {}]}>
        <FastImage
          source={{
            uri: "https://i.picsum.photos/id/598/200/200.jpg?hmac=CGTNWD3Wfl8FFUMGok-Kj_SsE7Yc80U-jxup04hpB5k"
          }}
          style={{ width: 45, height: 45, borderRadius: 100 }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Text style={[GlobalStyles.fontPrimary, GlobalStyles.fontTitle, { marginLeft: 15, fontSize: 14 }]} >Hilman Fajri</Text>
      </View>
    )
  }
}