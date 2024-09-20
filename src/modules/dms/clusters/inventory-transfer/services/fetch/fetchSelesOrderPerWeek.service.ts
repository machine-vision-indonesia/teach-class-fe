import { IParams } from 'src/types/master/filter'
import client from 'src/client'
import { useQuery } from '@tanstack/react-query'
import { PREFIX_KEY } from 'src/constant/common'

/**
 * @NOTE
 * satu file satu context yang sama misalnya entity yang sama atau context yang sama
 * boleh ada GET,POST,PATCH,DELETE
 */

interface IResponse<T> {
  data: SalesOrdersPerWeek
}

export interface IRequest extends IParams {}

export interface IUser {
  id?: string
}

interface Material {
  materialName: string;
  materialCode: string;
  batchNumber: string;
  from: string;
  to: string;
  type: string;
  quantity: number;
  unit: string;
}

interface SalesOrder {
  soNumber: number;
  dpNumber: number;
  date: string;
  materials: Material[];
}

interface OrderPerDay {
  date: string;
  totalSalesOrder: number;
  salesOrders: SalesOrder[];
}

interface SalesOrdersPerWeek {
  from: string;
  to: string;
  orders: OrderPerDay[];
}

const salesOrdersPerWeekMock: SalesOrdersPerWeek = {
  from: "07/08/2024",
  to: "13/08/2024",
  orders: [
    {
      date: "August 8, 2023 | Monday",
      totalSalesOrder: 2,
      salesOrders: [
        {
          soNumber: 23,
          dpNumber: 432,
          date: "08/08/2023",
          materials: [
            {
              materialName: "Material A",
              materialCode: "MaterialA001",
              batchNumber: "BatchNum001",
              from: "KBI",
              to: "Jababeka",
              type: "Raw Material",
              quantity: 20,
              unit: "Pcs"
            },
            {
              materialName: "Material B",
              materialCode: "MaterialB002",
              batchNumber: "BatchNum002",
              from: "KBI",
              to: "Jababeka",
              type: "Raw Material",
              quantity: 30,
              unit: "Pcs"
            }
          ]
        },
        {
          soNumber: 42,
          dpNumber: 542,
          date: "08/08/2023",
          materials: [
            {
              materialName: "Material A",
              materialCode: "MaterialA001",
              batchNumber: "BatchNum001",
              from: "KBI",
              to: "Jababeka",
              type: "Raw Material",
              quantity: 20,
              unit: "Pcs"
            },
            {
              materialName: "Material B",
              materialCode: "MaterialB002",
              batchNumber: "BatchNum002",
              from: "KBI",
              to: "Jababeka",
              type: "Raw Material",
              quantity: 30,
              unit: "Pcs"
            }
          ]
        }
      ]
    },
    {
      date: "August 9, 2023 | Tuesday",
      totalSalesOrder: 1,
      salesOrders: [
        {
          soNumber: 33,
          dpNumber: 533,
          date: "09/08/2023",
          materials: [
            {
              materialName: "Material C",
              materialCode: "MaterialC003",
              batchNumber: "BatchNum003",
              from: "KBI",
              to: "Jababeka",
              type: "Raw Material",
              quantity: 10,
              unit: "Pcs"
            },
            {
              materialName: "Material D",
              materialCode: "MaterialD004",
              batchNumber: "BatchNum004",
              from: "KBI",
              to: "Jababeka",
              type: "Raw Material",
              quantity: 15,
              unit: "Pcs"
            }
          ]
        }
      ]
    },
    {
      date: "August 10, 2023 | Wednesday",
      totalSalesOrder: 1,
      salesOrders: [
        {
          soNumber: 44,
          dpNumber: 644,
          date: "10/08/2023",
          materials: [
            {
              materialName: "Material E",
              materialCode: "MaterialE005",
              batchNumber: "BatchNum005",
              from: "KBI",
              to: "Jababeka",
              type: "Raw Material",
              quantity: 25,
              unit: "Pcs"
            },
            {
              materialName: "Material F",
              materialCode: "MaterialF006",
              batchNumber: "BatchNum006",
              from: "KBI",
              to: "Jababeka",
              type: "Raw Material",
              quantity: 35,
              unit: "Pcs"
            }
          ]
        }
      ]
    },
    {
      date: "August 11, 2023 | Thursday",
      totalSalesOrder: 1,
      salesOrders: [
        {
          soNumber: 55,
          dpNumber: 755,
          date: "11/08/2023",
          materials: [
            {
              materialName: "Material G",
              materialCode: "MaterialG007",
              batchNumber: "BatchNum007",
              from: "KBI",
              to: "Jababeka",
              type: "Raw Material",
              quantity: 40,
              unit: "Pcs"
            }
          ]
        }
      ]
    },
    {
      date: "August 12, 2023 | Friday",
      totalSalesOrder: 1,
      salesOrders: [
        {
          soNumber: 66,
          dpNumber: 866,
          date: "12/08/2023",
          materials: [
            {
              materialName: "Material H",
              materialCode: "MaterialH008",
              batchNumber: "BatchNum008",
              from: "KBI",
              to: "Jababeka",
              type: "Raw Material",
              quantity: 50,
              unit: "Pcs"
            }
          ]
        }
      ]
    },
    {
      date: "August 13, 2023 | Saturday",
      totalSalesOrder: 1,
      salesOrders: [
        {
          soNumber: 77,
          dpNumber: 977,
          date: "13/08/2023",
          materials: [
            {
              materialName: "Material I",
              materialCode: "MaterialI009",
              batchNumber: "BatchNum009",
              from: "KBI",
              to: "Jababeka",
              type: "Raw Material",
              quantity: 60,
              unit: "Pcs"
            }
          ]
        }
      ]
    }
  ]
};


/**
 * @NOTE hanya boleh ada satu PRIMARY_QUERY_KEY di dalam file, jika berbeda silahkan buat file baru.
 * agar codenya lebih terstruktur dan lebih mudah di baca
 */
const PRIMARY_QUERY_KEY = 'SELES_ORDER_PER_WEEK'

/**
 *
 * @method GET
 * @param params
 * @returns response
 */
export const fetchSalesOrdersPerWeek = <T>(params: IRequest) => {
  const queryParam: any = {
    fields: ['*', 'avatar.*'],
    ...params
  }

  const keys = [PREFIX_KEY.GET, PRIMARY_QUERY_KEY, queryParam]

  const fetch = async <T>(params: IRequest): Promise<IResponse<T>> => {
    // const { data } = await client.api.get<IResponse<T>>('/users/' + params.userId)

    const data = salesOrdersPerWeekMock

    return {data}
  }

  return useQuery<IResponse<T>, Error>({
    queryKey: keys,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    queryFn: () => fetch<T>(queryParam),
    retry: false
  })
}
