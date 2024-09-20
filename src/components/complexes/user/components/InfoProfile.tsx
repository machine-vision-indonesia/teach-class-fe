import { MvTypography } from '@/components/atoms/mv-typography';
import { SectionGroup } from '@/components/molecules/section-group';
import { useTheme } from '@mui/material';
import React from 'react'
import { SectionProps } from '../types/ManageUserPage.types';

const InfoProfile: React.FC<SectionProps> = ({ title, fields, renderEditButton }) => {
  const theme = useTheme()
  return (
    <SectionGroup
      title={title}
      color="default"
      squareRightChildrenRight={renderEditButton}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', rowGap: '12px' }}>
        {fields.map((field, index) => (
          <div key={index} style={{ flexBasis: '50%' }}>
            <MvTypography size="LABEL_MD_NORMAL" color={theme.colorToken.text.neutralInverted.disabled} typeSize="PX">
              {field.label} :
            </MvTypography>
            <MvTypography size="BODY_MD_NORMAL" typeSize="PX" marginTop="5px">
              {Array.isArray(field.value)
                ? field.value.join(', ')
                : field.value || '-'}
            </MvTypography>
          </div>
        ))}
      </div>
    </SectionGroup>
  );
};


export default InfoProfile
