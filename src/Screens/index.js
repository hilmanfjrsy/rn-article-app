import React, { Component, useState, useEffect, useContext } from 'react';
import {
  Dimensions,
  FlatList,
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

import Oct from 'react-native-vector-icons/Octicons'
import CardHorizontal from '../Components/CardHorizontal';
import CardVertical from '../Components/CardVertical';
import FastImage from 'react-native-fast-image';

export default function Search({ navigation, route }) {
  const context = useContext(ContextProvider)
  const user = context.user
  const [isLoading, setIsLoading] = useState(false)
  const [popular, setPopular] = useState([])
  const [terbaru, setTerbaru] = useState([])

  async function getData() {
    setIsLoading(true)
    let { data } = await getRequest('homes')

    if (data) {
      setPopular(data.popular)
      setTerbaru(data.new_articles)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getData()
  }, [])
  if (isLoading) {
    return <Loading />
  }
  return (
    <SafeAreaView style={{ flex: 1 }} >
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={[GlobalStyles.container, {}]}>
          <View style={[GlobalStyles.spaceBetween, GlobalStyles.p20]}>
            <View style={[GlobalStyles.spaceBetween]}>
              <Oct name='dot-fill' size={20} color={GlobalVar.blackColor} />
              <Text style={[GlobalStyles.fontPrimary, GlobalStyles.fontTitle]}>  Adiwidia</Text>
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

          <View>
            <Text style={[GlobalStyles.fontPrimary, GlobalStyles.fontTitle, GlobalStyles.p20, { marginTop: 10 }]}>Artikel Popular</Text>
            <FlatList
              data={popular}
              keyExtractor={(item, index) => index}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => <CardHorizontal item={item} index={index} />}
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
            {terbaru.map((item, index) => <CardVertical item={item} key={index} index={index} />)}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  function RenderCity({ item, index }) {
    return (
      <TouchableOpacity
        onPress={() => {
          clickSearch(item.destinationId)
        }}
        style={[GlobalStyles.cardBody, { marginRight: 10 }]}>
        <Text style={[GlobalStyles.fontPrimary, {}]}>{item.name}</Text>
      </TouchableOpacity>
    );
  }
}
