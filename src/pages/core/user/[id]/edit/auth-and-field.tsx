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
import client from 'src/client'
import Box from '@mui/material/Box'
import { CircularProgress } from 'src/components/atoms/circular-progress/CircularProgress'
import { useEffect, useState } from 'react'
import { Alert } from 'src/components/atoms/alert/Alert'
import { userAlertAtom } from 'src/components/complexes/user/atoms'
import { useAtom } from 'jotai'
import { Modal } from 'src/components/atoms/modal/Modal'
import { UserStepOne } from '@/components/complexes/user/components/UserStepOne'
import { SchemaAuthField } from '@/components/complexes/user/types/UserEditPage.type'
import { schemaAuthField } from '@/components/complexes/user/validations'
import { useGetJobFunctions, useGetRoles, useGetWorkCenters, useListDepartment, usePostEditAuthFieldMutation, useUserQuery } from '@/components/complexes/user'
import { MvTypography } from '@/components/atoms/mv-typography'
import { Breadcrumbs } from '@/components/atoms/breadcrumbs'

export default function ManageUserAuthAndFieldEdit() {
  const theme = useTheme()
  const router = useRouter()

  const { reset, getValues, setValue, ...form } = useForm<SchemaAuthField>({
    resolver: yupResolver(schemaAuthField),
    defaultValues: {
      roles: []
    }
  })

  const watchDepartment = form.watch('department')
  const watchJobFunction = form.watch('job_function')

  useEffect(() => {
    const newJobLevel = watchJobFunction ? watchJobFunction?.job_level?.name : ''
    setValue('job_level', newJobLevel)
  }, [getValues, reset, watchJobFunction, setValue])

  useEffect(() => {
    const newJobTitle =
      watchDepartment && watchJobFunction
        ? `${watchDepartment.label || ''} - ${watchJobFunction.label || ''} - ${watchJobFunction?.job_level?.name || ''
        }`
        : ''
    setValue('job_title', newJobTitle)
  }, [setValue, watchDepartment, watchJobFunction])


  const workCenters = useGetWorkCenters()
  const jobFunctions = useGetJobFunctions()
  const departmentsQuery = useListDepartment()
  const rolesQuery = useGetRoles()
  const userQuery = useUserQuery()
  const updateMutation = usePostEditAuthFieldMutation()


  const departmentOptions =
    departmentsQuery.data?.data.map(department => ({
      id: department.id,
      label: department.name
    })) ?? []


  const jobFunctionOptions =
    jobFunctions.data?.data.map(jobFunction => ({
      id: jobFunction.id,
      label: jobFunction.name,
      job_level: jobFunction.job_level
    })) ?? []

  const roleOptions =
    rolesQuery.data?.data.map(role => ({
      id: role.id,
      label: role.name
    })) ?? []


  useEffect(() => {
    if (userQuery.isSuccess) {
      reset({
        email: userQuery.data?.data.email,
        roles: userQuery.data?.data.privileges.map(privilege => ({
          id: privilege.role.id,
          label: privilege.role.name
        })),
        work_center: {
          id: userQuery.data?.data?.werk?.id,
          label: userQuery.data?.data?.werk?.name
        },
        department: {
          id: userQuery.data?.data?.sto?.id,
          label: userQuery.data?.data?.sto?.name
        },
        job_function: {
          id: userQuery.data?.data?.job_function?.id,
          label: userQuery.data?.data?.job_function?.name,
          job_level: userQuery.data?.data?.job_function?.job_level
        },
        job_level: userQuery.data?.data?.job_function?.job_level.name,
        job_title: userQuery.data?.data.job_title
      })
    }
  }, [
    reset,
    userQuery.data?.data.email,
    userQuery.data?.data?.job_function?.id,
    userQuery.data?.data?.job_function?.job_level,
    userQuery.data?.data?.job_function?.name,
    userQuery.data?.data.job_title,
    userQuery.data?.data.privileges,
    userQuery.data?.data?.sto?.id,
    userQuery.data?.data?.sto?.name,
    userQuery.data?.data?.werk?.id,
    userQuery.data?.data?.werk?.name,
    userQuery.isSuccess
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
      <MvTypography size='TITLE_MD' typeSize='PX'>Edit Auth & Field</MvTypography>
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
            label: 'Edit Auth & Field',
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
          {userQuery.isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          ) : null}

          {userQuery.isError ? (
            <MvTypography size='BODY_MD_NORMAL' typeSize='PX' sx={{ textAlign: 'center' }}>
              Something went wrong. Please try again later
            </MvTypography>
          ) : null}

          {userQuery.isSuccess ? (
            <form
              onSubmit={form.handleSubmit(async data => {
                const response = await client.api.get('/users', {
                  params: {
                    filter: {
                      email: {
                        _eq: data.email
                      },
                      id: {
                        _neq: router.query.id
                      }
                    }
                  }
                })

                if (response.data.data.length) {
                  form.setError('email', {
                    type: 'manual',
                    message: 'Email already exists'
                  })

                  return
                }

                setIsConfirmModalOpen(true)
              })}
            >
              <MvTypography size='LABEL_LG_BOLDEST' typeSize='PX' sx={{ lineHeight: '26px' }}>Auth & Field</MvTypography>
              <MvTypography size='HELPER_TEXT_MD' typeSize='PX' sx={{ letterSpacing: '.25px' }}>Edit your Auth & Field</MvTypography>

              <UserStepOne
                pages="edit"
                form={form}
                roleOptions={roleOptions}
                workCenters={workCenters}
                departmentOptions={departmentOptions}
                jobFunctionOptions={jobFunctionOptions}
                watchDepartment={watchDepartment}
                watchJobFunction={watchJobFunction}
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
                >
                  {form.formState.isSubmitting ? <CircularProgress size={30} /> : 'Save'}
                </Button>
              </div>
            </form>
          ) : null}
        </CardContent>
      </Card>

      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        variant='warning'
        loading={updateMutation.isPending || updateMutation.isSuccess}
        positiveLabel='Yes'
        title='Are you sure you want to edit this user?'
        onOk={async () => {
          try {
            const data = getValues()

            await updateMutation.mutateAsync({
              email: data?.email,
              currentPrivilegeIds: userQuery.data?.data?.privileges.map(privilege => privilege.id) ?? [],
              roleIds: data?.roles.map(role => role.id),
              werk: data?.work_center?.id,
              sto: data?.department?.id,
              job_function: data?.job_function?.id,
              job_title: data.job_title
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

            updateMutation.reset()
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
