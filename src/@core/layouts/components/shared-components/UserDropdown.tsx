// ** React Imports
import { useState, SyntheticEvent, Fragment } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Imports
import { Settings } from 'src/@core/context/settingsContext'
import { useAtom } from 'jotai'
import { roleOptionsAtom } from 'src/atoms'
import { useUser } from 'src/hooks/useUser'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import client from 'src/client'
import { CircularProgress } from 'src/components/atoms/circular-progress/CircularProgress'
import authConfig from 'src/configs/auth'
import { assetKeys } from 'src/utils/query-keys'

interface Props {
  settings: Settings
}

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const MenuItemStyled = styled(MenuItem)<MenuItemProps>(({ theme }) => ({
  '&:hover .MuiBox-root, &:hover .MuiBox-root svg': {
    color: theme.palette.primary.main
  }
}))

const UserDropdown = (props: Props) => {
  const [roleOptions] = useAtom(roleOptionsAtom)
  const roles = roleOptions.map(role => role.label).join(', ')

  // ** Props
  const { settings } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  // ** Hooks
  const router = useRouter()
  const meQuery = useUser()
  const getAssetQuery = useQuery({
    queryKey: assetKeys.detail(meQuery.data?.data?.profile?.photo),
    async queryFn() {
      if (!meQuery.data?.data?.profile?.photo) {
        throw new Error('Invalid asset ID')
      }

      const response = await client.api.get(`/assets/${meQuery.data?.data.profile.photo}`, {
        responseType: 'blob'
      })

      return new Promise<string>(callback => {
        const reader = new FileReader()
        reader.onload = function () {
          callback(String(reader.result))
        }
        reader.readAsDataURL(response.data)
      })
    },
    enabled: Boolean(meQuery.data?.data?.profile?.photo)
  })

  // ** Vars
  const { direction } = settings

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const logoutMutation = useMutation({
    mutationFn: async () => {
      return client.api.post('/auth/logout', {
        refresh_token: localStorage.getItem(authConfig.refreshTokenKeyName)
      })
    }
  })

  const queryClient = useQueryClient()

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      async onSuccess() {
        await queryClient.invalidateQueries()
        handleDropdownClose()
        localStorage.removeItem(authConfig.refreshTokenKeyName)
        localStorage.removeItem(authConfig.accessTokenKeyName)
        router.push('/login')
      }
    })
  }

  if (!meQuery.isSuccess || (meQuery.data?.data?.profile?.photo && !getAssetQuery.isSuccess)) {
    return null
  }

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <Avatar
          alt={`${meQuery.data?.data?.first_name} ${meQuery.data?.data?.last_name}`}
          onClick={handleDropdownOpen}
          sx={{ width: 40, height: 40 }}
          src={meQuery.data?.data?.profile?.photo ? getAssetQuery.data : undefined}
        />
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, mt: 4.5 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
      >
        <Box sx={{ py: 1.75, px: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
            >
              <Avatar
                alt={`${meQuery.data?.data?.first_name} ${meQuery.data?.data?.last_name}`}
                src={meQuery.data?.data?.profile?.photo ? getAssetQuery.data : undefined}
                sx={{ width: '2.5rem', height: '2.5rem' }}
              />
            </Badge>
            <Box sx={{ display: 'flex', ml: 2.5, alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                sx={{ fontWeight: 500 }}
              >{`${meQuery.data?.data?.first_name} ${meQuery.data?.data?.last_name}`}</Typography>
              <Typography variant='body2'>{roles}</Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ my: theme => `${theme.spacing(2)} !important` }} />
        {logoutMutation.isLoading || logoutMutation.isSuccess ? (
          <div style={{ height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress size={18} />
          </div>
        ) : (
          <MenuItemStyled
            onClick={handleLogout}
            sx={{
              color: 'red',
              height: 38,
              '& svg':
                logoutMutation.isLoading || logoutMutation.isSuccess ? undefined : { mr: 2, fontSize: '1.375rem' }
            }}
          >
            <Icon icon='ic:outline-logout' />
            Logout
          </MenuItemStyled>
        )}
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
