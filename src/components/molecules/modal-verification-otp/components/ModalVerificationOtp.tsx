// React and Hooks
import React, { FC, useCallback, useState } from 'react';

// Components
import { Modal } from '@/components/molecules';
import { MvTypography } from '@/components/atoms/mv-typography';
import { Badge } from '@/components/atoms/badge';
import { OTP } from '@/components/atoms/otp/components/Otp';
import { CircularProgress } from '@/components/atoms/circular-progress/CircularProgress';
import { QRCode } from './QrCode';

// MUI Components
import { Box, Divider, useTheme } from '@mui/material';

// External Libraries
import { Icon } from '@iconify/react/dist/iconify.js';

// Services
import { actionPostDisableOtp, actionPostEnableOtp, actionPostLoginOtp } from '../services/actionPostOtp.service';

// Routing and Configuration
import { useRouter } from 'next/navigation';
import authConfig from 'src/configs/auth';

// Types and Utilities
import { IAlert, IEnableOtp, IModalVerification } from '../types/ModalVerificationOtp';
import { removeTFAToken } from '../utils';
import { Toast } from '@/components/atoms/toast';

const ModalVerificationOtp: FC<IModalVerification> = ({
  isVerifiedCode,
  open,
  setOpen,
  email,
  valueQrCode,
  secret,
  password,
  isLoggedIn = false,
  isDisableTfa,
}) => {
  const theme = useTheme();
  const router = useRouter();
  const [otp, setOtp] = useState('');

  // @todo: if needed for future flow
  // const [timeDuration, setTimeDuration] = useState(60); // Initial countdown duration in seconds
  // const [countdownText, setCountdownText] = useState(formatTime(timeDuration));

  const [alert, setAlert] = useState<IAlert>({
    content: '',
    color: 'success',
    title: '',
    icon: '',
    open: false,
  })
  const [loading, setLoading] = useState(false);

  // @todo: if needed for future flow
  // useEffect(() => {
  //   if (open) {
  //     // Set up a timer to count down every second
  //     const intervalId = setInterval(() => {
  //       setTimeDuration(prev => {
  //         const newTimeDuration = prev - 1;
  //         const formattedTime = newTimeDuration > 0 ? formatTime(newTimeDuration) : '00:00';
  //         setCountdownText(formattedTime);

  //         // Clear interval when countdown reaches 0
  //         if (newTimeDuration <= 0) {
  //           clearInterval(intervalId);
  //         }

  //         return newTimeDuration;
  //       });
  //     }, 1000);

  //     // Cleanup interval on component unmount
  //     return () => clearInterval(intervalId);
  //   }
  // }, [open]);


  const createOtpPayload = (otp: string, secret: string) => ({
    otp,
    secret,
  });

  const enhancePayloadForLogin = (payload: IEnableOtp, email: string, password: string) => ({
    ...payload,
    mode: 'json',
    email,
    password,
  });


  const onSubmitOtp = useCallback(async () => {
    setLoading(true)
    if (!isDisableTfa) {
      try {
        const otpPayload = createOtpPayload(otp, secret);
        const loginPayload = enhancePayloadForLogin(otpPayload, email, password);
        const verifiedPayload = {
          otp,
          mode: 'json',
          email,
          password,
        }
        if (isVerifiedCode) {
          console.log('verified...')
          const response = await actionPostLoginOtp(verifiedPayload);
          if (!isLoggedIn) {
            localStorage.setItem(authConfig.accessTokenKeyName, response.data.data.access_token)
            localStorage.setItem(authConfig.refreshTokenKeyName, response.data.data.refresh_token)
            router.push('/')
            removeTFAToken()
          } else {
            setOpen(false)
            setOtp('')
          }
        } else {
          const response = await actionPostEnableOtp(otpPayload);
          if (response.status === 200) {
            setOtp('')
            if (!isLoggedIn) {
              router.push('/')
              localStorage.setItem(authConfig.accessTokenKeyName, response.data.data.access_token)
              localStorage.setItem(authConfig.refreshTokenKeyName, response.data.data.refresh_token)
              removeTFAToken()
            } else {
              setOpen(false)
            }
          }
          if (response.status === 204) {
            setOtp('')
            if (!isLoggedIn) {
              const responseData = await actionPostLoginOtp(loginPayload);
              localStorage.setItem(authConfig.accessTokenKeyName, responseData.data.data.access_token)
              localStorage.setItem(authConfig.refreshTokenKeyName, responseData.data.data.refresh_token)
              router.push('/')
              removeTFAToken()
            } else {
              setOpen(false)
            }
            setAlert({
              title: isLoggedIn ? 'Enable Otp' : 'Login OTP',
              content: 'Your loggedin',
              color: 'success',
              icon: 'ic:baseline-check',
              open: true
            })
          }
        }
      }
      catch (error: any) {
        setOtp('')
        setLoading(false)
        setAlert({
          title: isLoggedIn ? 'Enable Otp Failed' : 'Login Failed',
          content: error.response.data.errors[0].message,
          color: 'danger',
          icon: 'ic:baseline-do-disturb',
          open: true
        })
      }
    } else {
      try {
        const responseStatus = await actionPostDisableOtp({
          otp
        });
        if (responseStatus?.status === 204) {
          setOpen(false)
          setOtp('')

          setAlert({
            title: 'Disable OTP',
            content: 'Success disable OTP',
            color: 'success',
            icon: 'ic:baseline-check',
            open: true
          })
          return
        }
      } catch (err: any) {
        if (err?.response?.status === 400) {
          setOtp('')
          setLoading(false)
          setAlert({
            title: 'Disable OTP',
            content: err.response.data.errors[0].message,
            color: 'danger',
            icon: 'ic:baseline-do-disturb',
            open: true
          })
          return
        }
      }

    }
    setLoading(false)
  }, [isVerifiedCode, otp, secret])

  return (
    <Modal
      isOpen={open}
      onClose={() => setOpen(prev => !prev)}
      size='medium'
      position='center'
      renderAction={false}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Icon
          icon="mdi:warning-circle-outline"
          fontSize='72px'
          color={theme.colorToken.icon.warning.subtlest}
        />
        <MvTypography
          typeSize='PX'
          size='TITLE_SM'
          mt={3}
        >
          {isVerifiedCode ? 'Enter verification code' : 'Scan QR Code & Verification Code'}
        </MvTypography>

        {isVerifiedCode ? (
          <>
            <MvTypography
              typeSize='PX'
              size='LABEL_MD_NORMAL'
              sx={{ textAlign: 'center' }}
              color={theme.colorToken.text.neutral.normal}
              mt={3}
            >
              Check your otp code in your authenticator app
            </MvTypography>
          </>
        ) : (
          <>
            <MvTypography
              typeSize='PX'
              size='LABEL_MD_NORMAL'
              sx={{ textAlign: 'center' }}
              color={theme.colorToken.text.neutral.normal}
              mt={3}
            >
              Please scan the QR Code first, then enter the verification code.
            </MvTypography>
          </>
        )}

        {!isVerifiedCode && (
          <>
            <Box sx={{ marginY: 4 }}>
              <Badge
                isTransparent={true}
                style="rect"
                label="1"
                color={theme.colorToken.background.info.hover as string}
                size="medium"
              />
            </Box>
            <QRCode text={valueQrCode} />
            <Divider sx={{ marginY: 4 }} />
            <Box sx={{ marginTop: 4 }}>
              <Badge
                isTransparent={true}
                style="rect"
                label="2"
                color={theme.colorToken.background.info.hover as string}
                size="medium"
              />
            </Box>
          </>
        )}

        <Box
          sx={{ display: 'flex', marginTop: 4, alignItems: 'center', justifyContent: 'center' }}
        >
          <OTP
            value={otp}
            onChange={setOtp}
            length={6}
            onComplete={onSubmitOtp}
          />
        </Box>
        <Box mb={10}>
          {
            loading ? <CircularProgress size={20} sx={{ marginTop: 4 }} /> : (
              <MvTypography
                typeSize='PX'
                size='LABEL_MD_NORMAL'
                color={theme.colorToken.text.neutral.normal}
                mt={3}
              >
                For any questions or problems, please contact the administrator.
              </MvTypography>
            )
          }

        </Box>
      </Box>
      {alert.open ? (
        <Box position='fixed' top='85px' right='24px'>
          <Toast
            content={alert.content}
            subTitle=''
            type="alert"
            variant={alert.color}
            title={alert.title}
            icon={alert.icon}
            onClose={() => {
              setAlert({ ...alert, open: false })
            }}
          />
        </Box>
      ) : null}
    </Modal>
  );
};

export default ModalVerificationOtp;
