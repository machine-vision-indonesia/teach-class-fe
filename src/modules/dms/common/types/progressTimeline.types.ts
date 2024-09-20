export interface IInstructionData {
  id: string | number | any
  instruction: string | any
  start: Date | any
  end: Date | any
}

export interface ProgressTimelineProps {
  title: string | any
  instructionData?: IInstructionData[]
}
