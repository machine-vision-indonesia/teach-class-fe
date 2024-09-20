import { Box, Grid } from '@mui/material'
import { MvTypography } from '@/components/atoms/mv-typography'
import { Label } from '@/components/atoms/label'
import { Input } from '@/components/atoms/input'
import { Button, Textarea } from '@/components/atoms'

/**
 * Renders a form with input fields for Full Name, Last Name, Description, Phone Number, and a Submit button.
 *
 * @return {JSX.Element} The JSX element representing the form.
 */
export const FormFirst = () => {
  return (
    <form>
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
            <Label isRequired={true} size='medium' weight='normal'>
              Full Name
            </Label>
            <Input size='small' fullWidth />
          </Grid>
          <Grid item xs={12} sx={{ display: 'grid', gap: 1 }}>
            <Label isRequired={true} size='medium' weight='normal'>
              Last Name
            </Label>
            <Input size='small' fullWidth />
          </Grid>
          <Grid item xs={12} sx={{ display: 'grid', gap: 1 }}>
            <Label isRequired={false} size='medium' weight='normal'>
              Desciption
            </Label>
            <Textarea fullWidth />
          </Grid>
          <Grid item xs={12} sx={{ display: 'grid', gap: 1 }}>
            <Label isRequired={false} size='medium' weight='normal'>
              Phone Number
            </Label>
            <Input size='small' fullWidth />
          </Grid>
          <Grid item>
            <Button content='textOnly' variant='solid' size='medium' text='Submit' />
          </Grid>
        </Grid>
      </Box>
    </form>
  )
}
