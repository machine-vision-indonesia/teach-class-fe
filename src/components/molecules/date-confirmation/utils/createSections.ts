import { Section } from '../types/dateSection.types'

export const createSections = (sectionTitles: string[]): Section[] => {
  return sectionTitles.map(title => ({
    title,
    id: title
      .toLowerCase()
      .split(' ')
      .map((word, index) => {
        if (index === 0) {
          return word
        }
        return word.charAt(0).toUpperCase() + word.slice(1)
      })
      .join('')
  }))
}
