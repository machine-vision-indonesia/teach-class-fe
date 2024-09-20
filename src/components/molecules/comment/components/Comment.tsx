// #region ===== Import =====
import { ChangeEvent, FC, FormEvent, useState } from 'react'

// ** MUI Components
import { Box, IconButton, Paper, useTheme, Grid, Stack } from '@mui/material'

// ** Core / Components
import Icon from 'src/@core/components/icon'

// ** Atoms / Components
import { Input } from '@/components/atoms/input'
import { Button } from '@/components/atoms'
import { MvTypography } from '@/components/atoms/mv-typography'

// ** Services
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '@/pages/_app'

// ** Other
import { GroupLabel } from './GroupLabel'

import { IComment, IPayloadComment, IssueComment, ProcessedComment, PropsComment } from '../types/Comment.type'
import { getRelativeDateString, sortByDate } from '../utils/Comment.utils'
import { dummyData } from '../constants'
import { Avatar } from '@/components/atoms/avatar'
import { actionPostComment } from '../services/actionPostComment.service'
import { env } from 'next-runtime-env'

// #endregion

const processComments = (comments: IssueComment[]): ProcessedComment[] => {
  const commentMap = new Map<string, any>()

  comments?.forEach(comment => {
    commentMap.set(comment.id, { ...comment, issue_comment: [] })
  })
  comments?.forEach(comment => {
    if (comment.reply_to_id) {
      const parentComment = commentMap.get(comment.reply_to_id)
      if (parentComment) {
        const childComment = commentMap.get(comment.id)
        if (childComment) {
          parentComment.issue_comment!.push(childComment)
        }
      }
    }
  })

  return Array.from(commentMap?.values()).filter(comment => !comment.reply_to_id)
}

export const Comment: FC<PropsComment> = ({ dataFetchService }) => {
  const theme = useTheme()

  const [repliedComment, setRepliedComment] = useState<IComment | null>()
  const [comment, setComment] = useState<string>('')

  const { data: dataService } = dataFetchService()

  const handleReplied = (value: IComment) => {
    setRepliedComment(value)
  }

  const handleInputComment = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setComment(event?.target.value)

  const addComment = useMutation({
    mutationFn: (newComment: IPayloadComment) => actionPostComment(newComment),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['COMMENTS'] })
  })

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (comment) {
      const payload: IPayloadComment = {
        comment: comment,
        reply_to_id: repliedComment ? repliedComment.id : undefined
      }
      addComment.mutate(payload, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['COMMENTS'] })
        }
      })
      setComment('')
      setRepliedComment(null)
    }
  }

  const dataComments = dataService?.data ? sortByDate(processComments(dataService?.data), 'asc') : dummyData

  return (
    <Box
      sx={{
        width: 400,
        bgcolor: theme.colorToken.background.default,
        boxShadow: 24,
        p: 4,
        overflow: 'auto',
        minHeight: 400
      }}
    >
      <GroupLabel color='accent' iconName='iconamoon:comment-dots-light' label='Comments' style='header'>
        <Box height={'60vh'} overflow={'auto'}>
          {dataComments?.length > 0 &&
            dataComments.map((value: any, index: number) => (
              <Box px={'2dvh'} pt={'1dvh'} key={index}>
                <Paper variant='outlined' sx={{ mt: '1dvh' }}>
                  <Box px={'2dvh'} py={'1dvh'}>
                    <Box display='flex' justifyContent='space-between'>
                      <Box display={'flex'} gap={2}>
                        <Avatar
                          type='image'
                          alt={value?.user_created?.first_name}
                          isAsync={false}
                          displayName={value?.user_created?.first_name}
                          src={`${env('NEXT_PUBLIC_REST_API_URL')}/assets/${value?.user_created?.avatar?.id}`}
                        />
                        <Box>
                          <MvTypography
                            size='BODY_MD_BOLDEST'
                            my={1}
                            color={theme.colorToken.text.neutral.normal}
                            typeSize='PX'
                          >
                            {`${value?.user_created?.first_name} ${value?.user_created?.last_name ?? ' '}`}
                          </MvTypography>
                          <MvTypography
                            size='BODY_SM_NORMAL'
                            my={1}
                            color={theme.colorToken.text.neutral.disabled}
                            typeSize='PX'
                          >
                            {value?.user_created?.job_title}
                          </MvTypography>
                        </Box>
                      </Box>
                      <MvTypography size='BODY_SM_NORMAL' typeSize='PX' color={theme.colorToken.icon.neutral.disabled}>
                        {getRelativeDateString(value.date_created)}
                      </MvTypography>
                    </Box>
                    <Box mt={'1dvh'} mb={2}>
                      <MvTypography
                        size='BODY_MD_NORMAL'
                        my={1}
                        color={theme.colorToken.text.neutral.normal}
                        typeSize='PX'
                      >
                        {value.comment}
                      </MvTypography>
                    </Box>
                    {value?.issue_comment?.length > 0 && (
                      <MvTypography
                        size='BODY_SM_NORMAL'
                        my={1}
                        color={theme.colorToken.icon.neutral.subtle}
                        typeSize='PX'
                      >
                        {value.issue_comment.length} replies
                      </MvTypography>
                    )}
                    {value?.issue_comment &&
                      value?.issue_comment.map((el: IssueComment, i: number) => (
                        <Box
                          mb={2}
                          key={i}
                          mt={'1dvh'}
                          padding={2}
                          border={'0.5px solid'}
                          display={'flex'}
                          borderColor={theme.colorToken.border.neutral.bold}
                          borderRadius={1.5}
                          flexDirection={'column'}
                          bgcolor={theme.colorToken.background.neutral.subtlest}
                        >
                          <Box display='flex' justifyContent='space-between'>
                            <Box display={'flex'} gap={2}>
                              <Avatar
                                type='image'
                                alt={el?.user_created?.first_name}
                                isAsync={false}
                                displayName={el?.user_created?.first_name}
                                src={`${env('NEXT_PUBLIC_REST_API_URL')}/assets/${el?.user_created?.avatar?.id}`}
                              />
                              <Box>
                                <MvTypography
                                  size='BODY_MD_BOLDEST'
                                  typeSize='PX'
                                  color={theme.colorToken.text.neutral.normal}
                                >
                                  {`${el?.user_created?.first_name ?? ''}  ${el?.user_created?.last_name ?? ' '}`}
                                </MvTypography>
                                <Box />
                                <MvTypography
                                  size='BODY_SM_NORMAL'
                                  typeSize='PX'
                                  color={theme.colorToken.text.neutral.disabled}
                                >
                                  {el?.user_created?.job_title}
                                </MvTypography>
                              </Box>
                            </Box>
                            <MvTypography
                              size='BODY_SM_NORMAL'
                              typeSize='PX'
                              color={theme.colorToken.icon.neutral.disabled}
                            >
                              {getRelativeDateString(value.date_created)}
                            </MvTypography>
                          </Box>
                          <MvTypography
                            size='BODY_SM_BOLDEST'
                            my={1}
                            color={theme.colorToken.text.primary.normal}
                            typeSize='PX'
                          >
                            @{value?.user_created?.first_name} {value?.user_created?.last_name ?? ' '}
                          </MvTypography>
                          <MvTypography
                            size='BODY_MD_NORMAL'
                            my={1}
                            color={theme.colorToken.text.neutral.normal}
                            typeSize='PX'
                          >
                            {el?.comment}
                          </MvTypography>
                        </Box>
                      ))}
                    <Box display='flex' justifyContent='space-between' mt={'1dvh'}>
                      <Button
                        onClick={() => handleReplied(value)}
                        variant='plain'
                        content='iconText'
                        icon='tabler:arrow-back-up'
                        text='Repply'
                      />
                    </Box>
                  </Box>
                </Paper>
              </Box>
            ))}
        </Box>
      </GroupLabel>

      {/* Show Repply Comment top Input Field  */}
      <Box position={'sticky'}>
        {repliedComment && (
          <>
            <Grid container alignItems={'center'} width='full'>
              <Grid item xs={10}>
                <Stack direction='row' width='full' mt={3} alignItems='center' justifyContent='space-between'>
                  <MvTypography size='BODY_MD_BOLDEST' typeSize='PX' color={theme.colorToken.text.neutral.normal}>
                    Repplying:
                  </MvTypography>
                  <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
                    <IconButton onClick={() => setRepliedComment(null)}>
                      <Icon icon='material-symbols:close' />
                    </IconButton>
                  </Box>
                </Stack>
                <Box
                  mt={'1dvh'}
                  padding={2}
                  border={`0.5px solid`}
                  display={'flex'}
                  borderColor={theme.colorToken.border.neutral.bold}
                  borderRadius={1.5}
                  flexDirection={'column'}
                  bgcolor={theme.colorToken.background.primary.subtlest}
                >
                  <Box display='flex' justifyContent='space-between'>
                    <Box display={'flex'} gap={2}>
                      <Avatar
                        type='image'
                        alt={repliedComment?.user_created?.first_name}
                        isAsync={false}
                        displayName={repliedComment?.user_created?.first_name}
                        src={`${env('NEXT_PUBLIC_REST_API_URL')}/assets/${repliedComment?.user_created?.avatar?.id}`}
                      />
                      <Box display='block'>
                        <MvTypography size='BODY_MD_NORMAL' typeSize='PX' color={theme.colorToken.text.neutral.normal}>
                          {`${repliedComment?.user_created?.first_name ?? ''}  ${repliedComment?.user_created?.last_name ?? ' '}`}
                        </MvTypography>
                        <Box />
                        <MvTypography
                          size='BODY_SM_NORMAL'
                          typeSize='PX'
                          color={theme.colorToken.text.neutral.disabled}
                        >
                          {repliedComment?.user_created?.job_title}
                        </MvTypography>
                      </Box>
                    </Box>
                    <MvTypography size='BODY_SM_NORMAL' typeSize='PX' color={theme.colorToken.icon.neutral.disabled}>
                      {getRelativeDateString(repliedComment?.date_created)}
                    </MvTypography>
                  </Box>

                  <MvTypography mt={2} size='BODY_MD_NORMAL' typeSize='PX' color={theme.colorToken.text.neutral.normal}>
                    {repliedComment?.comment}
                  </MvTypography>
                </Box>
              </Grid>
            </Grid>
          </>
        )}

        <Box
          width={'100%'}
          component='form'
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}
          onSubmit={e => handleSubmit(e)}
        >
          <Input
            fullWidth
            variant='outlined'
            placeholder='Input Comment here...'
            defaultValue={''}
            value={comment}
            size='small'
            onChange={e => handleInputComment(e)}
            sx={{ mr: 1, width: '100%' }}
          />
          <Button variant='solid' type='submit' disabled={!comment} content='iconOnly' icon='tabler:send' />
        </Box>
      </Box>
    </Box>
  )
}
