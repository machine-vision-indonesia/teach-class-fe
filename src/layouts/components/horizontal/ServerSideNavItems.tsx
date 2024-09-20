// ** React Imports
import { useEffect, useState } from 'react'

// ** Axios Import
import axios from 'axios'

// ** Type Import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'
import { makeMock } from 'src/@fake-db/mock'

const ServerSideNavItems = () => {
  // ** State
  const [menuItems, setMenuItems] = useState<HorizontalNavItemsType>([])

  useEffect(() => {
    makeMock.get('/api/horizontal-nav/data').then(response => {
      const menuArray = response.data

      setMenuItems(menuArray)
    })
  }, [])

  return { menuItems }
}

export default ServerSideNavItems
