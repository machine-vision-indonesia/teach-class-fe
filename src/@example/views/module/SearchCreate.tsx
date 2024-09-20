import { Box, Grid, TextField } from '@mui/material'
import { Button } from 'src/components/atoms/button/Button'

const SearchCreate = () => {
  return (
    <Grid sx={{ mb: 6 }} container spacing={4}>
      <Grid item xs={4}>
        <TextField fullWidth size='small' sx={{}} placeholder='Search Invoice' />
      </Grid>
      <Grid item xs={2}>
        <Button variant='contained' size='medium'>
          Create Invoice
        </Button>
      </Grid>
    </Grid>
  )
}

export default SearchCreate
