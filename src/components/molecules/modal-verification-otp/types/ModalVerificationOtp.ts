import { Dispatch, SetStateAction } from "react"

export interface IEnableOtp {
  otp: string
  secret?: string
  mode?: string
  password?: string
  email?: string
}

export interface QRCodeProps {
  text: string;
  width?: number;
  height?: number;
}

export interface IModalVerification {
  isVerifiedCode: boolean
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  email: string
  valueQrCode: string
  secret: string
  password: string
  isLoggedIn?: boolean
  isDisableTfa?: boolean
}

export interface IAlert {
  content: string,
  color: 'success' | 'danger',
  title: string,
  icon: string,
  open: boolean,
}
