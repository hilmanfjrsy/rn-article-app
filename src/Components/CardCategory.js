import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import GlobalStyles from '../Utils/GlobalStyles';
import GlobalVar from '../Utils/GlobalVar';

export default function CardCategory({ item, isActive, onPress = () => { } }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      hitSlop={GlobalVar.hitSlop}
      style={{ backgroundColor: isActive ? GlobalVar.primaryColor : 'white', paddingVertical: 8, paddingHorizontal: 20, borderWidth: 1, borderColor: GlobalVar.primaryColor, marginRight: 10, borderRadius: 100 }}
    >
      <Text style={[GlobalStyles.fontPrimary, GlobalStyles.fontTitle, { color: isActive ? 'white' : GlobalVar.primaryColor, fontSize: 14 }]}>{item.title}</Text>
    </TouchableOpacity>
  )
}