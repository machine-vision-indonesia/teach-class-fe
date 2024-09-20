import Typography from '@mui/material/Typography'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import client from 'src/client'
import { CircularProgress } from 'src/components/atoms/circular-progress/CircularProgress'
import { type Page as CurrentUserPage } from 'src/types/directus/current-user'

type GetPageResponse = {
  data: Page
}

type Page = {
  url: string
}

type GetPageParams = Pick<CurrentUserPage, 'id'>

async function getPage(params: GetPageParams) {
  const response = await client.api.get<GetPageResponse>(`/items/mt_pages/${params.id}`, {
    params: {
      fields: ['url']
    }
  })

  return response.data.data
}

export default function EmbedPage() {
  const router = useRouter()
  const getPageQuery = useQuery({
    queryKey: ['mt_pages', { id: router.query.id }],
    queryFn: () => getPage({ id: router.query.id as string }), // TODO: Hindari type casting
    enabled: router.isReady && !!router.query.id
  })

  if (getPageQuery.isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </div>
    )
  }

  if (getPageQuery.isError) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Typography variant='body1'>Something went wrong. Please try to refresh the page</Typography>
      </div>
    )
  }

  return <iframe src={getPageQuery.data.url} style={{ width: '100%', height: '100%', border: 0 }} />
}
