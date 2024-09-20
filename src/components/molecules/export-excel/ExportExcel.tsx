import React from 'react'
import { Button } from 'src/components/atoms'

import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

const ExportExcel = ({ dataFetchService }: { dataFetchService: any }) => {
  const { data } = dataFetchService()
  const handleOnClick = async () => {
    try {
      if (data.data.length > 0) {
        const worksheet = XLSX.utils.json_to_sheet(data.data)
        const workbook = XLSX.utils.book_new()
        const colWidths = [
          { wch: 25 },
          { wch: 15 },
          { wch: 25 },
          { wch: 20 },
          { wch: 20 },
          { wch: 25 },
          { wch: 10 },
          { wch: 20 },
          { wch: 20 },
          { wch: 25 },
          { wch: 25 },
          { wch: 25 },
          { wch: 25 },
          { wch: 10 },
          { wch: 20 }
        ]
        worksheet['!cols'] = colWidths
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data')
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
        const blob = new Blob([excelBuffer], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        })
        saveAs(blob, 'my-departments.xlsx')
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <Button
      color='success'
      size='small'
      type='button'
      variant='contained'
      content='textOnly'
      text='Export Excel'
      onClick={handleOnClick}
    />
  )
}

export default ExportExcel
