import { TypographyProps } from "@mui/material";
import { ReactNode } from "react";
export default interface MvTypographyProps extends Omit<TypographyProps, 'variant'> {
    typeSize: 'PX' | 'DVW';
    size:
    | 'DISPLAY_XL'
    | 'DISPLAY_LG'
    | 'DISPLAY_MD'
    | 'DISPLAY_SM'
    | 'TITLE_XL'
    | 'TITLE_LG'
    | 'TITLE_MD'
    | 'TITLE_SM'
    | 'TITLE_XS'
    | 'SUBTITLE_LG'
    | 'SUBTITLE_MD'
    | 'SUBTITLE_SM'
    | 'BODY_LG_NORMAL'
    | 'BODY_MD_NORMAL'
    | 'BODY_SM_NORMAL'
    | 'BODY_LG_BOLDEST'
    | 'BODY_MD_BOLDEST'
    | 'BODY_SM_BOLDEST'
    | 'LABEL_LG_NORMAL'
    | 'LABEL_MD_NORMAL'
    | 'LABEL_SM_NORMAL'
    | 'LABEL_LG_BOLDEST'
    | 'LABEL_MD_BOLDEST'
    | 'LABEL_SM_BOLDEST'
    | 'HELPER_TEXT_LG'
    | 'HELPER_TEXT_MD'
    | 'HELPER_TEXT_SM'
    | 'TABLE_HEADER';
    children: ReactNode;
}
