import { COLOR_VARIANT } from '../constants/spinner.constant'

export default interface SpinnerProps {
  color: keyof typeof COLOR_VARIANT
  size?: string
}
