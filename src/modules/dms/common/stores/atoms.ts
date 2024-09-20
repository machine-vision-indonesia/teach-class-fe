import { atom } from 'jotai'
import { TypeToastData } from '../types/toasterData.types'

const initialToasterData: TypeToastData = undefined

export const toasterDataAtom = atom<TypeToastData>(initialToasterData)
