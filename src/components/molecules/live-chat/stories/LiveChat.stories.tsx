import { StoryObj, Meta } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fetchInfiniteChat } from '../services/chat.service'
import { usePostChat, useUploadFileChat } from '../hooks/useActionChat'
import { IChatProps } from '../types/liveChat.types'
import { useGetRealitmeChat } from '../services/realtimeChat.service'
import { useState } from 'react'
import { LiveChat } from '../components/LiveChat'

const mockedQueryClinet = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: 'offlineFirst'
    }
  }
})

const MockedComponent = () => {
  const [onProgress, setOnProgress] = useState<number>(0)

  const chatMutate = usePostChat()
  const chatUploadMutate = useUploadFileChat(setOnProgress)
  const fetchRealtimeChat = useGetRealitmeChat()

  return (
    <QueryClientProvider client={mockedQueryClinet}>
      <LiveChat
        realtimeChatService={fetchRealtimeChat}
        dataFetchService={fetchInfiniteChat}
        chatMutation={chatMutate}
        uploadFileMutation={chatUploadMutate}
        progress={onProgress}
      />
    </QueryClientProvider>
  )
}

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Comment> = {
  title: 'Components/Organism/LiveChat',
  component: MockedComponent,
  parameters: {
    layout: 'fullscreen'
  }
}

export default meta

type Story = StoryObj<typeof LiveChat>

const defaultProps: Partial<IChatProps> = {
  dataFetchService: fetchInfiniteChat
}

export const Default: Story = {
  args: defaultProps
}
