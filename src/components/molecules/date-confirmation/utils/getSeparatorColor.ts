import { Theme } from '@mui/material/styles'
import { Section } from '../types/dateSection.types'

export const getSeparatorColor = (
  index: number,
  values: { [key: string]: { date: Date | null; selectedOption?: string } },
  disabledSections: { [key: string]: boolean },
  theme: Theme,
  sections: Section[]
): string => {
  const currentSection = sections[index]
  const isCurrentSectionFilled = Boolean(values[currentSection.id]?.date)
  const isCurrentSectionActive = !disabledSections[currentSection.id]
  const isNextSectionFilled = index < sections.length - 1 ? Boolean(values[sections[index + 1].id]?.date) : false

  if (isCurrentSectionFilled || isCurrentSectionActive || isNextSectionFilled) {
    return theme.colorToken.background.primary.normal
  }

  return theme.colorToken.background.neutral.subtle
}
