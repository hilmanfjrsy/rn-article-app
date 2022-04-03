import moment from 'moment';
import React, { Component, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View, TextInput } from 'react-native';
import GlobalStyles from '../Utils/GlobalStyles';
import GlobalVar from '../Utils/GlobalVar';

import Feat from 'react-native-vector-icons/Feather'

import Loading from '../Components/Loading';
import NotLogged from '../Components/NotLogged';
import CardVertical from '../Components/CardVertical';

export default function Explore({ navigation, route }) {
  const [result, setResult] = useState([1, 2, 3, 4, 3, 4, 5, 6, 7])
  const [isLoading, setIsLoading] = useState(false)

  if (isLoading) {
    return <Loading />
  }

  return (
    <SafeAreaView style={[GlobalStyles.container, {}]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[GlobalStyles.p20]}>
          <View style={[GlobalStyles.spaceBetween, GlobalStyles.cardBody, { marginBottom: 30, paddingVertical: 5 }]}>
            <Feat name="search" color={GlobalVar.greyColor} size={20} />
            <TextInput
              style={{ flex: 1, fontSize: 14, backgroundColor: 'transparent', paddingHorizontal: 10, borderColor: 'white' }}
              placeholder='Cari artikel'
              onChangeText={(v) => { }}
            />
            <TouchableOpacity
              hitSlop={GlobalVar.hitSlop}
            >
              <Feat name="sliders" color={GlobalVar.primaryColor} size={20} />
            </TouchableOpacity>
          </View>
          {result.length == 0 && <NotLogged icon='box-open' text='Data tidak ditemukan' showButton={false} />}
          {result.map((item, index) => <CardVertical item={item} index={index} key={index} />)}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}