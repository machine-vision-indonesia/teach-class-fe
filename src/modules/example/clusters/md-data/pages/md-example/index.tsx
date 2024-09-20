import { Button } from '@/components/atoms'
import { Breadcrumbs } from '@/components/atoms/breadcrumbs'
import { MvTypography } from '@/components/atoms/mv-typography'
import { Box, Card, CardContent } from '@mui/material'
import { useRouter } from 'next/router'
import { useNavigate } from 'react-router-dom'

const PageMdConsultan = () => {
  const navigate = useNavigate()
  return (
    <>
      <Box>
        <Box sx={{ mb: 5, justifyContent: 'space-between', display: 'flex' }}>
          <Box>
            <MvTypography typeSize='PX' size='TITLE_XL'>
              Manage Example
            </MvTypography>
            <Breadcrumbs
              data={[
                { label: 'Home', path: '' },
                { label: 'Manage Example', path: '' }
              ]}
            />
          </Box>
          <Button
            content='textOnly'
            onClick={() => {
              navigate('/solutions/example/md-example/edit')
            }}
            size='medium'
            variant='solid'
            text='+ Add Consultan'
          />
        </Box>

        <Card sx={{ boxShadow: 0 }} variant='outlined'>
          <CardContent sx={{ minHeight: 600 }}></CardContent>
        </Card>
      </Box>
    </>
  )
}

export default PageMdConsultan
