import { StoryObj, Meta } from '@storybook/react'

import { RepositoryDocument } from '../components/RepositoryDocument'
import { fetchListRepositoryDocument } from '../services/fetchRepositoryDocument.service'
import { Button } from '@/components/atoms'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const mockedQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})

const ExampleRepository = () => (
  <QueryClientProvider client={mockedQueryClient}>
    <RepositoryDocument dataFetchService={fetchListRepositoryDocument} />
  </QueryClientProvider>
)

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof RepositoryDocument> = {
  title: 'Components/Organism/RepositoryDocument',
  component: ExampleRepository
}

export default meta

type Story = StoryObj<typeof RepositoryDocument>

const defaultProps = {}

const repositoryChildrenProps = {
  children: <Button content='textOnly' text='Add Repository' variant='solid' />
}

export const Default: Story = {
  args: defaultProps
}
export const RepositoryWithChildren: Story = {
  args: repositoryChildrenProps
}
