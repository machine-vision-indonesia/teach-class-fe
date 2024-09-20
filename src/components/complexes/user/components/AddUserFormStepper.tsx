import { useTheme } from '@mui/material/styles'
import { useEffect, useState, type MouseEventHandler } from 'react'
import Divider from '@mui/material/Divider'
import CardContent from '@mui/material/CardContent'
import { useForm } from 'react-hook-form'
import client from 'src/client'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from 'src/components/atoms/button'
import { useRouter } from 'next/router'
import { queryClient } from 'src/pages/_app'
import { Modal } from 'src/components/atoms/modal/Modal'
import { useAtom } from 'jotai'
import { userAlertAtom } from 'src/components/complexes/user/atoms'
import { MvTypography } from '@/components/atoms/mv-typography'
import { Stepper } from '@/components/molecules'
import { UserStepOne } from './UserStepOne'
import { UserStepTwo } from './UserStepTwo'
import { UserStepThree } from './UserStepThree'
import { UserStepFour } from './UserStepFor'
import { UserStepFive } from './UserStepFive'
import { schemaAddUser } from '../validations'
import { GENDERS, RELIGIONS } from '../constants/ManageUserPage.constants'
import { SchemaAddUser } from '../types/ManageUserPage.types'
import { usePostUser } from '../service/actionAddUser.service'
import { useGetJobFunctions, useGetRoles, useGetWorkCenters } from '../service/fetchUser.service'
import { useListDepartment } from '../service/fetchDetailUser.service'

export default function AddUserFormStepper() {
  const theme = useTheme()
  const [activeStep, setActiveStep] = useState(0)
  const { reset, getValues, setValue, ...form } = useForm<SchemaAddUser>({
    resolver: yupResolver(schemaAddUser),
    mode: 'onBlur',
    reValidateMode: 'onBlur'
  })

  const watchCover = form.watch('cover')
  const coverPreviewString = watchCover ? URL.createObjectURL(new Blob([watchCover], { type: watchCover.type })) : null

  useEffect(() => {
    return () => {
      if (coverPreviewString) {
        URL.revokeObjectURL(coverPreviewString)
      }
    }
  }, [coverPreviewString])

  const watchPhoto = form.watch('photo')
  const photoPreviewString = watchPhoto ? URL.createObjectURL(new Blob([watchPhoto], { type: watchPhoto.type })) : null

  useEffect(() => {
    return () => {
      if (photoPreviewString) {
        URL.revokeObjectURL(photoPreviewString)
      }
    }
  }, [photoPreviewString])

  const watchFirstName = form.watch('first_name')
  const watchLastName = form.watch('last_name')
  const fullName = watchFirstName + ' ' + watchLastName

  const watchEmail = form.watch('email')
  const watchAddress = form.watch('address')
  const watchRoles = form.watch('roles')
  const watchWorkCenter = form.watch('work_center')
  const watchDepartment = form.watch('department')
  const watchJobFunction = form.watch('job_function')
  const watchJobLevel = form.watch('job_level')
  const watchJobTitle = form.watch('job_title')

  useEffect(() => {
    const newJobLevel = watchJobFunction ? watchJobFunction.job_level.name : ''
    setValue('job_level', newJobLevel)
  }, [getValues, reset, watchJobFunction, setValue])

  useEffect(() => {
    const newJobTitle =
      watchDepartment && watchJobFunction
        ? `${watchDepartment.label} - ${watchJobFunction.label} - ${watchJobFunction.job_level.name}`
        : ''

    setValue('job_title', newJobTitle)
  }, [getValues, reset, watchDepartment, watchJobFunction, setValue])

  const watchIdNumber = form.watch('id_number')
  const watchGenderLabel = form.watch('gender.label')
  const watchReligionLabel = form.watch('religion.label')
  const watchPhone = form.watch('phone')
  const watchPostCode = form.watch('post_code')

  // Services
  const rolesQuery = useGetRoles()
  const workCenters = useGetWorkCenters()
  const jobFunctions = useGetJobFunctions()
  const departmentsQuery = useListDepartment()
  const roleOptions =
    rolesQuery.data?.data.map(role => ({
      id: role.id,
      label: role.name
    })) ?? []

  const jobFunctionOptions =
    jobFunctions.data?.data.map(jobFunction => ({
      id: jobFunction.id,
      label: jobFunction.name,
      job_level: jobFunction.job_level
    })) ?? []


  const departmentOptions =
    departmentsQuery.data?.data.map(department => ({
      id: department.id,
      label: department.name
    })) ?? []

  const [isLoadingNext, setIsLoadingNext] = useState(false)

  const onNextClick: MouseEventHandler<HTMLButtonElement> = async e => {
    e.preventDefault()
    let isValid = false

    if (activeStep === 0) {
      isValid = await form.trigger([
        'email',
        'password',
        'confirm_password',
        'roles',
        'work_center',
        'department',
        'job_function',
        'job_level',
        'job_title'
      ])

      if (isValid) {
        setIsLoadingNext(true)

        const email = getValues('email')
        const response = await client.api.get('/users', {
          params: {
            filter: {
              email: {
                _eq: email
              }
            }
          }
        })

        if (response.data.data.length) {
          form.setError('email', {
            type: 'manual',
            message: 'Email already exists'
          })

          isValid = false
        }

        setIsLoadingNext(false)
      }
    }

    if (activeStep === 1) {
      isValid = await form.trigger(['id_number', 'first_name', 'last_name', 'gender', 'religion'])

      if (isValid) {
        setIsLoadingNext(true)

        const idNumber = getValues('id_number')
        const response = await client.api.get('/users', {
          params: {
            filter: {
              profile: {
                id_number: {
                  _eq: idNumber
                }
              }
            }
          }
        })

        if (response.data.data.length) {
          form.setError('id_number', {
            type: 'manual',
            message: 'ID Number already exists'
          })

          isValid = false
        }

        setIsLoadingNext(false)
      }
    }

    if (activeStep === 2) {
      isValid = await form.trigger(['address', 'phone', 'post_code'])
    }

    if (activeStep === 3) {
      isValid = await form.trigger(['photo', 'cover'])
    }

    if (isValid) {
      setActiveStep(prev => prev + 1)
    }
  }

  const createUserMutation = usePostUser()

  const router = useRouter()

  const [userAlert, setUserAlert] = useAtom(userAlertAtom)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

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

  const STEPS = [
    {
      active: activeStep === 0,
      label: '1',
      passed: activeStep > 0,
      subtitle: 'Enter your Auth & Field',
      title: 'Auth & Field'
    },
    {
      active: activeStep === 1,
      label: '2',
      passed: activeStep > 1,
      subtitle: 'Enter your Personal Data',
      title: 'Personal Data'
    },
    {
      active: activeStep === 2,
      label: '3',
      passed: activeStep > 2,
      subtitle: 'Enter your Address & Contact',
      title: 'Address & Contact'
    },
    {
      active: activeStep === 3,
      label: '4',
      passed: activeStep > 3,
      subtitle: 'Upload your Profile Photo',
      title: 'Profile Photo'
    },
    {
      active: activeStep === 4,
      label: '5',
      passed: activeStep > 4,
      subtitle: 'Review your data',
      title: 'Review Data'
    },
  ]

  return (
    <>
      <CardContent sx={{ padding: 0, flexShrink: 0 }}>
        <Stepper
          data={STEPS}
          orientation="vertical"
          size="small"
        />
      </CardContent>
      <Divider flexItem orientation='vertical' sx={{ borderColor: theme.colorToken.border.neutral.normal, mx: '24px' }} />
      <CardContent sx={{ width: '100%', padding: 0 }}>
        <form onSubmit={form.handleSubmit(() => setIsConfirmModalOpen(true))}>
          <MvTypography size="TITLE_SM" typeSize='PX'>{STEPS[activeStep].title}</MvTypography>
          <MvTypography size="BODY_SM_NORMAL" typeSize='PX'>{STEPS[activeStep]?.subtitle}</MvTypography>
          {activeStep === 0 ?
            <UserStepOne
              pages="add"
              form={form}
              roleOptions={roleOptions}
              workCenters={workCenters}
              departmentOptions={departmentOptions}
              jobFunctionOptions={jobFunctionOptions}
              watchDepartment={watchDepartment}
              watchJobFunction={watchJobFunction}
            /> : null}

          {activeStep === 1 ? (
            <UserStepTwo
              form={form}
              genders={GENDERS}
              religions={RELIGIONS}
            />
          ) : null}

          {activeStep === 2 ? <UserStepThree form={form} /> : null}

          {activeStep === 3 ? <UserStepFour form={form} /> : null}

          {activeStep === 4 ? (
            <UserStepFive
              fullName={fullName}
              watchDepartment={watchDepartment}
              watchEmail={watchEmail}
              watchFirstName={watchFirstName}
              watchGenderLabel={watchGenderLabel}
              watchIdNumber={watchIdNumber}
              watchJobFunction={watchJobFunction}
              watchJobLevel={watchJobLevel}
              watchJobTitle={watchJobTitle}
              watchLastName={watchLastName}
              watchReligionLabel={watchReligionLabel}
              watchRoles={watchRoles}
              watchWorkCenter={watchWorkCenter}
              coverPreviewString={coverPreviewString}
              photoPreviewString={photoPreviewString}
              watchAddress={watchAddress}
              watchPhone={watchPhone}
              watchPostCode={watchPostCode}
            />
          ) : null}

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '3rem',
              flexDirection: activeStep === 0 ? 'row-reverse' : undefined
            }}
          >
            {activeStep !== 0 ? (
              <Button
                content='textOnly'
                text='Back'
                onClick={() => setActiveStep(prev => prev - 1)}
                variant='outlined'
                size='large'
              />
            ) : null}

            <Button
              variant='contained'
              content='textOnly'
              text={activeStep === STEPS.length - 1 ? 'Submit' : 'Next'}
              size='large'
              disabled={isLoadingNext}
              loading={isLoadingNext}
              {...(activeStep === 4 ? { type: 'submit' } : { type: 'button', onClick: onNextClick })}
            />
          </div>
        </form>
      </CardContent>


      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        variant='warning'
        loading={createUserMutation.isPending || createUserMutation.isSuccess}
        positiveLabel='Yes'
        title='Are you sure you want to create this user?'
        onOk={async () => {
          try {
            await createUserMutation.mutateAsync(getValues())
            await queryClient.invalidateQueries()

            setUserAlert({
              title: 'Submit Successful',
              content: 'Your user was success to submitted',
              color: 'success',
              icon: 'ic:baseline-check',
              pathname: '/core/user',
              open: true
            })

            router.push('/core/user')
          } catch {
            setUserAlert({
              title: 'Submit Failed',
              content: 'Your user was failed to submitted',
              color: 'error',
              icon: 'ic:baseline-do-disturb',
              pathname: '/core/user/add',
              open: true
            })

            setIsConfirmModalOpen(false)

            createUserMutation.reset()
          }
        }}
      />

    </>
  )
}
