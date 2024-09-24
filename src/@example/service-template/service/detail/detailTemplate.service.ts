/**
* There are 5 section of code that dont need to change, with line separator noted as:
* //^^ above code are template you dont need to change anything
* //^^ below code are template you dont need to change anything
*
* Sample input
1. Sequence, [1]
2. Type, [table]
3. Tittle,  list_issue_select_issue_category
4. Axios script, ex : "

import axios from 'axios';

const options = {
  method: 'GET',
  url: 'http://45.76.185.62:8055/items/issues/90e5b59f-ebbd-4daf-93b8-79641838770b',
  params: {
    fields: 'name,issue_category_id.id,reported_at,severity_id.id,severity_id.name'
  },
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNkYjcxMmM1LTk4MDEtNDg4Ni05YmRiLTM1MDE1YzBiOWExMyIsInJvbGUiOiI3NDYxN2ZjMi1hM2U4LTRhZGUtYWU1MC03MzA0MjI5Y2JlNTIiLCJhcHBfYWNjZXNzIjp0cnVlLCJhZG1pbl9hY2Nlc3MiOnRydWUsImlhdCI6MTcwOTc5NjY1OSwiZXhwIjoxNzA5Nzk3NTU5LCJpc3MiOiJkaXJlY3R1cyJ9.6onxBFm6lgxyuKpuMNfk60HaZ9TgEmIXq7bf8nAc3-g'
  }
};

try {
  const { data } = await axios.request(options);
  console.log(data);
} catch (error) {
  console.error(error);
}

5. Response body, "
{
  "data": {
    "name": "asdasdasdasdasdasd",
    "reported_at": "2024-02-27T17:16:32",
    "issue_category_id": {
      "id": "4c6ad07c-2368-4559-96cb-a0d596d6dced"
    },
    "severity_id": {
      "id": "39c16b7f-24d8-49b7-8c55-44ce71d17ef4",
      "name": "Informational edit "
    }
  }
}
*/

import { useQuery } from '@tanstack/react-query'
import client from 'src/client'
import { PREFIX_KEY } from 'src/constant/common'
import { IParams } from 'src/types/master/filter'

interface IResponse<T> {
  data: T
  meta: {
    filter_count: number
  }
}

//^^ above code are template you dont need to change anything
interface FetchParametrs extends IParams {
  documentId: string //-->> Change to your request parameters
}

const PRIMARY_QUERY_KEY = 'GENEAL_INFO_SKA' //-->> Table name in upercase
//^^ below code are template you dont need to change anything
/**
 *
 * @method GET
 * @param params
 * @returns response
 */
export const GetGeneralInfoSka = <T>(params: FetchParametrs) => {
  const requestOption: any = { retry: false }
  const keys = [PREFIX_KEY.GET, PRIMARY_QUERY_KEY, params]

  //^^ above code are template you dont need to change anything

  const fetch = async <T>(params: FetchParametrs): Promise<IResponse<T>> => {
    const { data } = await client.api.get<IResponse<T>>('/items/trx_document/' + params.documentId)

    // the path from hoppscotch
    //^^ below code are template you dont need to change anything
    return data
  }

  return useQuery<IResponse<T>, Error>({
    queryKey: keys,
    queryFn: () => fetch<T>(params),
    ...requestOption
  })
}
