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
  url: 'http://45.76.185.62:8055/items/issues',
  params: {
    'filter[_or][0][issue_category_id][related_departments][department_id][id][_in][0]': '<<myDept>>',
    'filter[_or][1][issue_category_id][dept_owner_id][id][_eq]': '<<myDept>>',
    fields: 'issue_number,reported_at,name,issue_category_id.dept_owner_id.id,issue_category_id.dept_owner_id.name,status_id.color,status_id.is_active,status_id.code,status_id.name,action_plans.id,action_plans.ap_status,issue_category_id.id,issue_category_id.code,severity_id.id,severity_id.code,severity_id.color,rcas.method_id.name'
  },
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM2NmQxZDQzLTk3MTEtNDViMy05ZGFkLWViYjIzYTMzNDM3YyIsInJvbGUiOiJhNTEyZDk2ZC1hNDkzLTRhZmUtOWRkMS00YTVmYWFkZGM0YjMiLCJhcHBfYWNjZXNzIjp0cnVlLCJhZG1pbl9hY2Nlc3MiOnRydWUsImlhdCI6MTcwOTc4MjE3OCwiZXhwIjoxNzA5NzgzMDc4LCJpc3MiOiJkaXJlY3R1cyJ9.0X0B8WUEE0gUZySsPCMgB3TKnF__KWIp4qZQ7vnzi-8'
  }
};

try {
  const { data } = await axios.request(options);
  console.log(data);
} catch (error) {
  console.error(error);
}"
5. Response body, "
{
  "data": [
    {
      "issue_number": "#asdasdasd0028",
      "reported_at": "2024-02-27T17:16:32",
      "name": "asdasdasdasdasdasd",
      "issue_category_id": {
        "id": "4c6ad07c-2368-4559-96cb-a0d596d6dced",
        "code": "Code 1",
        "dept_owner_id": {
          "id": "04f73816-f138-486f-bf52-bf433a5d612f",
          "name": "Main Department"
        }
      },
      "status_id": {
        "color": "4617b5",
        "is_active": true,
        "code": "REPORTED",
        "name": "Reported"
      },
      "action_plans": [],
      "severity_id": {
        "id": "f3651be8-34f3-42dd-ada1-cf534ba46dff",
        "code": "C",
        "color": "FFA500"
      },
      "rcas": []
    }
  ]
}"
*/
import { useQuery } from '@tanstack/react-query'
import client from 'src/client'
import { PREFIX_KEY } from 'src/constant/common'
import { IParams } from 'src/types/master/filter'

interface IResponse<T> {
  data: T[]
  meta: {
    filter_count: number
  }
}

//^^ above code are template you dont need to change anything
// FetchResponse+GetDropDownIssueCategory ->> from request function name

export interface FetchResponseGetDropDownIssueCategory {
  id: string
  code: string
}

// varible releted to the request
interface FetchParametrs extends IParams {
  search?: string //-->> Change to your request parameters
  myDept?: string //-->> Change to your request parameters
}

const PRIMARY_QUERY_KEY = 'MT_ISSUE_CATEGORY' //-->> Table name in upercase
//^^ below code are template you dont need to change anything

/**
 *
 * @method GET
 * @param params
 * @returns response
 */

export const GetDropDownIssueCategory = <T>(params: FetchParametrs = {}) => {
  //ONLY CHANGE THE FUNCTION NAME AND MAKE SURE THE NAME IS NOT USED
  const requestOption: any = { retry: false }
  const queryParam: any = {
    // covert request param from API documentation
    //^^ above code are template you dont need to change anything

    'filter[_and][0][is_active][_eq]': true,
    'filter[_and][1][_or][0][dept_owner_id][_eq]': params.myDept,
    'filter[_and][1][_or][1][related_departments][department_id][id][_in][0]': params.myDept,
    fields: [
      'id',
      'code',
      'std_issue_approvals',
      'std_issue_approvals.approval_order',
      'std_issue_approvals.approver',
      'related_departments',
      'dept_owner_id'
    ],
    limit: -1,
    ...params

    //^^ below code are template you dont need to change anything
  }
  const keys = [PREFIX_KEY.GET, PRIMARY_QUERY_KEY, queryParam]

  const fetch = async <T>(params: IParams): Promise<IResponse<T>> => {
    //^^ above code are template you dont need to change anything

    const { data } = await client.api.get<IResponse<T>>('/items/mt_issue_category', {
      // the path from hoppscotch
      //^^ below code are template you dont need to change anything

      params
    })

    return data
  }

  if (params?.search) {
    queryParam.filter._and.push({ name: { _contains: params.search } })
  }

  if (params.page) {
    requestOption.keepPreviousData = true
  }

  return useQuery<IResponse<T>, Error>({
    queryKey: keys,
    queryFn: () => fetch<T>(queryParam),
    onErrorThrown: (error: Error) => {
      console.error('Error fetching data:', error)

      // You can add custom error handling logic here
    },
    ...requestOption
  })
}
