import { StoryObj, Meta } from '@storybook/react'
import PageHeader from '../components/PageHeader'
import { IPageHeader } from '../types/pageHeader.types'
import { Button } from '@/components/atoms'
import { BrowserRouter } from 'react-router-dom'
import { FC } from 'react'

const MockedComponent: FC<IPageHeader> = ({ title, breadcrumbsData, back, actionButton }) => {
  return (
    <BrowserRouter>
      <PageHeader
        back={back}
        title={title}
        breadcrumbsData={breadcrumbsData}
        actionButton={actionButton}
      />
    </BrowserRouter>
  )
}

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof PageHeader> = {
  title: 'Components/Organism/PageHeader',
  component: MockedComponent,
  parameters: {
    layout: 'fullscreen'
  }
}

export default meta

type Story = StoryObj<typeof PageHeader>

const defaultProps: Partial<IPageHeader> = {
  title: 'Title Page',
  breadcrumbsData: [
    { label: 'Home', path: '/' },
    { label: 'Title Page', path: '' }
  ]
}

export const Default: Story = {
  args: defaultProps
}

export const PageHeaderWithAction: Story = {
  args: {
    title: 'Title Page',
    breadcrumbsData: [
      { label: 'Home', path: '/' },
      { label: 'Title Page', path: '' }
    ],
    actionButton: <Button content='textOnly' text='Action' />
  }
}

export const PageHeaderWithBack: Story = {
  args: {
    title: 'Title Page',
    breadcrumbsData: [
      { label: 'Home', path: '/' },
      { label: 'Title Page', path: '' }
    ],
    back: true
  }
}
