import type { Meta, StoryObj } from '@storybook/react'
import { ButtonAction } from '../components/ButtonAction'
import { PropsButtonAction } from '../types/buttonAction.types'
import { ModalDialog } from '@/components/molecules/modal-dialog'
import { Box } from '@mui/material'
import { MvTypography } from '@/components/atoms/mv-typography'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ButtonAction> = {
  title: 'Components/Organism/ButtonAction',
  component: ButtonAction,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta

// With named export we define component's story
export const Default: StoryObj<typeof ButtonAction> = (args: PropsButtonAction) => (
  <ButtonAction {...args} />
)

Default.args = {
  text: '+ Button Action',
  variant: 'contained',
  modalOptions: 'default',
  payload: {},
  actionService: () => null,
}

export const ModalRemark: StoryObj<typeof ButtonAction> = (args: React.JSX.IntrinsicAttributes & PropsButtonAction) => (
  <ButtonAction {...args} />
)

ModalRemark.args = {
  text: '+ Button Action',
  variant: 'contained',
  modalOptions: 'remark',
  color: 'warning',
  confirmationStatusVariant: 'warning',
  payload: {
    id: '789'
  },
  actionService: () => null,
}


export const ModalCustom: StoryObj<typeof ButtonAction> = (args: React.JSX.IntrinsicAttributes & PropsButtonAction) => (
  <ButtonAction {...args} />
)

ModalCustom.args = {
  text: '+ Button Action',
  variant: 'contained',
  modalOptions: 'custom',
  color: 'error',
  renderConfirmationContent: ({ openConfirmation, setOpenConfirmation, payload, service }) => {
    return (
      <ModalDialog
        isOpen={openConfirmation}
        title={`Custom?`}
        description={'Custom!'}
        position={'left'}
        closeable={true}
        positiveLabel={'Yes, Custom!'}
        negativeLabel={'Cancel'}
        maxWidth={'xs'}
        size={'medium'}
        positionActionButton={'right'}
        typeVariant={'confirmation'}
        statusVariant={'danger'}
        renderContent={() => {
          return (
            <Box>
              <MvTypography size='BODY_LG_BOLDEST' typeSize='PX'>This is Custom Content</MvTypography>
            </Box>
          )
        }}
        onOk={async () => {
          await service.mutateAsync({ ...payload })
          setOpenConfirmation(false)
        }}
        onClose={() => setOpenConfirmation(false)}
      ></ModalDialog>
    )
  },
  payload: {
    id: '789'
  },
  actionService: () => null,
}
