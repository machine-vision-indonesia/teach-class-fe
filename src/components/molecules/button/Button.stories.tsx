import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Button } from './Button'

export default {
  title: 'Components/Molecules/Button',
  component: Button
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = arg => <Button {...arg} />

const args = { icon: 'tabler:plus' }

export const SmallButton: ComponentStory<typeof Button> = Template.bind([])
SmallButton.args = { ...args, size: 'small' }
export const Default: ComponentStory<typeof Button> = Template.bind([])
Default.args = { ...args }
export const LargeButton: ComponentStory<typeof Button> = Template.bind([])
LargeButton.args = { ...args, size: 'large' }

export const SecondaryButton: ComponentStory<typeof Button> = Template.bind([])
SecondaryButton.args = { ...args, variant: 'secondary' }
export const TransparentButton: ComponentStory<typeof Button> = Template.bind([])
TransparentButton.args = { ...args, variant: 'transparent' }

export const CustomButton: ComponentStory<typeof Button> = Template.bind([])
CustomButton.args = { ...args, style: 'custom', text: 'description' }

export const ButtonView: ComponentStory<typeof Button> = Template.bind([])
ButtonView.args = { ...args, isButtonView: true, data: [{ ...args, variant: 'transparent' }, { ...args }] }

export const ClickedButton: ComponentStory<typeof Button> = Template.bind([])
ClickedButton.args = { ...args, onClick: () => alert('Button Clicked!') }

export const HoveredButton: ComponentStory<typeof Button> = Template.bind([])
HoveredButton.args = { ...args, onMouseEnter: () => alert('Button Hovered!') }
