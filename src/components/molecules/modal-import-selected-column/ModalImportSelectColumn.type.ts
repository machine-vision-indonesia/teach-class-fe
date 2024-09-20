interface DataFile {
  title: string
  data: any[]
}

interface DataTable {
  title: string
  data: any[]
}

interface DataFactory {
  label: string
  value: string
}

export interface ModalImportSelectColumnProps {
  isOpen: boolean
  onClose: () => void
  onOk?: () => void
  dataFile: DataFile
  dataTable: DataTable
  dataFactory: DataFactory[]
}
