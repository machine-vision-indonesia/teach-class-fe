import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import NextLink from 'next/link'
import { useTheme } from '@mui/material/styles'
import { useEffect } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Icon from 'src/@core/components/icon'
import { useRouter } from 'next/router'
import { useAtom } from 'jotai'
import { userAlertAtom } from 'src/components/complexes/user/atoms'
import { Alert } from 'src/components/atoms/alert/Alert'
import { MvTypography } from '@/components/atoms/mv-typography'
import AddUserFormStepper from '@/components/complexes/user/components/AddUserFormStepper'

export default function AddUserPage() {
  const theme = useTheme()

  const router = useRouter()

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
    <>
      <main>
        <MvTypography size='TITLE_MD' typeSize='PX'>Add User</MvTypography>
        {/* <MvTypography size='TITLE_XL' typeSize='PX'>Add User</MvTypography> */}
        <Breadcrumbs
          aria-label='breadcrumb'
          sx={{ mt: '8px' }}
          separator={<Icon icon='mdi:chevron-right' color='#909094' />}
        >
          <Link component={NextLink} href='/'>
            <Icon icon='mdi:home-outline' style={{ color: theme.palette.primary.main }} fontSize='20px' />
          </Link>
          <Link component={NextLink} href='/core/user'>
            <MvTypography size='BODY_MD_BOLDEST' typeSize='PX' color={theme.colorToken.text.primary.inverted}>Manage User</MvTypography>
          </Link>
          <MvTypography size='BODY_MD_BOLDEST' typeSize='PX' color={theme.colorToken.text.primary.normal}>Add User</MvTypography>

        </Breadcrumbs>
        <Card
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            marginTop: '24.5px',
            boxShadow: '0px 2px 6px 0px rgba(0, 0,x 0, 0.25)',
            padding: '20px'
          }}
        >
          <AddUserFormStepper />
        </Card>
      </main>

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
    </>
  )
}
