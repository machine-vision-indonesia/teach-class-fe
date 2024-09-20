import { useCallback, useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Stack,
  Typography,
  Select,
  MenuItem,
  FormControl
} from '@mui/material'

import { Modal } from '../modal/components/Modal'
import { Button, Table } from 'src/components/atoms'

import { ModalImportSelectColumnProps } from './ModalImportSelectColumn.type'

export const ModalImportSelectColumn = ({
  isOpen = false,
  onClose,
  dataFile,
  dataTable,
  dataFactory
}: ModalImportSelectColumnProps) => {
  const [selected, setSelected] = useState<string[]>([])
  const [newOptions, setNewOptions] = useState<any[]>([])
  const [factory, setFactory] = useState<any>('')

  const { title: fileName, data } = dataFile
  const { title: tableName, data: listColumn } = dataTable

  const setNewOption = useCallback(() => {
    const data = listColumn.map((item, index) => ({
      id: `${index + 1}`,
      text: item
    }))

    const filteredData = data.filter(item => !selected.includes(item.text))

    setNewOptions(filteredData)
  }, [listColumn, selected])

  const convertDataKeys = (data: any[]): string[] => {
    if (data.length === 0) {
      return []
    }

    const sampleItem = data[0]
    const keys = Object.keys(sampleItem)

    return keys
  }

  const keys = convertDataKeys(dataFile?.data)

  const renderListColumn = () => {
    return (
      <Grid item xs={6}>
        <Stack gap={1}>
          <Stack direction='row' alignItems='center'>
            <Icon icon='ion:attach' fontSize='20px' />
            <Typography textTransform='uppercase' variant='labelSm' fontWeight='bold' textAlign='center'>
              {fileName}
            </Typography>
          </Stack>
          {keys.map((item, index) => (
            <Box key={index} padding={1.2} borderRadius={1} border='1px solid lightgray'>
              {item}
            </Box>
          ))}
        </Stack>
      </Grid>
    )
  }

  const renderListColumnSelected = () => {
    return (
      <Grid item xs={6}>
        <Stack gap={1}>
          <Stack direction='row' alignItems='center'>
            <Icon icon='fluent:calculator-multiple-20-filled' fontSize='20px' />
            <Typography textTransform='uppercase' variant='labelSm' fontWeight='bold' textAlign='center'>
              {tableName}
            </Typography>
          </Stack>
          {keys.map((_, index) => (
            <FormControl key={index} size='small'>
              <Select
                value={selected.length === 0 ? 'Select Column' : selected[index]}
                renderValue={value => {
                  if (value.length === 0) return 'Select Column'
                  if (selected.length === 0) return 'Select Column'

                  return value
                }}
                onChange={e => setSelected([...selected, e.target.value])}
              >
                {newOptions.map((item, index) => (
                  <MenuItem value={item.text} key={index}>
                    {item.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ))}
        </Stack>
      </Grid>
    )
  }

  const generateHeader = () => {
    if (selected.length === 0) {
      return listColumn.map(item => ({
        key: item.toLocaleLowerCase(),
        label: item
      }))
    } else {
      return selected.map(item => ({
        key: item.toLocaleLowerCase(),
        label: item
      }))
    }
  }

  const handleClose = () => {
    setSelected([])
    setFactory('')
    onClose?.()
  }

  useEffect(() => {
    setNewOption()
  }, [selected, setNewOption])

  return (
    <Modal isOpen={isOpen} onClose={handleClose} position='center' maxWidth='md' positiveLabel='Confirm' closeable>
      <Grid container>
        <Grid item xs={5} padding={0.5}>
          <Card
            sx={{
              backgroundColor: '#FFF',
              borderRadius: '6px',
              boxShadow: '0px 0px 8px 0px #00000029'
            }}
          >
            <CardHeader
              titleTypographyProps={{ variant: 'labelMd', fontWeight: 'bold' }}
              subheaderTypographyProps={{ variant: 'labelSm' }}
              title='Customize the data in the material table'
              subheader={`Your importing ${fileName} into ${tableName}`}
            />
            <Divider />
            <CardContent>
              <Grid container spacing={1}>
                {renderListColumn()}
                {renderListColumnSelected()}
              </Grid>
            </CardContent>
            <CardActions
              sx={{
                display: 'flex',
                justifyContent: 'flex-end'
              }}
            >
              <Button
                variant='contained'
                content='textOnly'
                text='Discard'
                onClick={() => setSelected([])}
                size='small'
              />
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={7} padding={0.5}>
          <Box border='1px solid #eaeaea' borderRadius={2} padding={2}>
            <Stack direction='row' justifyContent='space-between' alignItems='center' gap={1} mb={1}>
              <Typography variant='labelMd' fontWeight='bold'>
                Select Factory First
              </Typography>
              <Stack minWidth={150}>
                <FormControl size='small'>
                  <Select
                    value={factory.length === 0 ? 'Select Factory' : factory}
                    renderValue={value => {
                      if (value.length === 0) return 'Select Factory'
                      if (factory.length === 0) return 'Select Factory'

                      return value
                    }}
                    onChange={e => setFactory(e.target.value)}
                  >
                    {dataFactory.map((item, index) => (
                      <MenuItem value={item.value} key={index}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Stack>
            <Box
              height={327}
              width={450}
              sx={{
                overflowY: selected.length > 0 ? 'scroll' : 'hidden',
                overflowX: selected.length > 2 ? 'scroll' : 'hidden',
                '&::-webkit-scrollbar': {
                  width: '5px'
                },
                '&::-webkit-scrollbar-track': {
                  width: '5px'
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#888'
                }
              }}
            >
              <Table
                minWidth={selected.length > 2 ? 600 : 0}
                data={selected.length === 0 ? [] : data}
                headers={generateHeader()}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Modal>
  )
}
