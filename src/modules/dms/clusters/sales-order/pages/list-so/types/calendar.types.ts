export interface ILegend {
  label: string
  color: string
}

export interface ICalendarLegendProps {
  legends: ILegend[]
}

export interface ICalendarDetailModalProps {
  isOpen: boolean
  onClose: () => void
}
