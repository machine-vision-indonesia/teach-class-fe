import { atom } from 'jotai'
import { StepData } from '../constant/step.constant'

export const stepDataAtom = atom(StepData)
export const activeStepAtom = atom(0)
