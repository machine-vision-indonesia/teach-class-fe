import { Dispatch, ReactNode, SetStateAction } from "react";

export interface PropsOtp {
  separator?: ReactNode;
  length: number;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  onComplete?: () => void;
}
