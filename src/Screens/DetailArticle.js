import React, { Component, useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import CardAvatar from '../Components/CardAvatar';
import Loading from '../Components/Loading';
import { getRequest } from '../Utils/GlobalFunc';
import GlobalStyles from '../Utils/GlobalStyles';
import RenderHtml from 'react-native-render-html';
import GlobalVar from '../Utils/GlobalVar';
import LabelCategory from '../Components/LabelCategory';
import Ion from 'react-native-vector-icons/Ionicons'


const tagsStyles = {
  body: {
    whiteSpace: 'normal',
    color: GlobalVar.blackColor,
  },
};
const { width } = Dimensions.get('screen')
export default function DetailArticle({ navigation, route }) {
  const id = route.params.id
  const [detail, setDetail] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  async function getDetails() {
    setIsLoading(true)
    let { data } = await getRequest(`homes/detail-articles/${id}`)
    if (data) {
      setDetail(data.articles)
    }
    setIsLoading(false)
  }

  async function getViews(idUserViews = '') {
    let { data } = await getRequest(`views/visit-articles?id=${idUserViews}&article_id=${id}`)
    if (data.data) {
      return data.data.id
    }
  }

  useEffect(() => {
    getDetails()
    let idUserViews = null
    navigation.addListener('focus', async () => {
      idUserViews = await getViews()
    })
    navigation.addListener('blur', () => {
      getViews(idUserViews)
    })
    // return blur
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FastImage
          style={{ height: 250, width: '100%' }}
          source={{ uri: detail?.img }}
          resizeMode='cover'
        />

        <View style={[GlobalStyles.cardBody, { marginTop: 0, padding: 15, borderRadius: 0 }]}>
          <View style={[GlobalStyles.row, { marginBottom: 10 }]}>
            <LabelCategory title={detail?.total_views} />
          </View>
          <Text style={[GlobalStyles.fontPrimary, { fontSize: 16, marginBottom: 10, fontWeight: 'bold' }]}>{detail?.title}</Text>
          <CardAvatar user={detail?.user} size="l" />
          <TouchableOpacity
            hitSlop={GlobalVar.hitSlop}
            style={[GlobalStyles.row, { marginTop: 15 }]}>
            <Ion name='chatbubble-outline' size={20} color={GlobalVar.greyColor} />
            <Text style={[GlobalStyles.fontSecondary, { marginLeft: 5 }]}>20</Text>
          </TouchableOpacity>
        </View>

        <View style={[GlobalStyles.cardBody, { padding: 15 }]}>
          <RenderHtml
            tagsStyles={tagsStyles}
            style={{ marginBottom: 0, color: 'green' }}
            contentWidth={width}
            source={{ html: detail?.contents || '<div></div>' }}
          />
        </View>
      </ScrollView>
    </SafeAreaView >
  )
}