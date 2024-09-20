import NextLink from 'next/link'
import Icon from 'src/@core/components/icon'
import { useTheme } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Image from 'next/image'
import { Button } from 'src/components/atoms/button'
import { useRouter } from 'next/router'
import { useQueryClient } from '@tanstack/react-query'
import { CircularProgress } from 'src/components/atoms/circular-progress/CircularProgress'
import Box from '@mui/material/Box'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { titleCase } from 'src/utils/general'
import { Alert } from 'src/components/atoms/alert/Alert'
import { useAtom } from 'jotai'
import { userAlertAtom } from 'src/components/complexes/user/atoms'
import InfoProfile from '@/components/complexes/user/components/InfoProfile'
import { useGetAsset, useGetUser, useUpdateCover, useUpdatePhoto } from '@/components/complexes/user'
import { Breadcrumbs } from '@/components/atoms/breadcrumbs'
import { MvTypography } from '@/components/atoms/mv-typography'
import { Modal, UploadFile } from '@/components/molecules'
import { Controller, useForm } from 'react-hook-form'
import { SchemaAuthField, SchemaFile } from '@/components/complexes/user/types/UserEditPage.type'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaFile } from '@/components/complexes/user/validations'
import { watch } from 'fs'

export default function ManageUserEditPage() {
  const theme = useTheme()
  const router = useRouter()
  const [openPhoto, setOpenPhoto] = useState(false)
  const [openCover, setOpenCover] = useState(false)
  const [loading, setLoading] = useState(false)
  const [id, setId] = useState<string[]>([])

  const coverInputRef = useRef<HTMLInputElement>(null)
  const photoInputRef = useRef<HTMLInputElement>(null)
  const queryClient = useQueryClient()

  const user = useGetUser({ id: router.query.id as string, enabled: router.isReady })

  const cover = useGetAsset({
    id: user.data?.data.profile?.cover ?? null,
    enabled: Boolean(user.data?.data.profile?.cover)
  })

  const photo = useGetAsset({
    id: user.data?.data.profile?.photo ?? null,
    enabled: Boolean(user.data?.data.profile?.photo)
  })

  const updateCover = useUpdateCover()
  const updatePhoto = useUpdatePhoto()

  const [userAlert, setUserAlert] = useAtom(userAlertAtom)

  const { reset, getValues, setValue, watch, handleSubmit, ...form } = useForm<SchemaFile>({
    resolver: yupResolver(schemaFile),
  })

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

  const onSubmitPhoto = (type: string) => {
    setLoading(true)
    if (type === 'photo') {
      const formData = axios.toFormData({ file: watch('file') })
      updatePhoto.mutate(
        {
          file: formData,
          userId: router.query.id as string,
          profileId: user?.data?.data?.profile?.id,
          idPhoto: id[0]
        },
        {
          async onSuccess() {
            setOpenPhoto(false)
            await queryClient.invalidateQueries()
          }
        }
      )
    } else {
      const formData = axios.toFormData({ file: watch('file') })
      updateCover.mutate(
        {
          file: formData,
          userId: router.query.id as string,
          profileId: user?.data?.data?.profile?.id,
          idPhoto: id[0]
        },
        {
          async onSuccess() {
            setOpenCover(false)
            await queryClient.invalidateQueries()
          }
        }
      )
    }
    setLoading(false)
  }

  return (
    <main>
      <MvTypography size='TITLE_MD' typeSize='PX'>Edit User</MvTypography>
      <Breadcrumbs
        data={[
          {
            icon: 'tabler:briefcase',
            label: 'Manage User',
            path: '/core/user'
          },
          {
            label: 'Edit User',
            path: '/core/user/edit'
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
        <CardContent style={{ display: 'flex', flexDirection: 'column', rowGap: '20px', padding: 0 }}>
          {!router.isReady || user.isInitialLoading || cover.isInitialLoading || photo.isInitialLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          ) : null}

          {user.isError || cover.isError || photo.isError ? (
            <MvTypography size='BODY_MD_NORMAL' typeSize='PX' sx={{ textAlign: 'center' }}>
              Something went wrong. Please try again later
            </MvTypography>
          ) : null}

          {user.isSuccess ? (
            <>
              <div
                style={{
                  backgroundColor: theme.palette.grey[100],
                  borderRadius: '6px',
                  overflow: 'hidden',
                  position: 'relative',
                  height: '328px'
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '250px',
                    position: 'relative'
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: cover.data ? undefined : 'rgba(0, 94, 255, .16)'
                    }}
                  >
                    {cover.data ? (
                      <Image src={cover.data} alt='Header photo' fill style={{ objectFit: 'cover' }} />
                    ) : null}
                  </div>

                  <Button
                    type='button'
                    variant='contained'
                    content='iconText'
                    text='Edit Header'
                    icon='mdi:pencil-outline'
                    color='primary'
                    style={{ position: 'absolute', bottom: '20px', right: '20px' }}
                    onClick={() => setOpenCover(true)}
                  />
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
                      position: 'relative'
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '9999px',
                        overflow: 'hidden',
                        position: 'relative',
                        ...(photo.data
                          ? {}
                          : {
                            backgroundColor: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          })
                      }}
                    >
                      {photo.data ? (
                        <Image src={photo.data} alt='Profile photo' fill style={{ objectFit: 'cover' }} />
                      ) : (
                        <Icon icon='mdi:account-outline' color='#005EFF' fontSize='48px' />
                      )}
                    </div>
                    <Button
                      type='button'
                      variant='contained'
                      content='iconOnly'
                      icon='mdi:pencil-outline'
                      color='primary'
                      style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        padding: '6.591px',
                        borderRadius: '9999px',
                        minWidth: 'auto'
                      }}
                      onClick={() => setOpenPhoto(true)}
                    />
                  </div>
                  <div style={{ alignSelf: 'flex-end' }}>
                    <MvTypography size="LABEL_LG_BOLDEST" typeSize="PX">
                      {user.data.data.profile?.full_name ?? '-'}
                    </MvTypography>
                    <div style={{ display: 'flex', alignItems: 'center', columnGap: '13px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', columnGap: '5px', marginTop: '5px' }}>
                        <Icon icon='mdi:email-outline' color='#5D5E61' fontSize='20px' />
                        <MvTypography size="BODY_SM_NORMAL" typeSize='PX'>
                          {user.data.data.email}
                        </MvTypography>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', columnGap: '5px', marginTop: '5px' }}>
                        <Icon icon='mdi:map-marker-outline' color='#5D5E61' fontSize='20px' />
                        <MvTypography size="BODY_SM_NORMAL" typeSize='PX'>
                          {user.data.data.profile?.address ?? '-'}
                        </MvTypography>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <InfoProfile
                title="Personal Data"
                renderEditButton={
                  <Button
                    variant='plain'
                    content='iconText'
                    text='Edit'
                    icon='mdi:pencil-outline'
                    LinkComponent={NextLink}
                    href={`/core/user/${router.query.id}/edit/personal-data`}
                  />
                }
                fields={[
                  { label: 'Email', value: user.data.data.email },
                  { label: 'ID Number', value: user.data.data.profile?.id_number ?? '-' },
                  { label: 'First Name', value: user.data.data.profile?.first_name ?? '-' },
                  { label: 'Last Name', value: user.data.data.profile?.last_name ?? '-' },
                  { label: 'Gender', value: user.data.data.profile?.gender ? titleCase(user.data.data.profile.gender) : '-' },
                  { label: 'Religion', value: user.data.data.profile?.religion ? titleCase(user.data.data.profile.religion.replaceAll('_', ' ')) : '-' },
                ]}
              />

              <InfoProfile
                title="Job Profile"
                renderEditButton={
                  <Button
                    variant='plain'
                    content='iconText'
                    text='Edit'
                    icon='mdi:pencil-outline'
                    LinkComponent={NextLink}
                    href={`/core/user/${router.query.id}/edit/auth-and-field`}
                  />
                }
                fields={[
                  { label: 'Roles', value: user.data.data.privileges.map(privilege => privilege.role.name).join(', ') },
                  { label: 'Work Center', value: user.data.data.werk?.name ?? '-' },
                  { label: 'Department', value: user.data.data.sto?.name ?? '-' },
                  { label: 'Job Function', value: user.data.data.job_function?.name ?? '-' },
                  { label: 'Job Level', value: user.data.data.job_function?.job_level?.name ?? '-' },
                  { label: 'Job Title', value: user.data.data.job_title ?? '-' },
                ]}
              />


              <InfoProfile
                title="Address & Contact"
                renderEditButton={
                  <Button
                    variant='plain'
                    content='iconText'
                    text='Edit'
                    icon='mdi:pencil-outline'
                    LinkComponent={NextLink}
                    href={`/core/user/${router.query.id}/edit/address-and-contact`}
                  />
                }
                fields={[
                  { label: 'Address', value: user.data.data.profile?.address ?? '-' },
                  { label: 'Phone', value: user.data.data.profile?.phone ?? '-' },
                  { label: 'Postal Code', value: user.data.data.profile?.post_code ?? '-' },
                ]}
              />

            </>
          ) : null}
        </CardContent>
      </Card>

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

      {/* Modal Photo */}
      <Modal
        isOpen={openPhoto}
        closeable={true}
        onClose={() => setOpenPhoto(prev => !prev)}
        title='Choose photo from your gallery'
        description='A good photo profile will help you stand out.'
        renderAction={false}
      >
        <form style={{ marginTop: 10 }} onSubmit={handleSubmit(() => onSubmitPhoto('photo'))}>
          <Controller
            name="file"
            control={form.control}
            render={({ field: { onChange, ref } }) => (
              <UploadFile
                {...ref}
                onChange={(event: any) => {
                  const files = event.target.files;
                  if (files && files.length > 0) {
                    onChange(files[0]);
                  }
                }}
                variant='single'
                type="dragndrop"
                setId={setId}
              />
            )}
          />

          <Box sx={{ display: 'flex', justifyContent: 'end', gap: 3, marginTop: 5 }}>
            <Button
              content='textOnly'
              variant='outlined'
              text='Cancel'
            />
            <Button
              type="submit"
              content='textOnly'
              text='Submit'
            />
          </Box>


        </form>
      </Modal>
      {/* Modal Cover */}
      <Modal
        isOpen={openCover}
        onClose={() => setOpenCover(prev => !prev)}
        title='Choose photo from your gallery'
        description='A good photo profile will help you stand out.'
        renderAction={false}
      >
        <form style={{ marginTop: 10 }} onSubmit={handleSubmit(() => onSubmitPhoto('cover'))}>
          <Controller
            name="file"
            control={form.control}
            render={({ field: { onChange, ref } }) => (
              <UploadFile
                {...ref}
                onChange={(event: any) => {
                  const files = event.target.files;
                  if (files && files.length > 0) {
                    onChange(files[0]);
                  }
                }}
                variant='single'
                type="dragndrop"
                setId={setId}
              />
            )}
          />

          <Box sx={{ display: 'flex', justifyContent: 'end', gap: 3, marginTop: 3 }}>
            <Button
              content='textOnly'
              variant='outlined'
              text='Cancel'
            />
            <Button
              type="submit"
              content='textOnly'
              variant='outlined'
              text='Submit'
            />
          </Box>


        </form>
      </Modal>
    </main >
  )
}
