import moment from 'moment';
import React, { Component, useEffect, useRef, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View, TextInput, FlatList } from 'react-native';
import GlobalStyles from '../Utils/GlobalStyles';
import GlobalVar from '../Utils/GlobalVar';

import Feat from 'react-native-vector-icons/Feather'

import Loading from '../Components/Loading';
import NotLogged from '../Components/NotLogged';
import CardVertical from '../Components/CardVertical';
import { getRequest } from '../Utils/GlobalFunc';
import CardCategory from '../Components/CardCategory';

export default function Explore({ navigation, route }) {
  const [categoryId, setCategoryId] = useState(route.params?.category_id || '')
  const [result, setResult] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [category, setCategory] = useState([])
  const [count, setCount] = useState(1)

  async function getExplore() {
    if (page === 1) setIsLoading(true)
    if (count > 0) {
      let { data } = await getRequest(`homes/explore?search=${search}&category_id=${categoryId}&page=${page}`)
      if (data) {
        setResult(result.concat(data.explore))
        setCount(data.explore.length)
      }
    }
    setIsLoading(false)
  }

  async function getCategory() {
    let { data } = await getRequest('homes/all-category')

    if (data) {
      let all = {
        id: '',
        title: 'Semua'
      }
      setCategory([all, ...data.category])
    }
  }
  useEffect(() => {
    getExplore()
  }, [search, categoryId, page])

  useEffect(() => {
    setCategoryId(route.params?.category_id || '')
    if(route.params?.category_id != categoryId) toDefault()
  }, [route.params])

  useEffect(() => {
    getCategory()
  }, [])

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  function toDefault() {
    setPage(1);
    setCount(1);
    setResult([])
  }

  return (
    <SafeAreaView style={[GlobalStyles.container, {}]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            if (count > 0) setPage(page + 1)
          }
        }}
        scrollEventThrottle={400}
      >
        <View style={[GlobalStyles.p20]}>
          <View style={[GlobalStyles.spaceBetween, GlobalStyles.cardBody, { paddingVertical: 5 }]}>
            <Feat name="search" color={GlobalVar.greyColor} size={20} />
            <TextInput
              value={search}
              style={{ flex: 1, fontSize: 14, backgroundColor: 'transparent', paddingHorizontal: 10, borderColor: 'white' }}
              placeholder='Cari artikel'
              onChangeText={(v) => { setSearch(v); toDefault() }}
            />
            {search ? <TouchableOpacity
              hitSlop={GlobalVar.hitSlop}
              onPress={() => { setSearch(''); toDefault() }}
            >
              <Feat name="x-circle" color={GlobalVar.greyColor} size={20} />
            </TouchableOpacity> : null}
          </View>
        </View>

        <FlatList
          data={category}
          keyExtractor={(item) => item.id}
          horizontal
          contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 10 }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => <CardCategory
            item={item}
            isActive={item.id === categoryId}
            onPress={() => { setCategoryId(item.id); toDefault() }}
          />}
        />
        {isLoading ?
          <Loading />
          :
          <View style={[GlobalStyles.p20]}>
            {result.length == 0 && <NotLogged icon='archive' text='Data tidak ditemukan' showButton={false} />}
            {result.map((item, index) => <CardVertical item={item} index={index} key={item.id + index} onPress={() => navigation.navigate('DetailArticle', { id: item.id })} />)}
          </View>
        }
      </ScrollView>
    </SafeAreaView>
  )
}