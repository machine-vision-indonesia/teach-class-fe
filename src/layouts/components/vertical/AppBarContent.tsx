// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

import MuiAutocomplete from '@mui/material/Autocomplete'
import { formatInTimeZone } from 'date-fns-tz'
import { useAtom } from 'jotai'
import { env } from 'next-runtime-env'
import { useState } from 'react'
import useWebSocket from 'react-use-websocket'
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import NotificationDropdown, {
  type NotificationsType
} from 'src/@core/layouts/components/shared-components/NotificationDropdown'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import { navItemsAtom, roleOptionsAtom, selectedRoleAtom } from 'src/atoms'
import { Input } from 'src/components/atoms/input'
import authConfig from 'src/configs/auth'
import { useUser } from 'src/hooks/useUser'
// ** Components
import Autocomplete from 'src/layouts/components/Autocomplete'
import { getNavItems } from 'src/utils/general'

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}

const restURL = new URL(env('NEXT_PUBLIC_REST_API_URL')!)

const AppBarContent = (props: Props) => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props
  const [roleOptions] = useAtom(roleOptionsAtom)
  const meQuery = useUser()
  const [, setNavItems] = useAtom(navItemsAtom)
  const [selectedRole, setSelectedRole] = useAtom(selectedRoleAtom)
  const [notifications, setNotifications] = useState<NotificationsType[]>([])

  const { sendJsonMessage } = useWebSocket(`wss://${restURL.hostname}/websocket`, {
    onOpen() {
      sendJsonMessage({
        type: 'auth',
        access_token: localStorage.getItem(authConfig.accessTokenKeyName)
      })
    },
    onMessage(e) {
      const data = JSON.parse(e.data)

      if (data.type === 'ping') {
        sendJsonMessage({
          type: 'pong'
        })
      }

      if (data.type === 'auth' && data.status === 'ok') {
        sendJsonMessage({
          type: 'subscribe',
          collection: 'directus_notifications',
          query: {
            fields: ['timestamp', 'url', 'subject', 'message', 'sender.profile.full_name'],
            filter: {
              recipient: {
                _eq: meQuery.data?.data?.id
              }
            },
            sort: ['-timestamp', 'id']
          }
        })
      }

      if (data.type === 'subscription' && data.event === 'init') {
        setNotifications(
          data.data.map(notification => {
            const date = new Date(notification.timestamp)

            return {
              url: notification.url,
              meta: formatInTimeZone(date, 'Asia/Jakarta', 'yyyy-MM-dd'),
              title: notification.subject,
              subtitle: notification.message,
              avatarText: notification.sender?.profile?.full_name ?? 'User',
              avatarAlt: notification.sender?.profile?.full_name ?? 'User'
            }
          })
        )
      }

      if (data.type === 'subscription' && data.event === 'create') {
        const notification = data.data[0]
        const date = new Date(notification.timestamp)

        setNotifications(prev => [
          {
            url: notification.url,
            meta: formatInTimeZone(date, 'Asia/Jakarta', 'yyyy-MM-dd'),
            title: notification.subject,
            subtitle: notification.message,
            avatarText: notification.sender?.profile?.full_name ?? 'User',
            avatarAlt: notification.sender?.profile?.full_name ?? 'User'
          },
          ...prev
        ])
      }
    }
  })

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden && !settings.navHidden ? (
          <IconButton color='inherit' sx={{ ml: -2.75 }} onClick={toggleNavVisibility}>
            <Icon fontSize='1.5rem' icon='tabler:menu-2' />
          </IconButton>
        ) : null}
        <Autocomplete hidden={hidden} settings={settings} />
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        {selectedRole ? (
          <MuiAutocomplete
            disablePortal
            options={roleOptions}
            value={selectedRole}
            disableClearable
            onChange={(_, newValue) => {
              setSelectedRole(newValue)
              if (!newValue || !meQuery.data?.data) {
                return
              }

              const navItems = getNavItems({
                data: meQuery.data.data,
                roleIds: roleOptions.map(role => role.id),
                selectedRoleId: newValue.id,
                uiConfigs: []
              })

              setNavItems(navItems)
            }}
            size='small'
            sx={{ width: '250px' }}
            renderInput={params => <Input variant='filled' {...params} />}
            isOptionEqualToValue={(option, value) => option.id === value.id}
          />
        ) : null}
        <Box sx={{ ml: 2 }}>
          <ModeToggler settings={settings} saveSettings={saveSettings} />
        </Box>
        <NotificationDropdown settings={settings} notifications={notifications} />
        <UserDropdown settings={settings} />
      </Box>
    </Box>
  )
}

export default AppBarContent
