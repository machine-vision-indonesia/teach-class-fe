import type { Meta, StoryObj } from '@storybook/react'

import { Flowchart } from './Flowchart'

const meta: Meta<typeof Flowchart> = {
  title: 'Components/Atoms/Flowchart',
  component: Flowchart,
  argTypes: {
    height: {
      description: 'Defines the height of the diagram model.'
    },
    width: {
      description: 'Defines the width of the diagram model.'
    },
    data: {
      description: 'Defines the data of the diagram model. It should be an array of objects.'
    },
    dataId: {
      description: 'Defines the id of the object in the `data` array.'
    },
    dataParentId: {
      description: 'Defines the parent id of the object in the `data` array.'
    },
    dataContent: {
      description: 'Defines the content of the object in the `data` array that will be displayed in the diagram node.'
    },
    nodeStyle: {
      description: 'Defines the style of the diagram node.'
    },
    textStyle: {
      description: 'Defines the style of the diagram node text.'
    },
    connectorStyle: {
      description: 'Defines the style of the diagram connector.'
    },
    orientation: {
      description: 'Defines the orientation of the diagram.'
    }
  }
}

export default meta

type Agenda = {
  id: number
  name: string
  parent?: number
}

const agendas: Agenda[] = [
  { id: 1, name: 'Evaluasi Pemeliharaan Masinal' },
  { id: 2, name: 'Pembuatan Draft Jadwal PM', parent: 1 },
  { id: 3, name: 'Approval Draft Jadwal PM', parent: 2 },
  { id: 4, name: 'Distribusi Jadwal Pemeliharaan', parent: 3 },
  { id: 5, name: 'Analisa Kebutuhan PM Internal atau External ', parent: 4 },
  { id: 6, name: 'Pembuatan Draft Jadwal PM', parent: 5 },
  { id: 7, name: 'Pembuatan Master Data Maintenance', parent: 5 }
]

type Story = StoryObj<typeof Flowchart<Agenda>>

export const Default: Story = {
  args: {
    width: '100%',
    height: 490,
    data: agendas,
    dataId: 'id',
    dataParentId: 'parent',
    dataContent: 'name',
    nodeStyle: {
      fill: '#005EFF',
      strokeWidth: 0
    },
    textStyle: {
      color: '#ffffff',
      bold: true
    }
  },
  parameters: {
    docs: {
      source: {
        code: `
import { Flowchart } from 'src/@core/custom-components/flowchart/Flowchart'

type Agenda = {
  id: number
  name: string
  parent?: number
}

const agendas: Agenda[] = [
  { id: 1, name: 'Evaluasi Pemeliharaan Masinal' },
  { id: 2, name: 'Pembuatan Draft Jadwal PM', parent: 1 },
  { id: 3, name: 'Approval Draft Jadwal PM', parent: 2 },
  { id: 4, name: 'Distribusi Jadwal Pemeliharaan', parent: 3 },
  { id: 5, name: 'Analisa Kebutuhan PM Internal atau External ', parent: 4 },
  { id: 6, name: 'Pembuatan Draft Jadwal PM', parent: 5 },
  { id: 7, name: 'Pembuatan Master Data Maintenance', parent: 5 }
]

export default function Page() {
  return (
    <Flowchart<Agenda>
      width={'100%'}
      height={490}
      data={agendas}
      dataId='id'
      dataParentId='parent'
      dataContent='name'
      nodeStyle={{
        fill: '#005EFF',
        strokeWidth: 0
      }}
      textStyle={{
        color: '#ffffff',
        bold: true
      }}
    />
  )
}
        `,
        language: 'tsx'
      }
    }
  }
}
