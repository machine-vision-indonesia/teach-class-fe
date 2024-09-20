import { lazy } from 'react'

const MdConsultan = lazy(() => import('./clusters/md-data/pages/md-consultan'))
const MdConsultanEdit = lazy(() => import('./clusters/md-data/pages/md-consultan/edit'))

const MdExample = lazy(() => import('./clusters/md-data/pages/md-example'))
const MdExampleEdit = lazy(() => import('./clusters/md-data/pages/md-example/edit'))

const exampleRoutes = [
  {
    path: 'md-consultant',
    children: [
      {
        index: true,
        element: <MdConsultan />
      },
      {
        path: 'edit',
        element: <MdConsultanEdit />
      }
    ]
  },
  {
    path: 'md-example',
    children: [
      {
        index: true,
        element: <MdExample />
      },
      {
        path: 'edit',
        element: <MdExampleEdit />
      }
    ]
  }
]

export default exampleRoutes
