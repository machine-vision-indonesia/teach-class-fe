import { Avatar } from '@/components/atoms/avatar'
import { MvTypography } from '@/components/atoms/mv-typography'
import { Box, Link, ListItem, useTheme } from '@mui/material'
import { env } from 'next-runtime-env'
import React from 'react'
import { downloadChatFile } from '../services/actionChat.service'
import Image from 'next/image'
import { dateConvert, fileSizeReadable, truncateText } from '../utils'
import PdfIcon from '@/../public/images/icon/pdf.svg'
import TxtIcon from '@/../public/images/icon/txt.svg'
import XlsxIcon from '@/../public/images/icon/xlsx.svg'
import DocIcon from '@/../public/images/icon/docx.svg'
import PptIcon from '@/../public/images/icon/ppt.svg'
import { IBubbleChat } from '../types/bubbleChat.types'

export const BubbleChat = ({ me, userName, message, avatar, attachments, date }: IBubbleChat) => {
  const { colorToken } = useTheme()
  const { time } = dateConvert(date)

  const token: string = localStorage.getItem('accessToken') || ''
  const BASE_URL: string | undefined = env('NEXT_PUBLIC_REST_API_URL')

  const checkIconType = (item: any) => {
    if (item?.type.split('/')[1] === 'plain' || item?.type.split('/')[1] === 'txt') return TxtIcon
    if (item?.type.split('/')[1] === 'xlsx' || item?.type.split('/')[1] === 'xls' || item?.type.split('/')[1] === 'csv')
      return XlsxIcon
    if (item?.type.split('/')[1] === 'pdf') return PdfIcon
    if (item?.type.split('/')[1] === 'docx' || item?.type.split('/')[1] === 'doc') return DocIcon
    if (item?.type.split('/')[1] === 'pptx' || item?.type.split('/')[1] === 'ppt') return PptIcon
  }

  const checkOneImage = (item: any) => item?.type.split('/')[0] === 'image'

  const checkIsImage = () => {
    let isImageExist = true
    attachments?.map(item => {
      if (item.directus_files_id?.type.split('/')[0] !== 'image') {
        isImageExist = false
      }
    })

    return isImageExist
  }

  return (
    <ListItem
      sx={{
        display: 'flex',
        flexDirection: me ? 'row-reverse' : 'row',
        alignSelf: me ? 'flex-end' : 'flex-start',
        gap: '10px',
        alignItems: 'flex-start'
      }}
    >
      <Avatar src={avatar ? `${BASE_URL}/assets/${avatar}` : ''} isAsync={false} size='sm' type='image' />

      <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
        {attachments?.length ? (
          checkIsImage() ? (
            <Box
              display={'flex'}
              gap={'10px'}
              maxWidth={'40vw'}
              flexWrap={'wrap'}
              flexDirection={me ? 'row-reverse' : 'row'}
            >
              {attachments.map((item, index) => (
                <Box
                  sx={{
                    overflowWrap: 'break-word'
                  }}
                  key={index}
                  flexWrap={'wrap'}
                  display={'flex'}
                  borderRadius={'6px'}
                  bgcolor={me ? colorToken.background.primary.subtlest : colorToken.background.neutral.subtlest}
                  minWidth={checkOneImage(item?.directus_files_id) ? '17vw' : '60vw'}
                  flexDirection={'column'}
                  p={'8px'}
                  gap={'8px'}
                >
                  <Box
                    borderRadius={'6px'}
                    px={'8px'}
                    py={'16px'}
                    display={'flex'}
                    flexDirection={'column'}
                    gap={'8px'}
                    border={`1px solid ${colorToken.border.neutral.normal}`}
                    bgcolor={colorToken.background.neutral.subtlest}
                  >
                    {checkIsImage() ? (
                      <Box position={'relative'} width={'100%'} height={'10rem'} display={'flex'}>
                        <Image
                          src={`${BASE_URL}/assets/${item.directus_files_id.id}`}
                          style={{
                            borderRadius: '6px'
                          }}
                          objectFit='cover'
                          layout='fill'
                          alt='image-preview'
                          loading='lazy'
                          property='true'
                        />
                      </Box>
                    ) : (
                      <></>
                    )}
                    <MvTypography size='BODY_MD_BOLDEST' typeSize='PX'>
                      {truncateText(item.directus_files_id.title, 20)}
                    </MvTypography>
                  </Box>

                  <Link
                    sx={{
                      cursor: 'pointer',
                      color: colorToken.text.primary.normal
                    }}
                    target='_blank'
                    fontSize='14px'
                    href={downloadChatFile(item.directus_files_id?.id, token)}
                  >
                    Download
                  </Link>
                </Box>
              ))}
            </Box>
          ) : (
            <Box display={'flex'} flexDirection={'column'} gap={'4px'}>
              {attachments.map((item, index) => (
                <Box
                  sx={{
                    overflowWrap: 'break-word'
                  }}
                  key={index}
                  flexWrap={'wrap'}
                  display={'flex'}
                  bgcolor={me ? colorToken.background.primary.subtlest : colorToken.background.neutral.subtlest}
                  borderRadius={'6px'}
                  minWidth={checkOneImage(item?.directus_files_id) ? '10vw' : '35vw'}
                  flexDirection={'column'}
                  p={'8px'}
                  gap={'8px'}
                >
                  <Box
                    borderRadius={'6px'}
                    px={'8px'}
                    py={'16px'}
                    display={'flex'}
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                    border={`1px solid ${colorToken.border.neutral.normal}`}
                    bgcolor={colorToken.background.neutral.subtlest}
                  >
                    <Box display={'flex'} alignItems={'center'} gap={2}>
                      {checkOneImage(item?.directus_files_id) ? (
                        <Box position={'relative'} width={'14px'} height={'20px'} display={'flex'}>
                          <Image
                            src={`${BASE_URL}/assets/${item.directus_files_id.id}`}
                            objectFit='cover'
                            layout='fill'
                            alt='image-preview'
                            loading='lazy'
                            property='true'
                          />
                        </Box>
                      ) : (
                        <Image
                          priority
                          src={checkIconType(item.directus_files_id)}
                          style={{
                            width: '20px',
                            height: '20px'
                          }}
                          alt='file'
                        />
                      )}

                      <MvTypography size='BODY_MD_NORMAL' typeSize='PX' color={colorToken.text.neutral.normal}>
                        {truncateText(item?.directus_files_id?.title, 20)}.{item?.directus_files_id?.type.split('/')[1]}
                      </MvTypography>
                    </Box>
                    <MvTypography size='BODY_SM_NORMAL' typeSize='PX' color={colorToken.icon.neutral.subtlest}>
                      {fileSizeReadable(item?.directus_files_id?.filesize)}
                    </MvTypography>
                  </Box>

                  <Link
                    sx={{
                      cursor: 'pointer',
                      color: colorToken.text.primary.normal
                    }}
                    target='_blank'
                    fontSize='14px'
                    href={downloadChatFile(item.directus_files_id?.id, token)}
                  >
                    Download
                  </Link>
                </Box>
              ))}

              <MvTypography
                sx={{
                  alignSelf: me ? 'flex-end' : undefined
                }}
                size='BODY_SM_NORMAL'
                typeSize='PX'
              >
                {userName} <span>{time}</span>
              </MvTypography>
            </Box>
          )
        ) : (
          <></>
        )}

        {message === '' ? (
          <></>
        ) : (
          <Box display={'flex'} flexDirection={'column'} gap={'4px'}>
            <Box
              sx={{
                overflowWrap: 'break-word'
              }}
              flexWrap={'wrap'}
              bgcolor={me ? colorToken.background.primary.subtlest : colorToken.background.neutral.subtlest}
              borderRadius={'6px'}
              maxWidth={'40vw'}
              p={'8px'}
            >
              {message}
            </Box>
            <MvTypography
              sx={{
                alignSelf: me ? 'flex-end' : undefined
              }}
              size='BODY_SM_NORMAL'
              typeSize='PX'
            >
              {userName} <span>{time}</span>
            </MvTypography>
          </Box>
        )}
      </Box>
    </ListItem>
  )
}
