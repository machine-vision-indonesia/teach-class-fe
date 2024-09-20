import { Box, Card, CardContent, FormControl, Grid } from '@mui/material'
import { MvTypography } from '@/components/atoms/mv-typography'
import { Label } from '@/components/atoms/label'
import { Input } from '@/components/atoms/input'
import { Button, Textarea } from '@/components/atoms'
import React from 'react'
import { FormOneRowProps } from '../../types/Example.types'
import { Controller } from 'react-hook-form'

/**
 * Renders a form with various input fields and a submit button in a single row layout.
 *
 * @return {JSX.Element} The JSX representation of the form in one row layout.
 */
export const FormOneRow: React.FC<FormOneRowProps> = ({ errors, control, handleSubmit, onSubmit }) => {
  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'grid', gap: 6 }}>
            <Box sx={{ display: 'grid', gap: 3 }}>
              <MvTypography typeSize='PX' size='TITLE_SM'>
                Example Form using in One Row
              </MvTypography>

              <MvTypography typeSize='PX' size='LABEL_MD_NORMAL'>
                Complete the data to add Example
              </MvTypography>
            </Box>
            <Grid container spacing={4}>
              <Grid item xs={12} sx={{ display: 'grid', gap: 1 }}>
                <Controller
                  name='name'
                  control={control}
                  render={({ field: { name, ...rest }, fieldState }) => {
                    return (
                      <FormControl error={fieldState.invalid}>
                        <Label isRequired={true} size='medium' weight='normal'>
                          Full Name
                        </Label>
                        <Input
                          size='small'
                          error={fieldState.invalid}
                          fullWidth
                          helperText={errors && errors[name]?.message}
                          {...rest}
                        />
                      </FormControl>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sx={{ display: 'grid', gap: 1 }}>
                <Controller
                  name='lastName'
                  control={control}
                  render={({ field: { name, ...rest }, fieldState }) => {
                    return (
                      <FormControl error={fieldState.invalid}>
                        <Label isRequired={true} size='medium' weight='normal'>
                          Last Name
                        </Label>
                        <Input
                          error={fieldState.invalid}
                          size='small'
                          fullWidth
                          {...rest}
                          helperText={errors && errors[name]?.message}
                        />
                      </FormControl>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sx={{ display: 'grid', gap: 1 }}>
                <Controller
                  name='description'
                  control={control}
                  render={({ field: { name, ...rest }, fieldState }) => {
                    return (
                      <FormControl>
                        <Label isRequired={false} size='medium' weight='normal'>
                          Desciption
                        </Label>
                        <Textarea fullWidth onChange={rest.onChange} />
                      </FormControl>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sx={{ display: 'grid', gap: 1 }}>
                <Label isRequired={false} size='medium' weight='normal'>
                  Phone Number
                </Label>
                <Input size='small' fullWidth />
              </Grid>
              <Grid item>
                <Button type='submit' content='textOnly' variant='solid' size='medium' text='Submit' />
              </Grid>
            </Grid>
          </Box>
        </form>
      </CardContent>
    </Card>
  )
}
