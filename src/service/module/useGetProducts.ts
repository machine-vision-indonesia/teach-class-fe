import { useQuery } from '@tanstack/react-query'
import client from 'src/client'
import { PREFIX_KEY } from 'src/constant/common'

type GetProductsResponse = {
  data: Product[]
}

type Product = {
  id: string
  name: string
  main_page: string | null
}

const params = {
  fields: ['id', 'name', 'main_page'],
  sort: ['sort']
}

async function getProducts() {
  const response = await client.api.get<GetProductsResponse>(URL, {
    params
  })

  return response.data
}

/**
 * @NOTE hanya boleh ada satu PRIMARY_QUERY_KEY di dalam file, jika berbeda silahkan buat file baru.
 * agar codenya lebih terstruktur dan lebih mudah di baca
 */
const PRIMARY_QUERY_KEY = 'PRODUCTS'
const URL = '/items/mt_products'

/**
 *
 * @method GET
 * @param params
 * @returns response
 */
export const useGetProducts = () => {
  const key = [PREFIX_KEY.GET, PRIMARY_QUERY_KEY, params]

  return useQuery({ queryKey: key, queryFn: getProducts })
}
