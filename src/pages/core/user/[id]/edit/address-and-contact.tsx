import Icon from 'src/@core/components/icon'
import NextLink from 'next/link'
import Link from '@mui/material/Link'
import { useTheme } from '@mui/material/styles'
import { useRouter } from 'next/router'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from 'src/components/atoms/button'
import { useQueryClient } from '@tanstack/react-query'
import Box from '@mui/material/Box'
import { CircularProgress } from 'src/components/atoms/circular-progress/CircularProgress'
import { useEffect, useState } from 'react'
import { useGetUser } from 'src/service/user/edit/address-and-contact/useGetUser'
import { Modal } from 'src/components/atoms/modal/Modal'
import { useAtom } from 'jotai'
import { userAlertAtom } from 'src/components/complexes/user/atoms'
import { Alert } from 'src/components/atoms/alert/Alert'
import { UserStepThree } from '@/components/complexes/user/components/UserStepThree'
import { SchemaAddressContact } from '@/components/complexes/user/types/UserEditPage.type'
import { schemaAddressContact } from '@/components/complexes/user/validations'
import { useUpdateProfile } from '@/service/user/useUpdateProfile'
import { MvTypography } from '@/components/atoms/mv-typography'
import { Breadcrumbs } from '@/components/atoms/breadcrumbs'

export default function ManageUserAddressAndContactEdit() {
  const theme = useTheme()
  const router = useRouter()
  const form = useForm<SchemaAddressContact>({
    resolver: yupResolver(schemaAddressContact)
  })

  const user = useGetUser({ id: router.query.id as string, enabled: router.isReady })
  const updateProfile = useUpdateProfile()
  const queryClient = useQueryClient()

  useEffect(() => {
    form.reset({
      address: user.data?.data.profile.address,
      phone: user.data?.data.profile.phone,
      post_code: user.data?.data.profile.post_code
    })
  }, [form, user.data?.data.profile?.address, user.data?.data.profile?.phone, user.data?.data.profile?.post_code])

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [userAlert, setUserAlert] = useAtom(userAlertAtom)

  useEffect(() => {
    if (!userAlert.open) {
      return
    }

    setTimeout(() => {
      setUserAlert({
        ...userAlert,
        open: false
      })
    }, 4000)
  }, [setUserAlert, userAlert])

  return (
    <main>
      <MvTypography size='TITLE_MD' typeSize='PX'>Edit Address & Contact</MvTypography>
      <Breadcrumbs
        data={[
          {
            icon: 'tabler:briefcase',
            label: 'Manage User',
            path: '/core/user'
          },
          {
            icon: 'tabler:briefcase',
            label: 'Edit User',
            path: `/core/user/${router.query.id}/edit`
          },
          {
            label: 'Edit Address & Contact',
            path: `/core/auth-and-field`
          }
        ]}
      />
      <Card
        sx={{
          boxShadow: '0px 2px 6px 0px rgba(0, 0, 0, 0.25)',
          padding: '20px',
          flex: '1 1 0%',
          marginTop: '24.5px'
        }}
      >
        <CardContent style={{ padding: 0 }}>
          {!router.isReady || user.isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          ) : null}

          {user.isError ? (
            <MvTypography size='BODY_MD_NORMAL' typeSize='PX' sx={{ textAlign: 'center' }}>
              Something went wrong. Please try again later
            </MvTypography>
          ) : null}

          {user.isSuccess ? (
            <form onSubmit={form.handleSubmit(() => setIsConfirmModalOpen(true))}>

              <MvTypography size='LABEL_LG_BOLDEST' typeSize='PX' sx={{ lineHeight: '26px' }}>Address & Contact</MvTypography>
              <MvTypography size='HELPER_TEXT_MD' typeSize='PX' sx={{ letterSpacing: '.25px' }}>Edit your Address & Contact</MvTypography>
              <UserStepThree form={form} />

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
                <Button
                  variant='outlined'
                  content='textOnly'
                  text='Cancel'
                  size='large'
                  LinkComponent={NextLink}
                  href={`/core/user/${router.query.id}/edit`}
                />
                <Button
                  content='textOnly'
                  text='Save'
                  variant='contained'
                  size='large'
                  type='submit'
                  disabled={form.formState.isSubmitting}
                  loading={form.formState.isSubmitting}
                />
              </div>
            </form>
          ) : null}
        </CardContent>
      </Card>

      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        variant='warning'
        loading={updateProfile.isPending || updateProfile.isSuccess}
        positiveLabel='Yes'
        title='Are you sure you want to edit this user?'
        onOk={async () => {
          try {
            if (!user.data) {
              return
            }

            const data = form.getValues()

            await updateProfile.mutateAsync({
              ...data,
              id: user.data.data.profile.id
            })

            await queryClient.invalidateQueries()

            setUserAlert({
              title: 'Edit Successful',
              content: 'Your user was success to edited',
              color: 'success',
              icon: 'ic:baseline-check',
              pathname: '/core/user/[id]/edit',
              open: true
            })

            router.push(`/core/user/${router.query.id}/edit`)
          } catch {
            setUserAlert({
              title: 'Edit Failed',
              content: 'Your user was failed to edited',
              color: 'error',
              icon: 'ic:baseline-do-disturb',
              pathname: '/core/user/[id]/edit/auth-and-field',
              open: true
            })

            setIsConfirmModalOpen(false)

            updateProfile.reset()
          }
        }}
      />

      {userAlert.pathname === router.pathname && userAlert.open ? (
        <Box position='fixed' top='85px' right='24px'>
          <Alert
            variant='contained'
            content={userAlert.content}
            color={userAlert.color}
            title={userAlert.title}
            icon={userAlert.icon}
            onClose={() => setUserAlert({ ...userAlert, open: false })}
          />
        </Box>
      ) : null}
    </main>
  )
}
