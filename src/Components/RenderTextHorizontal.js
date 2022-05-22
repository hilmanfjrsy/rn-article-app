import React, { Component, useState } from 'react';
import { Text, TextInput, TouchableOpacity } from 'react-native';
import GlobalStyles from '../Utils/GlobalStyles';
import GlobalVar from '../Utils/GlobalVar';

import Ion from 'react-native-vector-icons/Ionicons'
import DatePicker from 'react-native-date-picker'
import moment from 'moment';

export default function RenderTextHorizontal({
  text = '',
  icon = null,
  color = GlobalVar.greyColor,
  rightText = '',
  disabled = false,
  onPress = () => { },
  valueTextInput = '',
  textInput = false,
  dateInput = false,
  onChangeText = () => { },
  inputDisabled = false,
  keyType = 'default'
}) {
  const [date, setDate] = useState(null)
  const [open, setOpen] = useState(false)
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[GlobalStyles.spaceBetween, { borderBottomColor: GlobalVar.greyColor, borderBottomWidth: 0.7, paddingVertical: 20 }]}
    >
      <Text style={[GlobalStyles.fontSecondary, { color, fontSize: 14, fontWeight: '500' }]}>{text}</Text>
      {icon && <Ion name={icon} size={20} color={color} />}
      {rightText ? <Text style={[GlobalStyles.fontSecondary, {}]}>{rightText}</Text> : null}
      {textInput ? <TextInput
        value={valueTextInput}
        editable={!inputDisabled}
        keyboardType={keyType}
        autoCapitalize="words"
        placeholder='Ketik disini...'
        onChangeText={onChangeText}
        style={[GlobalStyles.fontPrimary, { fontWeight: 'bold', textAlign: 'right', padding: 0, }]}
      /> : null}
      {dateInput &&
        <TouchableOpacity style={{ height: 50, justifyContent: 'center' }} onPress={() => setOpen(true)}>
          <Text style={[GlobalStyles.fontPrimary, { fontWeight: 'bold' }]}>{date ? moment(date).format('DD MMM YYYY') : valueTextInput ? moment(valueTextInput).format('DD MMM YYYY') : 'Tanggal Lahir'}</Text>
          <DatePicker
            modal
            mode='date'
            open={open}
            date={date || new Date(valueTextInput)}
            onConfirm={(date) => {
              setOpen(false)
              onChangeText(date)
              setDate(date)
            }}
            onCancel={() => {
              setOpen(false)
            }}
          />
        </TouchableOpacity>
      }
    </TouchableOpacity>
  )
}