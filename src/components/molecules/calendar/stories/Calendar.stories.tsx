import { StoryObj, Meta } from '@storybook/react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Calendar from '../components/Calendar'
import { fetchListCalendar } from '../services/fetchCalendar.service'

const mockedQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})

const ExampleCalendar = () => (
  <QueryClientProvider client={mockedQueryClient}>
    <Calendar dateKey='date' dataFetchService={fetchListCalendar} />
  </QueryClientProvider>
)

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Calendar> = {
  title: 'Components/Organism/Calendar',
  component: ExampleCalendar,
  parameters: {
    layout: 'fullscreen'
  }
}

export default meta

type Story = StoryObj<typeof Calendar>

const defaultProps = {}

export const Default: Story = {
  args: defaultProps
}

export const defaultWithChildren: Story = {
  render: () => <Calendar dateKey='date' isAddEvent={true} dataFetchService={fetchListCalendar} />
}
