import moment from 'moment';
import React, { Component, useContext, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import ButtonPrimary from '../../Components/ButtonPrimary';
import Loading from '../../Components/Loading';
import { ContextProvider } from '../../Context/BaseContext';
import { getRequest, postRequest } from '../../Utils/GlobalFunc';
import GlobalStyles from '../../Utils/GlobalStyles';
import GlobalVar from '../../Utils/GlobalVar';

export default function Comments({ navigation, route }) {
  const context = useContext(ContextProvider)
  const article_id = route.params.id
  const [allComments, setAllComments] = useState([])
  const [comment, setComment] = useState('')
  const [isSendComment, setIsSendComment] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function getAllComments(x = 0) {
    if (!x) setIsLoading(true)
    let { data } = await getRequest(`comments/get-all?article_id=${article_id}`)
    if (data) {
      setAllComments(data.data)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getAllComments()
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <SafeAreaView style={[GlobalStyles.container, { backgroundColor: 'white' }]}>
      <FlatList
        data={allComments}
        ListEmptyComponent={() => <Text style={[GlobalStyles.fontSecondary, { textAlign: 'center', marginTop: 10 }]}>Belum ada komentar</Text>}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => <RenderCard item={item} index={index} />}
      />
      {context.user && <View style={[GlobalStyles.p20, GlobalStyles.row, { borderTopColor: GlobalVar.greyColor + 50, borderTopWidth: 0.5 }]}>
        <TextInput
          value={comment}
          editable={isSendComment}
          placeholder='Ketik disini..'
          style={{ height: 60, backgroundColor: '#f4f4f4', paddingHorizontal: 10, borderRadius: 10, flex: 1 }}
          onChangeText={(v) => { setComment(v) }}
        />
        <ButtonPrimary
          onPress={() => { sendKomentar() }}
          width={60}
          isLoading={isSendComment}
          style={{ borderRadius: 100, marginLeft: 10 }}
          icon='send'
        />
      </View>}
    </SafeAreaView>
  )

  function RenderCard({ item, index }) {
    return (
      <View style={[GlobalStyles.row, GlobalStyles.p20, { alignItems: 'flex-start', paddingVertical: 5 }]}>
        <FastImage
          source={{
            uri: item.avatar
          }}
          style={{ width: 40, height: 40, borderRadius: 100 }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={[{ marginLeft: 10 }]}>
          <View style={[GlobalStyles.cardBody, { backgroundColor: '#f4f4f4' }]}>
            <View style={[GlobalStyles.spaceBetween, { marginBottom: 5 }]}>
              <Text style={[GlobalStyles.fontPrimary, { fontWeight: 'bold', fontSize: 15 }]}>{item.name}</Text>
              <Text style={[GlobalStyles.fontSecondary, { marginLeft: 20 }]}>{moment(item.createdAt).format('DD MMM YYYY HH:mm')}</Text>
            </View>
            <Text>{item.comment}</Text>
          </View>
        </View>
      </View>
    )
  }

  async function sendKomentar() {
    console.log('sini')
    if (comment) {
      setIsSendComment(true)
      let form = {
        article_id,
        comment,
      }
      await postRequest('comments/create', form)
      setComment('')
      getAllComments(1)
      setIsSendComment(false)
    }
  }
}