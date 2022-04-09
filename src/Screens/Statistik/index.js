import React, { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { getRequest } from '../../Utils/GlobalFunc';
import GlobalStyles from '../../Utils/GlobalStyles';
import GlobalVar from '../../Utils/GlobalVar';
import InteractiveChart from './Chart/InteractiveChart';
import BarChartHorizontalWithLabels from './Chart/BarChartHorizontalWithLabels';
import Loading from '../../Components/Loading';

const { width } = Dimensions.get('window')
export default function Statistik({ navigation, route }) {
  const [dataInteractive, setDataInteractive] = useState(null)
  const [dataAge, setDataAge] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  async function getStatistik() {
    setIsLoading(true)
    let { data } = await getRequest('views/statistik')
    if (data) {
      setDataInteractive(data.interactive)
      setDataAge(data.listAge)
    }
    setIsLoading(false)
  }
  useEffect(() => {
    getStatistik()
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <SafeAreaView style={[GlobalStyles.container, { backgroundColor: 'white' }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[GlobalStyles.p20, {}]}>
          {dataInteractive && <InteractiveChart
            dateList={dataInteractive?.date}
            priceList={dataInteractive?.value}
            title={dataInteractive?.title}
          />}
          <Text style={[GlobalStyles.fontTitle, { color: GlobalVar.blackColor, marginBottom: 10,marginTop:30, textAlign: 'center' }]}>{dataAge?.title}</Text>
          <BarChartHorizontalWithLabels
            keys={dataAge?.keys}
            value={dataAge?.value}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}