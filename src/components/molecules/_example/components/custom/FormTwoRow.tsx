import { Box, Card, CardContent, Grid } from '@mui/material'
import { MvTypography } from '@/components/atoms/mv-typography'
import { Label } from '@/components/atoms/label'
import { Input } from '@/components/atoms/input'
import { Button, Textarea } from '@/components/atoms'

/**
 * Renders a form with two rows of input fields.
 *
 * @return {JSX.Element} The rendered form component.
 */
export const FormTwoRow = () => {
  return (
    <Card>
      <CardContent>
        <form>
          <Box sx={{ display: 'grid', gap: 6 }}>
            <Box sx={{ display: 'grid', gap: 3 }}>
              <MvTypography typeSize='PX' size='TITLE_SM'>
                Example Form using in Two Row
              </MvTypography>

              <MvTypography typeSize='PX' size='LABEL_MD_NORMAL'>
                Complete the data to add Example
              </MvTypography>
            </Box>
            <Grid container spacing={4}>
              <Grid item xs={6} sx={{ display: 'grid', gap: 1 }}>
                <Label isRequired={true} size='medium' weight='normal'>
                  Full Name
                </Label>
                <Input size='small' fullWidth />
              </Grid>
              <Grid item xs={6} sx={{ display: 'grid', gap: 1 }}>
                <Label isRequired={true} size='medium' weight='normal'>
                  Last Name
                </Label>
                <Input size='small' fullWidth />
              </Grid>
              <Grid item xs={6} sx={{ display: 'grid', gap: 1 }}>
                <Label isRequired={false} size='medium' weight='normal'>
                  Password
                </Label>
                <Input size='small' type='password' fullWidth />
              </Grid>
              <Grid item xs={6} sx={{ display: 'grid', gap: 1 }}>
                <Label isRequired={false} size='medium' weight='normal'>
                  Phone Number
                </Label>
                <Input size='small' type='number' fullWidth />
              </Grid>
              <Grid item>
                <Button content='textOnly' variant='solid' size='medium' text='Submit' />
              </Grid>
            </Grid>
          </Box>
        </form>
      </CardContent>
    </Card>
  )
}
