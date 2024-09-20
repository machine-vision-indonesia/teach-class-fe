import { Box, Divider, List, Stack, useTheme } from '@mui/material'
import React, { ChangeEvent, FC, useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { BubbleChat } from './BubbleChat'
import { Input as MvInput } from '@/components/atoms/input'
import { Button } from '@/components/atoms'
import useUserChat from '../hooks/useUserChat'
import { IChat, IChatProps, IInputType } from '../types/liveChat.types'
import { FileListPreview } from './FileListPreview'
import { ImageListPreview } from './ImageListPreview'
import { checkIsImage, getDateDivider, getRelativeDate } from '../utils'
import { MvTypography } from '@/components/atoms/mv-typography'
import { Progress } from '@/components/atoms/progress'

export const LiveChat: FC<IChatProps> = ({
  dataFetchService,
  realtimeChatService,
  chatMutation,
  uploadFileMutation,
  progress
}) => {
  const [input, setInput] = useReducer(
    (current: IInputType, update: Partial<IInputType>) => ({
      ...current,
      ...update
    }),
    {
      message: '',
      attachments: []
    }
  )
  const [attachment, setAttachment] = useState<any[]>([])
  const [preAttachment, setPreAttachment] = useState<File | undefined>()
  const [loading, setLoading] = useState<boolean>(false)

  const { colorToken } = useTheme()

  const user = useUserChat()

  const { data: infiniteData, fetchNextPage, hasNextPage, isFetching, isLoading } = dataFetchService()

  const messagesEndRef = useRef<any>(null)
  const attachmentRef = useRef<HTMLInputElement | null>(null)
  const observer = useRef<IntersectionObserver>()
  const chatContainerRef = useRef<HTMLDivElement>(null)

  let lastDisplayDate = ''

  const handleAttachment = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    setLoading(true)
    setPreAttachment(selectedFile)
    if (selectedFile) {
      const blob = new Blob([selectedFile], { type: selectedFile?.type })

      uploadFileMutation.mutate(
        {
          file: blob,
          fileName: selectedFile.name
        },
        {
          onSuccess: success => {
            setAttachment([...attachment, success?.data?.data])
            setLoading(false)
          },
          onError: () => {
            setLoading(false)
          }
        }
      )
    }
  }

  const deleteUploadFile = (id: string) => {
    const deletedFile = attachment.filter(item => item.id !== id)
    setAttachment(deletedFile)
    setInput({
      attachments: deletedFile
    })
    if (attachmentRef.current) {
      return (attachmentRef.current.value = '')
    }
  }

  const handleSubmit = useCallback(() => {
    chatMutation.mutateAsync(
      {
        message: input.message,
        send_by: user?.id,
        attachments: {
          create: input.attachments
        }
      },
      {
        onSuccess: async () => {
          realtimeChatService.unsubscribe()
          setInput({
            message: '',
            attachments: []
          })
          setAttachment([])
          setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
          }, 330)
        }
      }
    )
  }, [input])

  const firstElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading || !chatContainerRef.current) return

      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting && hasNextPage && !isFetching) {
            const container = chatContainerRef.current
            if (container) {
              const prevHeight = container.scrollHeight
              const prevScrollTop = container.scrollTop

              fetchNextPage().then(() => {
                // Wait for the DOM to update
                setTimeout(() => {
                  const newHeight = container.scrollHeight
                  const heightDifference = newHeight - prevHeight
                  container.scrollTop = prevScrollTop + heightDifference
                }, 0)
              })
            }
          }
        },
        { root: chatContainerRef.current, rootMargin: '0px', threshold: 0.1 }
      )

      if (node) observer.current.observe(node)
    },
    [fetchNextPage, hasNextPage, isFetching, isLoading]
  )

  const flatData = useMemo(() => {
    const webSocketData = realtimeChatService.response || []
    const infinitePageData = infiniteData?.pages.flatMap(item => item.data) || []
    return [...webSocketData, ...infinitePageData]
  }, [infiniteData, realtimeChatService.response])

  useEffect(() => {
    if (attachment.length) {
      const updatedAttachment = attachment.map(item => ({
        directus_files_id: {
          id: item.id
        }
      }))

      setInput({
        attachments: updatedAttachment
      })
    }
  }, [attachment])

  useEffect(() => {
    const container = chatContainerRef.current
    if (container && flatData.length === 0) {
      container.scrollTop = container.scrollHeight
    }
  }, [flatData])

  // ** Effects
  // useEffect(() => {
  //   if (isLoading) return
  //   unsubscribe()
  //   subscribe()
  // }, [])

  return (
    <Stack
      display='flex'
      flexDirection='column'
      height='100vh'
      width={'100vw'}
      justifyContent='flex-end'
      overflow='hidden'
    >
      <Stack flexGrow={1} overflow='auto' display='flex' flexDirection='column' ref={chatContainerRef}>
        <List sx={{ display: 'flex', flexDirection: 'column' }}>
          {flatData?.length ? (
            <>
              {flatData?.toReversed().map((item: IChat, index) => {
                const currenDate = getDateDivider(item.date_created)
                const showDivider = currenDate !== lastDisplayDate

                if (showDivider) {
                  lastDisplayDate = currenDate
                }

                return (
                  <div key={index} ref={index === 0 ? firstElementRef : null}>
                    {showDivider && (
                      <Divider>
                        <MvTypography marginX={'10px'} size='BODY_SM_BOLDEST' typeSize='PX'>
                          {getRelativeDate(item?.date_created)}
                        </MvTypography>
                      </Divider>
                    )}
                    <BubbleChat
                      me={item.send_by === user?.id}
                      message={item.message}
                      userName={item.user_created.first_name}
                      avatar={item.user_created.avatar?.id}
                      attachments={item.attachments}
                      date={item.date_created}
                    />
                  </div>
                )
              })}
              <div ref={messagesEndRef} />
            </>
          ) : (
            <></>
          )}
        </List>
      </Stack>
      <Box
        display='flex'
        flexDirection={'column'}
        p={'16px'}
        gap={'10px'}
        bgcolor={colorToken.background.neutral.normal}
        borderTop={`1px solid ${colorToken.border.neutral.normal}`}
      >
        {loading ? (
          <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
            <FileListPreview
              fileName={preAttachment!.name}
              fileType={preAttachment!.type}
              fileSize={preAttachment?.size}
              progressPercent={progress}
            />
            <Progress variant='determinate' value={progress ? progress : 0} />
          </Box>
        ) : attachment.length ? (
          <Box
            display='flex'
            flexDirection={checkIsImage(attachment) ? 'row' : 'column'}
            gap={'16px'}
            sx={{
              overflowX: 'scroll'
            }}
            maxHeight={'260px'}
            maxWidth={'100vw'}
            overflow={'auto'}
          >
            {attachment.map((item, index) =>
              checkIsImage(attachment) ? (
                <ImageListPreview key={index} imageSource={item.id} onDelete={() => deleteUploadFile(item?.id)} />
              ) : (
                <FileListPreview
                  key={index}
                  fileId={item.id}
                  fileName={item.filename_download}
                  fileType={item.type}
                  fileSize={item.filesize}
                  onDelete={() => deleteUploadFile(item?.id)}
                />
              )
            )}
          </Box>
        ) : (
          <></>
        )}
        <Box display='flex' flexDirection={'row'} gap={'10px'}>
          <MvInput
            variant='outlined'
            fullWidth
            size='small'
            onChange={e => setInput({ message: e.target.value })}
            value={input.message}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleSubmit()
              }
            }}
          />

          <input type='file' ref={attachmentRef} onChange={handleAttachment} hidden />
          <Button
            size='small'
            content='iconOnly'
            buttonStyle='plain'
            icon='ph:paperclip'
            iconSize={22}
            onClick={() => attachmentRef.current?.click()}
          />

          <Button
            content='iconText'
            icon='bi:send'
            iconSize={24}
            buttonStyle='solid'
            size='medium'
            text='Send'
            disabled={input.message !== '' || attachment.length ? false : true}
            onClick={handleSubmit}
          />
        </Box>
      </Box>
    </Stack>
  )
}
