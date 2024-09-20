import React from 'react'
import { Tooltip } from '../components/Tooltip'
import { Typography } from '@mui/material'
import { Meta, StoryObj } from '@storybook/react'
import { PropsTooltip } from '../types/tooltip.types'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Atoms/Tooltip',
  component: Tooltip
} as Meta<typeof Tooltip>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
type Story = StoryObj<typeof Tooltip>

export const Default: Story = (args: PropsTooltip) => <Tooltip {...args} />
Default.args = {
  children: (
    <Typography>
      Cake apple pie chupa chups biscuit liquorice tootsie roll liquorice sugar plum. Cotton candy wafer wafer jelly
      cake caramels brownie gummies.
    </Typography>
  ),
  id: 'example',
  variant: 'top',
  size: 'medium',
  renderContent: 'Tooltip'
}
