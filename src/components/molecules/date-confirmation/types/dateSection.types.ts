import React from 'react'

export interface DateSectionProps {
  title: string
  date: Date | null
  selectedOption: string
  onDateChange: (date: Date | null) => void
  onOptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  isdisable: boolean
  direction: 'row' | 'column'
}

export type Section = {
  title: string
  id: string
}

type SectionValues = {
  date: Date | null
  selectedOption: string
}

export interface ValuesState {
  [key: string]: SectionValues
}
