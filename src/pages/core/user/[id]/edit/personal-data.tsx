import NextLink from 'next/link'
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
import { useGetPersonalData } from 'src/service/user/edit/personal-data/useGetPersonalData'
import { useAtom } from 'jotai/index'
import { Alert } from 'src/components/atoms/alert/Alert'
import { userAlertAtom } from 'src/components/complexes/user/atoms'
import { Modal } from 'src/components/atoms/modal/Modal'
import client from 'src/client'
import { UserStepTwo } from '@/components/complexes/user/components/UserStepTwo'
import { GENDERS, RELIGIONS } from '@/components/complexes/user/constants/ManageUserPage.constants'
import { schemaPersonalData } from '@/components/complexes/user/validations'
import { SchemaPersonalData } from '@/components/complexes/user/types/UserEditPage.type'
import { useUpdatePersonalData } from '@/components/complexes/user/service/actionUpdateUser.service'
import { Breadcrumbs } from '@/components/atoms/breadcrumbs'
import { MvTypography } from '@/components/atoms/mv-typography'

export default function ManageUserPersonalDataEdit() {
  const theme = useTheme()
  const router = useRouter()

  const form = useForm<SchemaPersonalData>({
    resolver: yupResolver(schemaPersonalData)
  })

  const user = useGetPersonalData({ id: router.query.id as string, enabled: router.isReady })
  const updatePersonalData = useUpdatePersonalData()

  useEffect(() => {
    if (user.isSuccess) {
      form.reset({
        id_number: user.data.data.profile?.id_number,
        first_name: user.data.data.profile?.first_name,
        last_name: user.data.data.profile?.last_name,
        gender: GENDERS.find(gender => gender.label?.toLowerCase() === user.data.data.profile?.gender?.toLowerCase()) || undefined,
        religion: RELIGIONS.find(religion => religion.id === user.data.data.profile?.religion) || undefined,
        email: user.data.data.email
      })
    }
  }, [
    user.isSuccess,
    form,
    user.data?.data.profile?.first_name,
    user.data?.data.profile?.id_number,
    user.data?.data.profile?.last_name,
    user.data?.data.profile?.gender,
    user.data?.data.profile?.religion,
    user.data?.data.email
  ])

  const queryClient = useQueryClient()

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
      <MvTypography size='TITLE_MD' typeSize='PX'>Edit Personal Data</MvTypography>

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
            label: 'Edit Personal Data',
            path: `/core/personal-data`
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
            <form
              onSubmit={form.handleSubmit(async data => {
                const response = await client.api.get('/users', {
                  params: {
                    filter: {
                      profile: {
                        id_number: {
                          _eq: data.id_number
                        }
                      },
                      id: {
                        _neq: router.query.id
                      }
                    }
                  }
                })

                if (response.data.data.length) {
                  form.setError('id_number', {
                    type: 'manual',
                    message: 'ID Number already exists'
                  })

                  return
                }

                setIsConfirmModalOpen(true)
              })}
            >
              <MvTypography size='LABEL_LG_BOLDEST' typeSize='PX'>Personal Data</MvTypography>
              <MvTypography size='HELPER_TEXT_MD' typeSize='PX' >Edit your Personal Data</MvTypography>

              <UserStepTwo
                form={form}
                genders={GENDERS}
                religions={RELIGIONS}
                pages='edit'
              />

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
                  variant='contained'
                  content='textOnly'
                  text='Save'
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
        loading={updatePersonalData.isPending || updatePersonalData.isPending}
        positiveLabel='Yes'
        title='Are you sure you want to edit this user?'
        onOk={async () => {
          try {
            if (!user.data) {
              return
            }

            const data = form.getValues()

            await updatePersonalData.mutateAsync({
              ...data,
              id: user.data.data.profile.id,
              gender: data.gender.id,
              religion: data.religion.id,
              email: data.email
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

            updatePersonalData.reset()
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
