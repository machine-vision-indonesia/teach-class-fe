import { StoryObj, Meta } from '@storybook/react'
import { PropsComment } from '../types/Comment.type';
import { Comment } from '../components/Comment';
import { fetchListComment } from '../services/fetchListComment.service';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const mockedQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const ExampleComment = () => (
  <QueryClientProvider client={mockedQueryClient}>
    <Comment dataFetchService={fetchListComment} />
  </QueryClientProvider>
)

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Comment> = {
  title: 'Components/Organism/Comment',
  component: ExampleComment,
  parameters: {
    layout: 'fullscreen',
  }
};

export default meta;

type Story = StoryObj<typeof Comment>

const defaultProps: Partial<PropsComment> = {
  dataFetchService: fetchListComment
}

export const Default: Story = {
  args: defaultProps,
}
