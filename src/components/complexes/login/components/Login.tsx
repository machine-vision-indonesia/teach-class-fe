// ** React Imports
import { useState } from 'react'

import Box from '@mui/material/Box'

// ** MUI Components
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Component
import Image from 'next/image'
import { Alert } from 'src/components/atoms/alert/Alert'
import { MvTypography } from '@/components/atoms/mv-typography'
import { Modal } from '@/components/molecules'
import FormLogin from './FormLogin'

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState<string>()

  const [hasLogged, setHasLogged] = useState(false)


  // ** Hooks
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))


  return (
    <>
      <div style={{ display: 'flex', height: '100vh', width: '100%' }}>
        <div
          style={{
            flexBasis: '50%',
            backgroundColor: theme.colorToken.background.primary.normal,
            display: 'flex',
            alignItems: 'center',
            borderRadius: '0px 30px 30px 0px'
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <MvTypography
              size="TITLE_LG"
              typeSize="PX"
              color={theme.colorToken.text.neutral.inverted}
              marginLeft='79px'
              marginRight='79px'
              mb={2}
            >
              Lorem Ipsum
            </MvTypography>
            <MvTypography
              size="HELPER_TEXT_MD"
              typeSize="PX"
              color={theme.colorToken.text.neutral.inverted}
              marginLeft='79px'
              marginRight='79px'
              mb={2}
              lineHeight={1.385}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
            </MvTypography>
            <Box display='flex' justifyContent='center'>
              {!hidden ? (
                <Image src='/images/login-banner-mv.png' alt='Login illustration' width='542' height='347' />
              ) : null}
            </Box>
          </Box>
        </div>
        <div style={{ flexBasis: '50%', display: 'flex', alignItems: 'center', position: 'relative' }}>
          <Box sx={{ width: '100%', maxWidth: 500, margin: 'auto' }}>
            <Box>
              <MvTypography
                size="TITLE_MD"
                typeSize="PX"
                mb={2}
              >
                Hello Again!
              </MvTypography>

              <MvTypography
                size="BODY_SM_NORMAL"
                typeSize="PX"
                mb={5}
              >
                Welcome back
              </MvTypography>

            </Box>
            {errorMessage ? (
              <div style={{ marginBottom: '1rem' }}>
                <Alert
                  title={errorMessage}
                  variant='contained'
                  color='error'
                  icon='tabler:exclamation-mark'
                  onClose={() => setErrorMessage(undefined)}
                />
              </div>
            ) : null}
            <FormLogin
              setErrorMessage={setErrorMessage}
            />
            <Box display='flex' justifyContent='center' position='absolute'>
              <Image
                src='/images/machine-vision-credit.png'
                alt='MES logo'
                width='200'
                height='60'
                style={{ height: '100%', alignItems: 'center', marginTop: '60px', marginLeft: '150px' }}
              />
            </Box>
          </Box>
        </div>
      </div>

      {/* Modal Has Logged */}
      <Modal
        isOpen={hasLogged}
        onClose={() => setHasLogged(prev => !prev)}
        positiveLabel='Yes'
        negativeLabel='No'
        color='warning'
        closeable={true}
        position='center'
      >
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <MvTypography size="LABEL_MD_BOLDEST" typeSize='PX' sx={{ mb: 3 }}>
            User has logged in on another device
          </MvTypography>
          <MvTypography size="LABEL_MD_NORMAL" typeSize='PX'>Do you want to log out of other devices?</MvTypography>
        </Box>
      </Modal>
      {/* End Modal Has Logged */}
    </>
  )
}

export default LoginPage
