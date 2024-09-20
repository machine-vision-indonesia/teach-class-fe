import NextLink from 'next/link'
import Icon from 'src/@core/components/icon'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Modal } from 'src/components/atoms/modal/Modal'
import { useAtom } from 'jotai'
import { userAlertAtom } from '../atoms'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { nanoid } from 'nanoid'
import client from 'src/client'
import { env } from 'next-runtime-env'
import { IconButton } from '@mui/material'
import { ActionButtonProps } from '../types/ManageUserPage.types'
import { ResetPasswordData } from "../types/ManageUserPage.types"
import { useDeleteUser } from '../service/actionDeleteUser.service'

export function ActionButton(props: ActionButtonProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [, setUserAlert] = useAtom(userAlertAtom)
  const queryClient = useQueryClient()

  const [confirmResetPasswordModalOpen, setConfirmResetPasswordModalOpen] = useState(false)

  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const deleteUser = useDeleteUser()

  const resetPassword = useMutation({
    async mutationFn(data: ResetPasswordData) {
      const password = nanoid(15)

      await client.api.patch(`/users/${data.id}`, {
        password,
        is_using_generated_password: true
      })

      return client.api.post(`/flows/trigger/${env('NEXT_PUBLIC_SEND_EMAIL_FLOW_ID')}`, {
        to: data.email,
        subject: 'Reset Password',
        body: `We have received a request to change the password for your account. Your new password is ${password}. You can change your password after logging in.`
      })
    }
  })

  return (
    <>
      <IconButton
        sx={{
          aspectRatio: '1/1',
          minWidth: 'unset',
          color: '#005EFF',
          padding: 0,
          '&:hover': {
            background: 'transparent'
          }
        }}
        onClick={e => setAnchorEl(e.currentTarget)}
      >
        <Icon fontSize='22px' icon='ic:baseline-more-vert' />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        sx={{
          '& .MuiButtonBase-root-MuiMenuItem-root:not(.Mui-focusVisible):hover': {
            color: 'unset'
          }
        }}
      >
        <MenuItem
          component={NextLink}
          href={`/core/user/${props.user.id}/edit`}
          sx={{
            color: 'brand.second',
            display: 'flex',
            alignItems: 'center',
            columnGap: '6px',
            fontWeight: 500,
            '&:not(.Mui-focusVisible):hover': {
              color: 'brand.second'
            }
          }}
        >
          <Icon icon='ic:outline-edit' fontSize='16px' />
          Edit
        </MenuItem>
        <MenuItem
          component={NextLink}
          href={`/core/user/${props.user.id}`}
          sx={{
            color: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            columnGap: '6px',
            fontWeight: 500,
            '&:not(.Mui-focusVisible):hover': {
              color: 'primary.main'
            }
          }}
        >
          <Icon icon='ic:outline-remove-red-eye' fontSize='16px' />
          View
        </MenuItem>
        <MenuItem
          onClick={() => setConfirmResetPasswordModalOpen(true)}
          sx={{
            color: 'warning.main',
            display: 'flex',
            alignItems: 'center',
            columnGap: '6px',
            fontWeight: 500,
            '&:not(.Mui-focusVisible):hover': {
              color: 'warning.main'
            }
          }}
        >
          <Icon icon='ic:baseline-key' fontSize='16px' />
          Reset password
        </MenuItem>
        <MenuItem
          onClick={() => setDeleteModalOpen(true)}
          sx={{
            color: 'error.main',
            display: 'flex',
            alignItems: 'center',
            columnGap: '6px',
            fontWeight: 500,
            '&:not(.Mui-focusVisible):hover': {
              color: 'error.main'
            }
          }}
        >
          <Icon icon='ic:baseline-delete-outline' fontSize='16px' />
          Delete
        </MenuItem>
      </Menu>

      <Modal
        isOpen={confirmResetPasswordModalOpen}
        onClose={() => setConfirmResetPasswordModalOpen(false)}
        variant='warning'
        loading={resetPassword.isPending || resetPassword.isSuccess}
        positiveLabel='Yes'
        title='Are you sure you want to reset password?'
        onOk={async () => {
          try {
            await resetPassword.mutateAsync({ id: props.user.id, email: props.user.email })

            setUserAlert({
              title: 'Reset Password Successful',
              content: 'New password has been sent to user email',
              color: 'success',
              icon: 'ic:baseline-check',
              pathname: '/core/user',
              open: true
            })
          } catch {
            setUserAlert({
              title: 'Reset Password Failed',
              content: 'Failed to reset password. Please try again',
              color: 'error',
              icon: 'ic:baseline-do-disturb',
              pathname: '/core/user',
              open: true
            })
          }

          setConfirmResetPasswordModalOpen(false)
          setAnchorEl(null)
          resetPassword.reset()

          setTimeout(() => {
            window.scrollTo(0, 0)
          }, 100)
        }}
      />

      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title='Are you sure you want to delete this user?'
        onOk={async () => {
          try {
            await deleteUser.mutateAsync({
              id: props.user.id
            })

            await queryClient.invalidateQueries()

            setUserAlert({
              title: 'Delete Successful',
              content: 'Your user was success to delete',
              color: 'success',
              icon: 'ic:baseline-check',
              pathname: '/core/user',
              open: true
            })
          } catch {
            setUserAlert({
              title: 'Delete Failed',
              content: 'Your user was failed to delete',
              color: 'error',
              icon: 'ic:baseline-do-disturb',
              pathname: '/core/user',
              open: true
            })
          }

          deleteUser.reset()
          setDeleteModalOpen(false)
          setAnchorEl(null)

          setTimeout(() => {
            window.scrollTo(0, 0)
          }, 100)
        }}
        variant='danger'
        loading={deleteUser.isPending || deleteUser.isSuccess}
      />
    </>
  )
}
