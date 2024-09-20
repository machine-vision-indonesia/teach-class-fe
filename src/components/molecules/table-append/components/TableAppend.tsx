import * as React from 'react'
import { PropsTableAppend } from '../types/tableAppend.type'
import { Table } from '@/components/molecules'
import { Button } from '@/components/atoms'
import { Box, useTheme } from '@mui/material'
import Icon from '@/@core/components/icon'
import { IconButton } from '@mui/material'
import { MvTypography } from '@/components/atoms/mv-typography'
import { useFieldArray } from 'react-hook-form'

const generateUniqueId = () => `id-${Date.now()}`


const TableAppend: React.FC<PropsTableAppend> = ({
  control,
  controllerName,
  initialNewValue,
  columns,
  textButton = 'Add Row',
  colorNull = 'blue',
  textNull = 'Please Add Row First',
  ...props
}) => {
  const theme = useTheme()

  const updatedColumns = columns.map(column => {
    if (column.field === 'delete') {
      return {
        ...column,
        renderCell: (params: any) => {
          const rowIndex = params.api.getAllRowIds().indexOf(params.id);

          return (
            <IconButton onClick={() => remove(rowIndex)}>
              <Icon icon='carbon:close-outline' color={theme.colorToken.icon.danger.normal} />
            </IconButton>
          )
        }
      }
    }
    return {
      ...column
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: controllerName
  })

  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'} width={'100%'} borderRadius={'6px'}>
      {fields.length > 0 ? (
        <Box width={'100%'}>
          <Table
            rows={fields}
            getRowHeight={() => 'auto'}
            columns={updatedColumns}
            checkboxSelection={false}
            {...props}
          />
          <Button
            variant='text'
            content='iconText'
            size='medium'
            text={textButton}
            icon={'ic:round-add'}
            onClick={() => append({...initialNewValue, rowid: generateUniqueId()})}
            sx={{ mt: 2 }}
          />
        </Box>
      ) : (
        <Box display='flex' flexDirection='column' alignItems='center'>
          <Box textAlign='center' marginBottom='20px' color={colorNull}>
            <MvTypography typeSize={'PX'} size={'BODY_LG_NORMAL'}>
              {textNull}
            </MvTypography>
          </Box>
          <Button
            variant='plain'
            content='iconText'
            size='medium'
            text={textButton}
            icon={'ic:round-add'}
            onClick={() => append({...initialNewValue, rowid: generateUniqueId()})}
          />
        </Box>
      )}
    </Box>
  )
}

export default TableAppend
