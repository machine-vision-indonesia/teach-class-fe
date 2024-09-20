import React from 'react'
import { StoryObj, Meta } from '@storybook/react'

import SectionGroup from '../components/SectionGroup'
import IconButton from '@mui/material/IconButton'
import Icon from 'src/@core/components/icon'
import { SectionGroupProps } from '../types/SectionGroup.type'
import { MvTypography } from '@/components/atoms/mv-typography'
import { Box } from '@mui/material'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof SectionGroup> = {
  title: "Components/Molecules/SectionGroup",
  component: SectionGroup,
  parameters: {
    layout: 'fullscreen',
  }
}

export default meta

type Story = StoryObj<typeof SectionGroup>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const CustomContentIcon = ({ icon }: { icon: string }) => (
  <IconButton>
    <Icon icon={icon} color="blue" fontSize={26} />
  </IconButton>
)

const defaultProps: Partial<SectionGroupProps> = {
  title: 'Section Title',
  squareLeft: "On Checking",
  squareRightChildrenLeft: <CustomContentIcon icon="mdi:star-box" />,
  squareRightChildrenCenter: <CustomContentIcon icon="solar:download-square-outline" />,
  squareRightChildrenRight: <CustomContentIcon icon="tabler:switch-vertical" />,
}

export const Default: Story = {
  args: defaultProps
}

export const ExampleSuccessWithChildren: Story = {
  render: () => (
    <SectionGroup
      title="Example Section"
      color='success'
    >
      <Box sx={{ padding: 5 }}>
        <MvTypography size='LABEL_MD_BOLDEST' typeSize='PX'>Content Here</MvTypography>
      </Box>
    </SectionGroup>
  )
}

