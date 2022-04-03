import React from 'react';
import { View, Text } from 'react-native';

export default function LabelCategory({ title }) {
  return (
    <View style={{ backgroundColor: '#e4e4e490', paddingVertical: 3, marginRight: 5, paddingHorizontal: 7, borderRadius: 20 }}>
      <Text style={{ fontSize: 8, fontWeight: '700' }}>{title}</Text>
    </View>
  )
}