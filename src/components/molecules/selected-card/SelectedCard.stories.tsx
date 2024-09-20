import { type Meta, type StoryObj } from '@storybook/react'
import { SelectedCard } from './SelectedCard'

const meta: Meta<typeof SelectedCard> = {
  title: 'Components/Molecules/SelectedCard',
  args: {
    label: 'Metal Appearance',
    description: 'ma001',
    actionButton: 'more',
    cardType: 'none'
  },
  component: SelectedCard,
  parameters: {
    docs: {
      source: {
        code: `
import { SelectedCard } from './SelectedCard'

export default function Page() {
  return (
    <>
      <SelectedCard label='Metal Appearance' description='ma001' actionButton='more' cardType='none' />
    </>
  )
}
        `,
        language: 'tsx'
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof SelectedCard>

export const Default: Story = {
  args: {
    label: 'Metal Appearance',
    description: 'ma001',
    actionButton: 'more',
    cardType: 'none'
  },
  parameters: {
    docs: {
      source: {
        code: `
import { SelectedCard } from './SelectedCard'

export default function Page() {
  return (
    <>
      <SelectedCard label='Metal Appearance' description='ma001' actionButton='more' cardType='none' />
    </>
  )
}
        `,
        language: 'tsx'
      }
    }
  }
}

export const SelectedCardWithActionButton: Story = {
  args: {
    label: 'Department B',
    description: 'code : dept 8',
    actionButton: 'editable',
    cardType: 'none'
  },
  parameters: {
    docs: {
      source: {
        code: `
import { SelectedCard } from './SelectedCard'

export default function Page() {
  return (
    <>
      <SelectedCard label='Department B' description='code : dept 8' actionButton='editable' cardType='none' />
    </>
  )
}
        `,
        language: 'tsx'
      }
    }
  }
}

const SelectedCardWithImageAndButton = () => {
  return (
    <>
      <SelectedCard
        color='light'
        label='Front [Component]'
        description='FRONT COMPONENT'
        actionButton='editable'
        cardType='withImage'
        imagePath='https://plus.unsplash.com/premium_photo-1661741451945-73f20b35ad9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcwMzI2MjIzMA&ixlib=rb-4.0.3&q=80&w=1080'
      />
    </>
  )
}

export const SelectedCardWithImage: Story = {
  parameters: {
    docs: {
      source: {
        code: `
import { SelectedCard } from './SelectedCard'

export default function Page() {
  return (
    <>
      <SelectedCard
        label='Front [Component]'
        description='FRONT COMPONENT'
        actionButton='editable'
        cardType='withImage'
        imagePath='https://plus.unsplash.com/premium_photo-1661741451945-73f20b35ad9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcwMzI2MjIzMA&ixlib=rb-4.0.3&q=80&w=1080'
      />
    </>
  )
}
        `,
        language: 'tsx'
      }
    }
  },
  render: () => <SelectedCardWithImageAndButton />
}

const SelectedCardWithIconAndButton = () => {
  return (
    <>
      <SelectedCard
        color='light'
        label='Level Test 1.1'
        description='VFT - 12'
        actionButton='editable'
        cardType='withIcon'
        iconName='mdi:cog-outline'
      />
    </>
  )
}

export const SelectedCardWithIcon: Story = {
  parameters: {
    docs: {
      source: {
        code: `
import { SelectedCard } from './SelectedCard'

export default function Page() {
  return (
    <>
     <SelectedCard
        label='Level Test 1.1'
        description='VFT - 12'
        actionButton='editable'
        cardType='withIcon'
        iconName='mdi:cog-outline'
      />
    </>
  )
}
        `,
        language: 'tsx'
      }
    }
  },
  render: () => <SelectedCardWithIconAndButton />
}

const SelectedCardWithActionStatus = () => {
  return (
    <>
      <SelectedCard
        color='light'
        label='Action Plan 2'
        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        actionButton='status'
        cardType='none'
      />
    </>
  )
}

export const SelectedCardWithStatus: Story = {
  parameters: {
    docs: {
      source: {
        code: `
import { SelectedCard } from './SelectedCard'

export default function Page() {
  return (
    <>
     <SelectedCard
        label='Action Plan 2'
        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        actionButton='status'
        cardType='none'
      />
    </>
  )
}
        `,
        language: 'tsx'
      }
    }
  },
  render: () => <SelectedCardWithActionStatus />
}
