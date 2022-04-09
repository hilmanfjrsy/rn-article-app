import React from 'react'
import { View } from 'react-native'
import { BarChart, Grid, YAxis } from 'react-native-svg-charts'
import * as scale from 'd3-scale'
import { Text } from 'react-native-svg'
import GlobalVar from '../../../Utils/GlobalVar'
import GlobalStyles from '../../../Utils/GlobalStyles'

class BarChartHorizontalWithLabels extends React.PureComponent {

  constructor(props) {
    super(props)
  }

  render() {

    const labels = this.props.keys || []
    const data = this.props.value || []

    const CUT_OFF = 1
    const Labels = ({ x, y, bandwidth, data }) => (
      data.map((value, index) => (
        <Text
          key={index}
          x={value > CUT_OFF ? x(0) + 10 : x(value) + 10}
          y={y(index) + (bandwidth / 2)}
          fontSize={14}
          fill={value > CUT_OFF ? 'white' : 'black'}
          alignmentBaseline={'middle'}
        >
          {value}
        </Text>
      ))
    )

    return (
      <View style={{ flexDirection: 'row', height: 200, paddingVertical: 16 }}>
        {labels.length>0 && <YAxis
          data={labels}
          yAccessor={({ index }) => index}
          scale={scale.scaleBand}
          svg={{ fill: 'grey' }}
          contentInset={{ top: 10, bottom: 10 }}
          spacing={0.2}
          formatLabel={(item, index) => labels[index]}
        />}
        <BarChart
          style={{ flex: 1, marginLeft: 8 }}
          data={data}
          horizontal={true}
          svg={{ fill: GlobalVar.primaryColor }}
          contentInset={{ top: 10, bottom: 10 }}
          spacing={0.2}
          gridMin={0}
        >
          <Grid direction={Grid.Direction.VERTICAL} />
          <Labels />
        </BarChart>
      </View>
    )
  }

}

export default BarChartHorizontalWithLabels