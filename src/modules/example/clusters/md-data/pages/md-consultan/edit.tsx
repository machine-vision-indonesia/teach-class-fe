import { Button } from '@/components/atoms'
import { Breadcrumbs } from '@/components/atoms/breadcrumbs'
import { MvTypography } from '@/components/atoms/mv-typography'
import { Box, Card, CardContent } from '@mui/material'
import { useRouter } from 'next/router'
// ** React Imports
import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// ** Next Import
import Link from 'next/link'

import CardHeader from '@mui/material/CardHeader'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
// ** MUI Imports
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

interface State {
  password: string
  showPassword: boolean
}

const Page = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false
  })
  const [confirmPassValues, setConfirmPassValues] = useState<State>({
    password: '',
    showPassword: false
  })

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleConfirmPassChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassValues({ ...confirmPassValues, [prop]: event.target.value })
  }
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleClickConfirmPassShow = () => {
    setConfirmPassValues({ ...confirmPassValues, showPassword: !confirmPassValues.showPassword })
  }

  return (
    <>
      <Box>
        <Box sx={{ mb: 5, justifyContent: 'space-between', display: 'flex' }}>
          <Box>
            <MvTypography typeSize='PX' size='TITLE_XL'>
              Add Consultan
            </MvTypography>
            <Breadcrumbs
              data={[
                { label: 'Home', path: '' },
                { label: 'Manage Consultant', path: '' },
                { label: 'Add Consultant', path: '' }
              ]}
            />
          </Box>
        </Box>
        <Card sx={{ boxShadow: 0 }} variant='outlined'>
          <CardHeader title='Basic' />
          <CardContent>
            <form onSubmit={e => e.preventDefault()}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <TextField fullWidth label='Name' placeholder='Leonard Carter' />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type='email'
                    label='Email'
                    placeholder='carterleonard@gmail.com'
                    helperText='You can use letters, numbers & periods'
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='form-layouts-basic-password'>Password</InputLabel>
                    <OutlinedInput
                      label='Password'
                      value={values.password}
                      id='form-layouts-basic-password'
                      onChange={handleChange('password')}
                      type={values.showPassword ? 'text' : 'password'}
                      aria-describedby='form-layouts-basic-password-helper'
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={handleClickShowPassword}
                            onMouseDown={e => e.preventDefault()}
                            aria-label='toggle password visibility'
                          >
                            <Icon icon={values.showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <FormHelperText id='form-layouts-basic-password-helper'>
                      Use 8 or more characters with a mix of letters, numbers & symbols
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='form-layouts-confirm-password'>Confirm Password</InputLabel>
                    <OutlinedInput
                      label='Confirm Password'
                      value={confirmPassValues.password}
                      id='form-layouts-confirm-password'
                      onChange={handleConfirmPassChange('password')}
                      aria-describedby='form-layouts-confirm-password-helper'
                      type={confirmPassValues.showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={handleClickConfirmPassShow}
                            onMouseDown={e => e.preventDefault()}
                            aria-label='toggle password visibility'
                          >
                            <Icon icon={confirmPassValues.showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <FormHelperText id='form-layouts-confirm-password-helper'>
                      Make sure to type the same password as above
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      gap: 5,
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Button
                      content='textOnly'
                      onClick={() => {
                        navigate('/solutions/example/md-consultant')
                      }}
                      size='medium'
                      variant='solid'
                      text='save'
                    />
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        '& a': { color: 'primary.main', textDecoration: 'none' }
                      }}
                    ></Box>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Box>
    </>
  )
}

export default Page
