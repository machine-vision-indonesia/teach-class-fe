import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import Icon from '@/@core/components/icon'
import React, { FC } from 'react'
import TextField from '@mui/material/TextField'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
import { MvTypography } from '@/components/atoms/mv-typography'
import { Button, Select } from '@/components/atoms'
import { PropsFilter } from '../types/RepositoryDocument.types'

const Filter: FC<PropsFilter> = ({ handleViewMode, viewMode }) => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: '10px'
      }}
    >
      <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        <ToggleButtonGroup
          exclusive
          size='small'
          aria-label='text alignment'
          onChange={handleViewMode}
          value={viewMode}
          color='primary'
          sx={{
            '& .MuiToggleButtonGroup-grouped.Mui-selected': {
              backgroundColor: theme.colorToken.background.primary.normal
            }
          }}
        >
          <ToggleButton value='list' sx={{ gap: 1, width: 75 }} aria-label='center aligned'>
            <Icon
              icon='tabler:layout-list'
              color={
                viewMode === 'list' ? theme.colorToken.icon.neutral.inverted : theme.colorToken.icon.primary.normal
              }
            />
            <MvTypography
              size='TITLE_XS'
              typeSize='PX'
              color={
                viewMode === 'list' ? theme.colorToken.text.neutral.inverted : theme.colorToken.text.primary.normal
              }
            >
              List
            </MvTypography>
          </ToggleButton>
          <ToggleButton value='grid' aria-label='left aligned' sx={{ gap: 1, width: 75 }}>
            <Icon
              icon='tabler:layout-grid'
              color={
                viewMode === 'grid' ? theme.colorToken.text.neutral.inverted : theme.colorToken.text.primary.normal
              }
            />
            <MvTypography
              size='TITLE_XS'
              typeSize='PX'
              color={
                viewMode === 'grid' ? theme.colorToken.text.neutral.inverted : theme.colorToken.text.primary.normal
              }
            >
              Grid
            </MvTypography>
          </ToggleButton>
        </ToggleButtonGroup>
        <Select
          placeholder='Group By'
          data={[
            {
              id: '12',
              text: 'Group by'
            },
            {
              id: '13',
              text: 'Group by dua'
            }
          ]}
          labelKey='text'
          selected={{
            id: '12',
            text: 'Group by'
          }}
          valueKey='id'
          variant='default'
        />
        <Select
          placeholder='Sort By'
          data={[
            {
              id: '12',
              text: 'Sort by'
            },
            {
              id: '13',
              text: 'Sort by dua'
            }
          ]}
          labelKey='text'
          selected={{
            id: '12',
            text: 'Sort by'
          }}
          valueKey='id'
          variant='default'
        />
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          size='small'
          placeholder='Search File'
          onChange={e => {
            // setDocumentNameSearch(e.target.value)
          }}
        />
        <Button text='Filter' size='medium' content='iconText' variant='plain' icon='mingcute:filter-line' />
      </Box>
    </Box>
  )
}

export default Filter
