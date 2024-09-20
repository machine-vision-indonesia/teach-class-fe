import { type NextPage } from 'next'
import { type ReactNode } from 'react'
import { getLayout } from 'src/layouts/Layout'

const BlankPage: NextPage = () => {
  return <div>Blank Page</div>
}

BlankPage.getLayout = (page: ReactNode) => getLayout(page)

export default BlankPage
