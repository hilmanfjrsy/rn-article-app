import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Flow } from 'react-native-animated-spinkit'
import GlobalVar from '../Utils/GlobalVar';
import GlobalStyles from '../Utils/GlobalStyles';
import Feat from 'react-native-vector-icons/Feather'

export default function ButtonPrimary({
  height = 60,
  width = '100%',
  isRounded = true,
  isLoading = false,
  text,
  onPress,
  style = {},
  type = 'button',
  color = GlobalVar.primaryColor,
  icon = null,
  fontSize = 16
}) {
  if (type == 'button') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isLoading}
        style={[GlobalStyles.row, style, { justifyContent: 'center', alignItems: 'center', backgroundColor: isLoading ? GlobalVar.greyColor : color, height, width, borderRadius: isRounded ? 5 : 0 }]}
      >
        {isLoading ?
          <Flow
            color='white'
            size={25}
          />
          :
          <>
            {icon ? <Feat name={icon} size={20} color='white' style={{ marginRight: 5 }} /> : null}
            <Text style={{ fontWeight: 'bold', color: 'white', fontSize }}>{text}</Text>
          </>
        }
      </TouchableOpacity>
    )
  } else {
    return (
      <TouchableOpacity
        style={[style, GlobalStyles.row]}
        onPress={onPress}
        hitSlop={GlobalVar.hitSlop}
      >
        {icon ? <Feat name={icon} size={20} color={color} style={{ marginRight: 5 }} /> : null}
        <Text style={[GlobalStyles.fontPrimary, { fontWeight: '500', color, fontSize: 14 }]}>{text}</Text>
      </TouchableOpacity>
    )
  }
}