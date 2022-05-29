import React, { Component, useState, useEffect, useContext } from 'react';
import {
  Dimensions,
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import GlobalStyles from '../Utils/GlobalStyles';
import GlobalVar from '../Utils/GlobalVar';
import ButtonPrimary from '../Components/ButtonPrimary';
import { getRequest } from '../Utils/GlobalFunc';
import moment from 'moment';
import Loading from '../Components/Loading';
import { ContextProvider } from '../Context/BaseContext';

import logo from '../Assets/logo.png'
import CardHorizontal from '../Components/CardHorizontal';
import CardVertical from '../Components/CardVertical';
import FastImage from 'react-native-fast-image';
import CardCategory from '../Components/CardCategory';

export default function Search({ navigation, route }) {
  const context = useContext(ContextProvider)
  const user = context.user
  const [isLoading, setIsLoading] = useState(false)
  const [popular, setPopular] = useState([])
  const [terbaru, setTerbaru] = useState([])
  const [category, setCategory] = useState([])

  async function getData() {
    setIsLoading(true)
    let { data } = await getRequest('homes')

    if (data) {
      setPopular(data.popular)
      setTerbaru(data.new_articles)
    }
    setIsLoading(false)
  }

  async function getCategory() {
    let { data } = await getRequest('homes/all-category')

    if (data) {
      setCategory(data.category)
    }
  }

  useEffect(() => {
    getCategory()
    getData()
  }, [])

  if (isLoading) {
    return <Loading />
  }
  return (
    <SafeAreaView style={{ flex: 1 }} >
      <ScrollView
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            colors={[GlobalVar.primaryColor]}
            onRefresh={() => getData()}
          />
        }
      >
        <View style={[GlobalStyles.container, {}]}>
          <View style={[GlobalStyles.spaceBetween, GlobalStyles.p20]}>
            <View style={[GlobalStyles.spaceBetween]}>
              <FastImage
                source={logo}
                style={{ width: 40, height: 40 }}
                resizeMode='contain'
              />
            </View>
            {
              user ?
                <TouchableOpacity
                  onPress={() => navigation.navigate('Profile')}
                  style={{ borderWidth: 2, borderColor: 'white', borderRadius: 100 }}
                >
                  <FastImage
                    source={{
                      uri: user.avatar.avatar
                    }}
                    style={{ width: 40, height: 40 }}
                  />
                  <View style={{ position: 'absolute', width: 10, height: 10, backgroundColor: 'green', borderRadius: 100, bottom: 0, }} />
                </TouchableOpacity>
                :
                <ButtonPrimary
                  onPress={() => navigation.navigate('Login')}
                  text="Masuk"
                  type='label'
                  icon='log-in'
                />
            }
          </View>
          <View style={[{ marginTop: -10, marginBottom: -10 }, GlobalStyles.p20]}>
            <Text style={[GlobalStyles.fontSecondary, { marginTop: 0 }]}>{moment().format('dddd, DD MMMM YYYY')}</Text>
            {user ?
              <Text style={[GlobalStyles.fontPrimary, { fontSize: 22, fontWeight: 'bold' }]}>Hai, {`\n${user.name}`}</Text>
              :
              <Text style={[GlobalStyles.fontPrimary, { fontSize: 22, fontWeight: 'bold' }]}>Selamat Datang</Text>
            }
          </View>

          <FlatList
            data={category}
            keyExtractor={(item) => item.id}
            horizontal
            contentContainerStyle={[GlobalStyles.p20, {}]}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => <CardCategory
              item={item}
              onPress={() => navigation.navigate('BottomTab', { screen: 'Explore', params: { category_id: item.id } })}
            />}
          />
          <View>
            <Text style={[GlobalStyles.fontPrimary, GlobalStyles.fontTitle, GlobalStyles.p20, {}]}>Artikel Popular</Text>
            <FlatList
              data={popular}
              keyExtractor={(item, index) => index + item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => <CardHorizontal item={item} index={index} onPress={() => navigation.navigate('DetailArticle', { id: item.id })} />}
            />
          </View>

          <View style={[GlobalStyles.p20, {}]}>
            <View style={[GlobalStyles.spaceBetween, {}]}>
              <Text style={[GlobalStyles.fontPrimary, GlobalStyles.fontTitle, { marginTop: 10, marginBottom: 20 }]}>Artikel Terbaru</Text>

              <ButtonPrimary
                onPress={() => { navigation.navigate('BottomTab', { screen: 'Explore' }) }}
                text="Lihat Semua"
                type='label'
              />
            </View>
            {terbaru.map((item, index) => <CardVertical item={item} key={item.id + index} index={index} onPress={() => navigation.navigate('DetailArticle', { id: item.id })} />)}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
