/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Box, Button, Divider, Stack, Typography, useTheme } from '@mui/material'
import { Icon } from '@iconify/react'

import { ChatBoxMessage, ChatBoxMessageData, ChatBoxProps } from './ChatBox.type'
import { formatDate, formatFileSize, formatRelativeDate } from './ChatBox.utils'
import {
  ChatBoxAttachmentButton,
  ChatBoxField,
  chatBoxStyles,
  chatBubbleStyles,
  chatStatusStyles
} from './ChatBox.style'

import { AvatarAsync } from '../avatar-async/AvatarAsync'
import { GetUserChatBox, IUserChatBox } from './ChatBoxUser.service'
import { useMutation } from '@tanstack/react-query'
import { useUserData } from './ChatboxUser.hook'
import { ActionUploadService } from './action-upload.service'
import toast from 'react-hot-toast'
import { env } from 'next-runtime-env'

const ChatBubble = ({ createdAt, sender, attachment, message, userId }: ChatBoxMessage) => {
  const isSender = sender === userId
  const attachmentURL = `${env('NEXT_PUBLIC_REST_API_URL')}/assets/${
    attachment?.id
  }?downloadable=true&preview=true&access_token=${localStorage.getItem('accessToken')}`

  return (
    <Stack direction={isSender ? 'row-reverse' : 'row'} spacing='10px' sx={{ mt: 2 }}>
      <Box width='50px'>
        <AvatarAsync orientation='vertical' userId={sender} />
      </Box>
      <Stack spacing={'10px'} maxWidth={'65%'}>
        <Box
          sx={{
            borderRadius: isSender ? '8px 8px 0 8px' : '8px 8px 8px 0',
            background: (theme: any) => (isSender ? theme.palette.primary[100] : theme.palette.secondary[100]),
            ...chatBubbleStyles.bubbleContainer
          }}
        >
          {attachment?.filename_download && (
            <div onClick={() => window.open(attachmentURL, '_blank')}>
              <Stack sx={chatBubbleStyles.attachmentContainer}>
                <Icon icon='mdi:file-pdf-box' {...chatBubbleStyles.attachmentIcon} />
                <Box>
                  <Typography variant='body2' fontSize={14} color={t => t.palette.text.secondary}>
                    {attachment?.filename_download}
                  </Typography>
                  <Typography fontSize={12} lineHeight={1.08} fontWeight={400} color={'#909094'} mt={'4px'}>
                    {formatFileSize(Number(attachment?.filesize))}
                  </Typography>
                </Box>
              </Stack>
            </div>
          )}
          <Typography variant='body2' color={t => t.palette.text.secondary}>
            {message}
          </Typography>
          <Typography
            variant='body1'
            sx={{
              ...chatBubbleStyles.dateText,
              textAlign: isSender ? 'right' : 'left'
            }}
          >
            {formatDate(createdAt)}
          </Typography>
        </Box>
      </Stack>
    </Stack>
  )
}

const ChatStatusNotification = ({ userId, date, status }: { userId: string; date: any; status: string }) => {
  const { data, isFetching, isLoading, isError } = GetUserChatBox<IUserChatBox>({ userId })
  const userName = data?.data?.first_name + ' ' + data?.data?.last_name

  if (isLoading || isFetching) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  return (
    <Box sx={chatStatusStyles.statusNotificationContainer}>
      <Divider>
        <Typography variant='subtitle2' sx={{ ...chatStatusStyles.notificationText }}>
          {formatRelativeDate(date)} | {userName} Has been updated current status to
          <Typography component={'span'} variant='subtitle2' sx={chatStatusStyles.statusText}>
            &nbsp;{status}
          </Typography>
        </Typography>
      </Divider>
    </Box>
  )
}

const ChatRemarkNotification = ({ userId, remark, status }: { userId: string; remark: string; status?: string }) => {
  const { data, isFetching, isLoading, isError } = GetUserChatBox<IUserChatBox>({ userId })
  const userName = data?.data?.first_name + ' ' + data?.data?.last_name

  if (isLoading || isFetching) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  return (
    <Box sx={chatStatusStyles.statusNotificationContainer}>
      <Divider>
        <Typography variant='subtitle2' sx={{ ...chatStatusStyles.notificationText }}>
          Remarks : {remark}
        </Typography>
      </Divider>
    </Box>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ChatBox = ({
  chatBoxTitle = 'Discussion',
  dataFetchService,
  actionSaveService,
  realtimeMessageService,
  documentKey,
  readOnly
}: ChatBoxProps) => {
  const theme = useTheme()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { isLoading: isLoadingSave, mutateAsync } = useMutation({
    mutationFn: actionSaveService
  })

  /**
   * custom hook
   */
  const { data: userData } = useUserData()

  /**
   * state
   */
  const [chatMessage, setChatMessage] = useState<string>('')
  const [inputValue, setInputValue] = useState<string>('')
  const [chatDatas, setChatDatas] = useState<any[]>([])
  const [attachment, setAttachment] = useState<any | null>(null)
  const [isChatInitiated, setIsChatInitiated] = useState<boolean>(false)

  const isDisabled = readOnly

  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0]
    if (!(file && file.type === 'application/pdf')) {
      toast.error('Please upload a PDF file.')

      return
    }

    try {
      const uploadFileResponse = await ActionUploadService(e)
      setAttachment(uploadFileResponse)
    } catch (error) {
      console.error('Error uploading file:', error)
    }
  }

  const handleSendMessage = async () => {
    if (!chatMessage && !attachment) return
    await mutateAsync({
      message: chatMessage,
      document_id: documentKey,
      status: 'published',
      attachment
    }).then(() => {
      setAttachment(null)
      setChatMessage('')
      setInputValue('')
    })
  }

  const { data, isLoading, isError, isFetching, refetch } = dataFetchService({
    documentKey
  })

  const { realTimeMessages } = realtimeMessageService({ documentKey })

  useEffect(() => {
    if (!isChatInitiated) {
      if (data?.data) {
        const arrReverse = data?.data.toReversed()
        setChatDatas(arrReverse)
        setIsChatInitiated(true)
      }
    }

    if (realTimeMessages) {
      setChatDatas(prevData => [...prevData.toReversed(), realTimeMessages].toReversed())
    }
  }, [data?.data, realTimeMessages])

  useEffect(() => {
    if (isLoading || isFetching) {
      setIsChatInitiated(false)
    }
  }, [isFetching, isLoading])

  if (isLoading || isFetching) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  return (
    <Stack spacing={2} direction='column' sx={chatBoxStyles.chatBoxContainer}>
      <Typography variant='h5' sx={{ color: theme.palette.primary.main }}>
        {chatBoxTitle}
      </Typography>

      <Box sx={chatBoxStyles.chatBoxContent}>
        <Stack spacing='10px' sx={{ ...chatBoxStyles.container }}>
          {chatDatas.map((message: ChatBoxMessageData, index: number) => {
            return (
              <Fragment key={index}>
                {message.status && message.remark ? (
                  <>
                    <Stack
                      spacing='10px'
                      sx={{
                        paddingBottom: '10px'
                      }}
                    >
                      <ChatStatusNotification
                        userId={message.sender}
                        date={message?.createdAt || new Date()}
                        status={message.status}
                      />
                      <ChatRemarkNotification userId={message.sender} remark={message.remark} />
                    </Stack>
                  </>
                ) : message.status ? (
                  <ChatStatusNotification
                    userId={message.sender}
                    date={message?.createdAt || new Date()}
                    status={message.status}
                  />
                ) : (
                  <ChatBubble
                    message={message.message}
                    createdAt={message.createdAt}
                    sender={message.sender}
                    attachment={message.attachment}
                    userId={userData.id}
                  />
                )}
              </Fragment>
            )
          })}

          {data.data?.length === 0 && (
            <Typography variant='body2' m={'auto !important'}>
              No discussion yet...
            </Typography>
          )}
        </Stack>
      </Box>

      {/* Footer section */}
      {attachment?.filename_download && (
        <Stack sx={chatBubbleStyles.attachmentContainer}>
          <Box sx={{ display: 'inline-flex', justifyContent: 'flex-end', pl: 2 }}>
            <Icon icon='mdi:file-pdf-box' {...chatBubbleStyles.attachmentIcon} />
            <Box>
              <Typography variant='body2' fontSize={14} color={t => t.palette.text.secondary}>
                {attachment?.filename_download}
              </Typography>
              <Typography fontSize={12} lineHeight={1.08} fontWeight={400} color={'#909094'} mt={'4px'}>
                {formatFileSize(Number(attachment?.filesize))}
              </Typography>
            </Box>
          </Box>
        </Stack>
      )}
      <Stack sx={chatBoxStyles.footerSection}>
        <ChatBoxField
          fullWidth
          multiline
          maxRows={3}
          variant='outlined'
          placeholder='Add your message'
          disabled={isDisabled}
          onChange={(e: { target: { value: React.SetStateAction<string> } }) => {
            setChatMessage(e.target.value)
            setInputValue(e.target.value)
          }}
          value={inputValue}
        />
        <Stack spacing={1} direction={'row'} sx={chatBoxStyles.footerButtonSection}>
          <input type='file' style={{ display: 'none' }} ref={fileInputRef} onChange={e => handleUploadFile(e)} />
          <ChatBoxAttachmentButton color='primary' onClick={() => fileInputRef.current?.click()} disabled={isDisabled}>
            <Icon icon='mdi:attach-file' fontSize={18} />
          </ChatBoxAttachmentButton>
          <Button
            variant='contained'
            sx={chatBoxStyles.sendButton}
            onClick={handleSendMessage}
            disabled={isDisabled || isLoadingSave}
          >
            Send
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )
}
