import React from 'react';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';
import { MvTypography } from '@/components/atoms/mv-typography';
import { Icon } from '@iconify/react/dist/iconify.js';
import InfoProfile from './InfoProfile';
import { ProfileSummaryProps } from '../types/ManageUserPage.types';

export const UserStepFive: React.FC<ProfileSummaryProps> = ({
  coverPreviewString,
  photoPreviewString,
  fullName,
  watchEmail,
  watchAddress,
  watchRoles,
  watchWorkCenter,
  watchDepartment,
  watchJobFunction,
  watchJobLevel,
  watchJobTitle,
  watchIdNumber,
  watchFirstName,
  watchLastName,
  watchGenderLabel,
  watchReligionLabel,
  watchPhone,
  watchPostCode
}) => {
  const theme = useTheme();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '20px' }}>
      {/* Cover and Profile Photo */}
      <div
        style={{
          backgroundColor: theme.palette.grey[100],
          borderRadius: '6px',
          overflow: 'hidden',
          marginTop: '20px',
          position: 'relative',
          height: '328px'
        }}
      >
        <div
          style={{
            width: '100%',
            height: '250px',
            position: 'relative',
            backgroundColor: coverPreviewString ? undefined : 'rgba(0, 94, 255, .16)'
          }}
        >
          {coverPreviewString && (
            <Image
              src={coverPreviewString}
              alt='Uploaded cover preview'
              onLoad={() => URL.revokeObjectURL(coverPreviewString)}
              fill
              style={{ objectFit: 'cover' }}
            />
          )}
        </div>
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            left: '20px',
            bottom: '20px',
            columnGap: '15px'
          }}
        >
          <div
            style={{
              width: '88px',
              height: '88px',
              borderRadius: '9999px',
              overflow: 'hidden',
              position: 'relative',
              ...(photoPreviewString
                ? {}
                : {
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                })
            }}
          >
            {photoPreviewString ? (
              <Image
                src={photoPreviewString}
                alt='Uploaded photo preview'
                onLoad={() => URL.revokeObjectURL(photoPreviewString)}
                fill
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <Icon icon='mdi:account-outline' color='#005EFF' fontSize='48px' />
            )}
          </div>
          <div style={{ alignSelf: 'flex-end' }}>
            <MvTypography size="TITLE_XS" typeSize='PX'> {fullName}</MvTypography>

            <div style={{ display: 'flex', alignItems: 'center', columnGap: '13px' }}>
              <div style={{ display: 'flex', alignItems: 'center', columnGap: '5px', marginTop: '5px' }}>
                <Icon icon='mdi:email-outline' color='#5D5E61' fontSize='20px' />
                <MvTypography size="BODY_SM_NORMAL" typeSize='PX'> {watchEmail}</MvTypography>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', columnGap: '5px', marginTop: '5px' }}>
                <Icon icon='mdi:map-marker-outline' color='#5D5E61' fontSize='20px' />
                <MvTypography size="BODY_SM_NORMAL" typeSize='PX'>{watchAddress || '-'}</MvTypography>
              </div>
            </div>
          </div>
        </div>
      </div>

      <InfoProfile
        title="Auth & Field"
        fields={[
          { label: 'Email', value: watchEmail },
          { label: 'Roles', value: watchRoles.map((role) => role.label) },
          { label: 'Work Center', value: watchWorkCenter.label },
          { label: 'Department', value: watchDepartment.label },
          { label: 'Job Function', value: watchJobFunction.label },
          { label: 'Job Level', value: watchJobLevel },
          { label: 'Job Title', value: watchJobTitle },
        ]}
      />
      <InfoProfile
        title="Personal Data"
        fields={[
          { label: 'ID Number', value: watchIdNumber },
          { label: 'First Name', value: watchFirstName },
          { label: 'Last Name', value: watchLastName },
          { label: 'Gender', value: watchGenderLabel },
          { label: 'Religion', value: watchReligionLabel },
          { label: 'Phone', value: watchPhone },
          { label: 'Post Code', value: watchPostCode },
        ]}
      />
      <InfoProfile
        title="Address & Contact"
        fields={[
          { label: 'Address', value: watchAddress },
          { label: 'Phone', value: watchPhone },
          { label: 'Postal Code', value: watchPostCode },
        ]}
      />

    </div>
  );
};
