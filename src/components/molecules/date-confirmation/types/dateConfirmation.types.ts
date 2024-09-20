import { ValuesState } from './dateSection.types'

export interface DateConfirmationProps {
  sectionTitles?: string[]
  initialValues?: ValuesState
  disabledSections?: { [key: string]: boolean }
  onChange: (updatedValues: ValuesState) => void
  direction?: 'row' | 'column'
}
