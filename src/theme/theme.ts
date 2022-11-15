import { MantineThemeOverride } from '@mantine/core'

const theme: MantineThemeOverride = {
  colorScheme: 'light',
  colors: {
    accent: [
      '#FFFADE',
      '#FEF4C6',
      '#FCEDA4',
      '#FAE279',
      '#F9D65B',
      '#F4C748',
      '#EFB43E',
      '#E9A338',
      '#E39133',
      '#D87E2E' /* ... */,
    ],
    blue: [
      '#EAF5FE',
      '#D5EBFD',
      '#B0D7FC',
      '#86BFF7',
      '#67A9F1',
      '#5299EA',
      '#4589E0',
      '#3D7CD0',
      '#366FBD',
      '#3063A6' /* ... */,
    ],
    dark: [
      '#C1C2C5',
      '#A6A7AB',
      '#909296',
      '#5C5F66',
      '#373A40',
      '#2C2E33',
      '#25262B',
      '#1A1B1E',
      '#141517',
      '#0F1113' /* ... */,
    ],
    grey: [
      '#F8F9FA',
      '#F2F3F5',
      '#EBECEF',
      '#E0E2E6',
      '#D0D4DA',
      '#AFB5BC',
      '#888E95',
      '#4A5057',
      '#353A40',
      '#212529' /* ... */,
    ],
  },

  shadows: {
    md: '1px 1px 3px rgba(0, 0, 0, .25)',
    xl: '5px 5px 3px rgba(0, 0, 0, .25)',
  },

  fontFamily: '"Open Sans", sans-serif',
  fontFamilyMonospace: `"Rubik Distressed", cursive`,

  headings: {
    fontFamily: '"Open Sans", sans-serif',
    // fontFamily: `"Rubik Distressed", cursive`,
    fontWeight: '700',
    sizes: {
      // See heading options below
      h1: { fontWeight: 100, fontSize: 32, lineHeight: 1.4 },
      h2: { fontWeight: 100, fontSize: 28, lineHeight: 1.4 },
      h3: { fontWeight: 100, fontSize: 24, lineHeight: 1.4 },
      h4: { fontWeight: 100, fontSize: 20, lineHeight: 1.4 },
      h5: { fontWeight: 100, fontSize: 16, lineHeight: 1.4 },
      h6: { fontWeight: 100, fontSize: 14, lineHeight: 1.4 },
    },
  },
}

export default theme
