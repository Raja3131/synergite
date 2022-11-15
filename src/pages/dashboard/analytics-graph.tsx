import { Line } from '@ant-design/plots'
import { createStyles, Group, Text, TextInput } from '@mantine/core'

const useStyles = createStyles((theme) => ({
  analytics: {
    padding: '20px',
  },
}))

export default function AnalyticsBoard() {
  const { classes } = useStyles()
  const data = [
    {
      month: 'Jan',
      value: 3,
    },
    {
      month: 'Feb',
      value: 5.5,
    },
    {
      month: 'Mar',
      value: 3.5,
    },
    {
      month: 'Apr',
      value: 5,
    },
    {
      month: 'May',
      value: 8.5,
    },
    {
      month: 'Jun',
      value: 13.9,
    },
    {
      month: 'Jul',
      value: 5,
    },
    {
      month: 'Aug',
      value: 3,
    },
    {
      month: 'Sep',
      value: 7,
    },
    {
      month: 'Oct',
      value: 8.5,
    },
    {
      month: 'Nov',
      value: 3.5,
    },
    {
      month: 'Dec',
      value: 3,
    },
  ]
  const config = {
    data,
    height: 240,
    xField: 'month',
    yField: 'value',
    label: {},
    point: {
      size: 5,
      // shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#5B8FF9',
        // lineWidth: 1,
      },
    },
    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 8,
          stroke: '#ebbd07',
          fill: '#ebbd07',
        },
      },
    },
    interactions: [
      {
        type: 'marker-active',
      },
    ],
  }
  return (
    <div className={classes.analytics}>
      <Group position="apart" noWrap spacing="xl" align={'center'} mb="md">
        <Text
          weight="lighter"
          color="blueviolet"
          style={{ fontFamily: '-moz-initial', fontSize: '20px' }}
        >
          Analytics
        </Text>
        <TextInput type={'month'} placeholder="Monthly" color="blueviolet" />
      </Group>
      <Line {...config} />
    </div>
  )
}
