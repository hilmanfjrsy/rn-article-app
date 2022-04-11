import moment from 'moment';
import React, { Component, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View, TextInput } from 'react-native';
import GlobalStyles from '../Utils/GlobalStyles';
import GlobalVar from '../Utils/GlobalVar';

import Feat from 'react-native-vector-icons/Feather'

import Loading from '../Components/Loading';
import NotLogged from '../Components/NotLogged';
import CardVertical from '../Components/CardVertical';
import { getRequest } from '../Utils/GlobalFunc';

export default function Explore({ navigation, route }) {
  const [result, setResult] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [count, setCount] = useState(0)

  async function getExplore() {
    if (!count) {
      setIsLoading(true)
    }
    let { data } = await getRequest(`homes/explore?search=${search}`)
    if (data) {
      setResult(data.explore)
    }
    setCount(1)
    setIsLoading(false)
  }

  useEffect(() => {
    getExplore()
  }, [search])

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
              value={search}
              style={{ flex: 1, fontSize: 14, backgroundColor: 'transparent', paddingHorizontal: 10, borderColor: 'white' }}
              placeholder='Cari artikel'
              onChangeText={(v) => { setSearch(v) }}
            />
            {search ? <TouchableOpacity
              hitSlop={GlobalVar.hitSlop}
              onPress={() => setSearch('')}
            >
              <Feat name="x-circle" color={GlobalVar.greyColor} size={20} />
            </TouchableOpacity> : null}
          </View>
          {result.length == 0 && <NotLogged icon='archive' text='Data tidak ditemukan' showButton={false} />}
          {result.map((item, index) => <CardVertical item={item} index={index} key={index} onPress={() => navigation.navigate('DetailArticle', { id: item.id })} />)}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}