import React from 'react';
import { View, Text } from 'react-native';
import Feat from 'react-native-vector-icons/Feather'
import GlobalStyles from '../Utils/GlobalStyles';

export default function LabelCategory({ title }) {
  return (
    <View style={[GlobalStyles.row, { backgroundColor: '#e4e4e4', paddingVertical: 3, marginRight: 5, paddingHorizontal: 7, borderRadius: 20 }]}>
      <Feat name='eye' size={10} color='grey' />
      <Text style={{ fontSize: 8, fontWeight: '700', color: 'grey', marginLeft: 5 }}>{title}</Text>
    </View>
  )
}