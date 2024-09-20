export interface IStepData {
  active: boolean,
  passed: boolean,
  subtitle: string
  title: string
}

export enum StepState {
  SELECT_MATERIAL = 0,
  TRANSFER_PLAN = 1,
}

export const StepData: IStepData[] = [
  {
    active: true,
    passed: false,
    subtitle: '',
    title: 'Sales Order'
  },
  {
    active: false,
    passed: false,
    subtitle: '',
    title: 'Delivery Plan'
  }
]
