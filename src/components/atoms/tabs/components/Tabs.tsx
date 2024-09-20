import TabContext from '@mui/lab/TabContext'
import TabList, { type TabListProps } from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { useTheme } from '@mui/material'
import Tab from '@mui/material/Tab'
import { type SyntheticEvent } from 'react'
import { PropsTabs } from '../types/tabs.type'

/**
 * Tabs adalah elemen antarmuka pengguna (UI) yang memungkinkan pengguna untuk beralih antara berbagai panel
 * konten dalam satu jendela atau area tampilan yang sama. Setiap tab berfungsi sebagai kontrol dimana ketika
 * diklik, menampilkan panel konten terkait dan menyembunyikan panel lainnya. Tabs sering digunakan untuk
 * mengelompokkan informasi yang terkait atau fitur dalam aplikasi untuk mengurangi kekacauan dan memudahkan
 * navigasi.
 */

export const Tabs = ({
  activeTabs = '1',
  onChange = () => {},
  data = [],
  color = 'primary',
  centered = true,
  variant,
  size = 'medium',
  style = 'line',
  borderBottom
}: PropsTabs & Pick<TabListProps, 'variant'>) => {
  const handleChange = (event: SyntheticEvent, newValue: string) => {
    onChange?.(newValue)
  }
  const theme = useTheme()

  const colorUsed = color ?? 'primary'
  const styleUsed = style ?? 'line'

  const getSize = () => {
    switch (size) {
      case 'small':
        return '12px'
      case 'medium':
        return '14px'
      case 'large':
        return '16px'
      default:
        return '14px'
    }
  }

  const getColorTextSelected = () => {
    switch (color) {
      case 'primary':
        return theme.colorToken.text.primary.normal
      case 'success':
        return theme.colorToken.text.success.normal
      case 'error':
        return theme.colorToken.text.danger.normal
      case 'warning':
        return theme.colorToken.text.warning.normal
      case 'info':
        return theme.colorToken.text.info.normal
      case 'accent':
        return theme.palette.accent.main
    }
  }

  return (
    <TabContext value={activeTabs}>
      <TabList
        sx={{
          '& .MuiTabs-indicator':
            styleUsed == 'line'
              ? {
                  backgroundColor: `${colorUsed}.main`
                }
              : {
                  display: 'none'
                },
          '& .Mui-selected':
            styleUsed == 'line'
              ? {
                  color: `${getColorTextSelected()} !important`
                }
              : { backgroundColor: `${colorUsed}.main`, color: `white !important` },
          '& .MuiTab-root':
            styleUsed == 'button'
              ? {
                  lineHeight: 1,
                  borderRadius: '6px'
                }
              : {},
          borderBottom: styleUsed == 'button' ? '0 !important' : borderBottom ? {} : '0 !important'
        }}
        variant={variant}
        centered={centered}
        onChange={handleChange}
      >
        {data.map((v, i) => {
          return (
            <Tab
              sx={{
                display: 'flex',
                flexDirection: 'row',
                fontSize: getSize() + ' !important'
              }}
              icon={v.renderIcon && v.renderIcon}
              key={i}
              value={`${i}`}
              label={v.label}
              disabled={v.disabled}
            />
          )
        })}
      </TabList>
      {data.map((v, i) => (
        <TabPanel sx={{ p: 0 }} key={i} value={`${i}`}>
          <>{v.renderContent}</>
        </TabPanel>
      ))}
    </TabContext>
  )
}
