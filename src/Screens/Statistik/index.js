import React, { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { getRequest } from '../../Utils/GlobalFunc';
import GlobalStyles from '../../Utils/GlobalStyles';
import { Picker } from '@react-native-picker/picker';
import InteractiveChart from './Chart/InteractiveChart';
import BarChartHorizontalWithLabels from './Chart/BarChartHorizontalWithLabels';
import Loading from '../../Components/Loading';
import PieChartWithCenteredLabels from './Chart/PieChartWithCenteredLabels';
import NotLogged from '../../Components/NotLogged';

const { width } = Dimensions.get('window')
export default function Statistik({ navigation, route }) {
  const [dataInteractive, setDataInteractive] = useState(null)
  const [dataAge, setDataAge] = useState(null)
  const [dataPie, setDataPie] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [intervalDate, setIntervalDate] = useState(7)

  async function getStatistik() {
    setIsLoading(true)
    let { data } = await getRequest(`views/statistik?interval=${intervalDate}&article_id=${route.params ? route.params.article_id : ''}`)

    if (data) {
      setDataInteractive(data.interactive)
      setDataAge(data.listAge)
      setDataPie(data.listGender)
    }
    setIsLoading(false)
  }
  useEffect(() => {
    getStatistik()
  }, [intervalDate])

  if (isLoading) {
    return <Loading />
  }

  if (dataInteractive?.date.length == 0 && !dataAge?.value[0] && dataPie?.data.length == 0) {
    return <NotLogged icon='activity' text='Statistk kunjungan belum tersedia' showButton={false} />
  }

  return (
    <SafeAreaView style={[GlobalStyles.container, { backgroundColor: 'white' }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[GlobalStyles.p20, {}]}>
          <View style={{ borderRadius: 10, borderWidth: 1, borderColor: 'grey', marginBottom: 20 }}>
            <Picker
              style={{ color: 'grey' }}
              selectedValue={intervalDate}
              onValueChange={(itemValue, itemIndex) =>
                setIntervalDate(itemValue)
              }
            >
              <Picker.Item label="7 hari terakhir" value="7" />
              <Picker.Item label="14 hari terakhir" value="14" />
              <Picker.Item label="30 hari terakhir" value="30" />
              <Picker.Item label="Semua" value="" />
            </Picker>
          </View>
          {dataInteractive?.date.length > 0 && <InteractiveChart
            dateList={dataInteractive?.date}
            priceList={dataInteractive?.value}
            title={dataInteractive?.title}
          />}
          {dataAge?.value[0] && <BarChartHorizontalWithLabels
            keys={dataAge?.keys}
            value={dataAge?.value}
            title={dataAge?.title}
          />}
          {dataPie?.data.length > 0 && <PieChartWithCenteredLabels
            data={dataPie?.data}
            title={dataPie?.title}
          />}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}