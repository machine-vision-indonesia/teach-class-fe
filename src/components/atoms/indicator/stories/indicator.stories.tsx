import type { Meta, StoryObj } from '@storybook/react'
import { Indicator } from '../components/Indicator'
import { PropsIndicator } from '../types/indicator.types'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Indicator> = {
  title: 'Components/Atoms/Indicator',
  component: Indicator
}

export default meta

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: StoryObj<typeof Indicator> = (args: PropsIndicator) => <Indicator {...args} />
Default.args = {
  color: 'primary',
  size: 'small'
}
