import React from 'react'
import { PieChart } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'
import { View, Text as TextRN } from 'react-native'
import GlobalStyles from '../../../Utils/GlobalStyles'
import GlobalVar from '../../../Utils/GlobalVar'

class PieChartWithCenteredLabels extends React.PureComponent {

  constructor(props) {
    super(props)
  }
  render() {

    const data = this.props.data || []

    const Labels = ({ slices, height, width }) => {
      return slices.map((slice, index) => {
        const { labelCentroid, pieCentroid, data } = slice;
        return (
          <Text
            key={index}
            x={pieCentroid[0]}
            y={pieCentroid[1]}
            fill={'white'}
            textAnchor={'middle'}
            alignmentBaseline={'middle'}
            fontSize={24}
            stroke={'black'}
            strokeWidth={0.2}
          >
            {data.label}
          </Text>
        )
      })
    }

    return (
      <View>
        <TextRN style={[GlobalStyles.fontTitle, { color: GlobalVar.blackColor, marginBottom: 10, marginTop: 30, textAlign: 'center' }]}>{this.props.title}</TextRN>
        <PieChart
          style={{ height: 200 }}
          valueAccessor={({ item }) => item.value}
          data={data}
          spacing={0}
          outerRadius={'95%'}
        >
          <Labels />
        </PieChart>
      </View>
    )
  }

}

export default PieChartWithCenteredLabels