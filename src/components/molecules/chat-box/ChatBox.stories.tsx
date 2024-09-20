import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ChatBox } from './ChatBox'
import { ActionSaveDiscussionHistoryExample } from './action-discussion-history.example.service'
import { GetChatDisussionHistoryExample } from './chat-discussion-history.example.service'
import { GetRealtimeMessage } from './chat-realtime-message.example.service'

export default {
  title: 'Components/Molecules/ChatBox',
  component: ChatBox,
  argTypes: {}
} as ComponentMeta<typeof ChatBox>

const Template: ComponentStory<typeof ChatBox> = args => <ChatBox {...args} />

export const Default: ComponentStory<typeof ChatBox> = Template.bind([])
Default.args = {
  documentKey: '021a6265-ea37-4ee5-96eb-a00c3321958d',
  actionSaveService: ActionSaveDiscussionHistoryExample,
  dataFetchService: GetChatDisussionHistoryExample,
  realtimeMessageService: GetRealtimeMessage
}
