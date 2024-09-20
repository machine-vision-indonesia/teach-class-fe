import { atom } from 'jotai'
import { type PropsAlert } from 'src/components/atoms/alert/Alert'

type AlertAtom = {
  title: string
  content: string
  color: PropsAlert['color']
  icon: 'ic:baseline-check' | 'ic:baseline-do-disturb'
  pathname: string
  open: boolean
}

export const userAlertAtom = atom<AlertAtom>({
  title: '',
  content: '',
  color: 'success',
  icon: 'ic:baseline-check',
  pathname: '',
  open: false
})
