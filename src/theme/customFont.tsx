import { Global } from '@mantine/core'
import OpenSans from '@/assets/font/OpenSans.ttf'
import Rubik from '@/assets/font/Rubik.ttf'

export default function CustomFonts() {
  return (
    <Global
      styles={[
        {
          '@font-face': {
            fontFamily: 'Open Sans',
            src: `url('${OpenSans}') format("ttf")`,
            fontWeight: 700,
            fontStyle: 'normal',
          },
        },
        {
          '@font-face': {
            fontFamily: 'Rubik Distressed',
            src: `url('${Rubik}') format("ttf")`,
            fontWeight: 900,
            fontStyle: 'normal',
          },
        },
      ]}
    />
  )
}
