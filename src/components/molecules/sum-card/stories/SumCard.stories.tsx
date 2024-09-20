import { Meta, StoryObj } from '@storybook/react'
import { SumCard } from '../components/SumCard'
import { PropsSumCard } from '../types/SumCard.type'
import { Icon } from '@iconify/react/dist/iconify.js'

export default {
  title: 'Components/Molecules/SumCard',
  component: SumCard,
  argTypes: {
    color: { defaultValue: 'primary' },
    style: { defaultValue: 'prefix' },
    variant: { defaultValue: 'dropdown' }
  }
} as Meta<typeof SumCard>

type Story = StoryObj<typeof SumCard>

export const Default: Story = (args: PropsSumCard) => <SumCard {...args} />
Default.args = {
  title: 'Title',
  description: 'Description',
  style: 'outlined',
  variant: 'right',
  icon: <Icon icon='tabler:building-factory' fontSize={'24px'} color='#3EB645' />,
  backgroundIconColor: '#ECF8EC',
  totalNumber: 10
}

export const Elevation: Story = (args: PropsSumCard) => <SumCard {...args} />
Elevation.args = {
  title: 'Title',
  description: 'Description',
  style: 'elevation',
  variant: 'right',
  icon: <Icon icon='tabler:building-factory' fontSize={'24px'} color='#3EB645' />,
  backgroundIconColor: '#ECF8EC',
  totalNumber: 10
}

export const LeftSumCard: Story = (args: PropsSumCard) => <SumCard {...args} />
LeftSumCard.args = {
  style: 'outlined',
  variant: 'left',
  icon: <Icon icon='tabler:building-factory' fontSize={'24px'} color='#3EB645' />,
  backgroundIconColor: '#ECF8EC',
  totalNumber: 10,
  statusLabel: 'Progress'
}

export const LeftSumCardElevation: Story = (args: PropsSumCard) => <SumCard {...args} />
LeftSumCardElevation.args = {
  style: 'elevation',
  variant: 'left',
  icon: <Icon icon='tabler:building-factory' fontSize={'24px'} color='#3EB645' />,
  backgroundIconColor: '#ECF8EC',
  totalNumber: 10,
  statusLabel: 'Progress'
}
