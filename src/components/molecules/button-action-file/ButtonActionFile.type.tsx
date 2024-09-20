import {ThemeColor} from "../../../@core/layouts/types";

export interface PropsButtonActionFile {
  style: ThemeColor
  showText: boolean
  text?: string
  icon: string
  onClick?: (event: MouseEvent) => void
}
