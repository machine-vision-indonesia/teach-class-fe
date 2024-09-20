import { Table } from '@/components/molecules'
import { SectionGroup } from '@/components/molecules/section-group'
import { Stack } from '@mui/material'
import { useMemo } from 'react'
import { columns } from './SectionSoDp.constant'

export const SectionSoDp = () => {
  const col = useMemo(() => columns, [])
  return (
    <Stack width={'100%'} rowGap={'12px'}>
      <SectionGroup color='default' title='Material List'>
        <Table
          checkboxSelection
          onRowSelectionModelChange={par => {}}
          columns={col}
          rows={[
            {
              id: 1,
              material_name: 'Steel Rod',
              material_code: 'SR-102',
              bach_number: 'BN-345',
              from: 'Warehouse A',
              to: 'Site B',
              type: 'Raw Material',
              quantity: 150,
              unit: 'kg'
            },
            {
              id: 2,
              material_name: 'Copper Wire',
              material_code: 'CW-204',
              bach_number: 'BN-678',
              from: 'Warehouse C',
              to: 'Site D',
              type: 'Finished Goods',
              quantity: 200,
              unit: 'meters'
            },
            {
              id: 3,
              material_name: 'Aluminum Sheet',
              material_code: 'AS-309',
              bach_number: 'BN-910',
              from: 'Warehouse B',
              to: 'Site A',
              type: 'Raw Material',
              quantity: 300,
              unit: 'sheets'
            },
            {
              id: 4,
              material_name: 'Plastic Pipe',
              material_code: 'PP-453',
              bach_number: 'BN-112',
              from: 'Warehouse D',
              to: 'Site C',
              type: 'Raw Material',
              quantity: 120,
              unit: 'meters'
            },
            {
              id: 5,
              material_name: 'Glass Panel',
              material_code: 'GP-876',
              bach_number: 'BN-321',
              from: 'Warehouse E',
              to: 'Site F',
              type: 'Finished Goods',
              quantity: 50,
              unit: 'panels'
            }
          ]}
        />
      </SectionGroup>
    </Stack>
  )
}
