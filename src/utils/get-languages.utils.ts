import { languages } from '@/data/languages.data'

export const getLanguages = () => {
  const languageList: { code: string; label: string }[] = []

  // const language = languages[languageCode]

  for (const languageCode in languages) {
    languageList.push({
      code: languageCode,
      // label: languages[languageCode] || '',
      label: '',
    })
  }

  return languageList
}
