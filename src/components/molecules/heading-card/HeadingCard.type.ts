import {ReactNode} from "react";
import {ThemeColor} from "../../../@core/layouts/types";

export interface PropsHeadingCard {
  color: ThemeColor | 'accent' | 'gray'
  label: string
  iconName?: string
  onIconClick?: React.MouseEventHandler<HTMLButtonElement>
  children?: ReactNode | ReactNode[] | JSX.Element | JSX.Element[]
}
