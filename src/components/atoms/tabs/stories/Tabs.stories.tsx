import { Badge } from '@/components/atoms/badge'
import { Icon } from '@iconify/react'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Meta, StoryObj } from '@storybook/react'
import { Tabs } from '../components/Tabs'
import { PropsTabs } from '../types/tabs.type'

export default {
  title: 'Components/Atoms/Tabs',
  component: Tabs,
  argTypes: {
    activeTabs: { control: { type: 'text' } },
    data: {
      control: { type: 'object' },
      description: 'if you want to custom icon color, you can add properties iconColor in your Tabs Data '
    },
    color: { control: { type: 'radio' }, options: ['primary', 'success', 'error', 'warning', 'info', 'accent'] },
    centered: { control: { type: 'boolean' } },
    style: { control: { type: 'radio' }, options: ['line', 'button'] },
    size: { control: { type: 'radio' }, options: ['small', 'medium', 'large'] },
    variant: { control: { type: 'radio' }, options: ['standard', 'scrollable', 'fullWidth'] },
    onChange: { action: 'changed' }
  }
} as Meta<typeof Tabs>

type Story = StoryObj<typeof Tabs>

export const Default: Story = (args: PropsTabs) => <Tabs {...args} />
Default.args = {
  activeTabs: '1',
  data: [
    {
      renderContent: (
        <Typography>
          Cake apple pie chupa chups biscuit liquorice tootsie roll liquorice sugar plum. Cotton candy wafer wafer jelly
          cake caramels brownie gummies.
        </Typography>
      ),
      label: 'Home',
      // icon: 'iconamoon:home'
    },
    {
      renderContent: (
        <Typography>
          Cake apple pie chupa chups biscuit liquorice tootsie roll liquorice sugar plum. Cotton candy wafer wafer jelly
          cake caramels brownie gummies.
        </Typography>
      ),
      label: 'Content',
      // icon: 'ph:warning',
      // iconColor: 'error'
    }
  ]
}

export const Button: Story = (args: PropsTabs) => <Tabs {...args} />
Button.args = {
  activeTabs: '1',
  style: 'button',
  data: [
    {
      renderContent: (
        <Typography>
          Cake apple pie chupa chups biscuit liquorice tootsie roll liquorice sugar plum. Cotton candy wafer wafer jelly
          cake caramels brownie gummies.
        </Typography>
      ),
      label: '1'
    },
    {
      renderContent: (
        <Typography>
          Cake apple pie chupa chups biscuit liquorice tootsie roll liquorice sugar plum. Cotton candy wafer wafer jelly
          cake caramels brownie gummies.
        </Typography>
      ),
      label: '2'
    }
  ]
}

export const CustomIcon: Story = (args: PropsTabs) => <Tabs {...args} />
CustomIcon.args = {
  activeTabs: '1',
  data: [
    {
      renderIcon: (
        <Icon
          icon={"iconamoon:home"}
          style={{
            marginRight: 5
          }}
          className='summary-icon'
          fontSize={'18px'}
        />
      ),
      renderContent: (
        <Typography>
          Cake apple pie chupa chups biscuit liquorice tootsie roll liquorice sugar plum. Cotton candy wafer wafer jelly
          cake caramels brownie gummies.
        </Typography>
      ),
      label: 'Home',
    },
    {
      renderIcon: (
        <Box mr={1}>
          <Badge
            label={'3'}
            color={'primary'}
            style={'circular'}
            isTransparent
          />
        </Box>
      ),
      renderContent: (
        <Typography>
          Cake apple pie chupa chups biscuit liquorice tootsie roll liquorice sugar plum. Cotton candy wafer wafer jelly
          cake caramels brownie gummies.
        </Typography>
      ),
      label: 'Content',
    },
    {
      renderContent: (
        <Typography>
          Cake apple pie chupa chups biscuit liquorice tootsie roll liquorice sugar plum. Cotton candy wafer wafer jelly
          cake caramels brownie gummies.
        </Typography>
      ),
      label: 'Text Only Tab',
    },
  ]
}

CustomIcon.parameters = {
  docs: {
    source: {
      code: `
      <Tabs
      activeTabs="1"
      data={[
        {
          label: 'Home',
          renderContent: <Typography>
            Cake apple pie chupa chups biscuit liquorice tootsie roll liquorice sugar plum. Cotton candy wafer wafer jelly
            cake caramels brownie gummies.
          </Typography>,
          renderIcon: <Icon
            icon={"iconamoon:home"}
            style={{
              marginRight: 5
            }}
            className='summary-icon'
            fontSize={'18px'}
          />
        },
        {
          label: 'Content',
          renderContent: <Typography>
            Cake apple pie chupa chups biscuit liquorice tootsie roll liquorice sugar plum. Cotton candy wafer wafer jelly
            cake caramels brownie gummies.
          </Typography>,
          renderIcon: <Box mr={1}>
            <Badge
              label={'3'}
              color={'primary'}
              style={'circular'}
              isTransparent
            />
          </Box>
        },
        {
          label: 'Text Only Tab',
          renderContent: <Typography>
            Cake apple pie chupa chups biscuit liquorice tootsie roll liquorice sugar plum. Cotton candy wafer wafer jelly
            cake caramels brownie gummies.
          </Typography>
        }
      ]}
      onChange={() => {}}
    />
      `
    }
  }
}