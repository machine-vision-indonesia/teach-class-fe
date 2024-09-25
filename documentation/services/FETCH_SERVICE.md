# FETCH SERVICE

![MVDP Logo](https://static.wixstatic.com/media/eb21c1_0189d0cb1beb4ff0b9597d59abdebfac~mv2.png/v1/fill/w_201,h_58,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Machine%20Vision.png)

**Fetch Service** adalah custom hook yang di gunakan untuk melakukan requet ***GET*** ke ***server*** menggunakan protokol ***Rest Api***

## 📚 Standart

- **Nama File Style** : Nama file harus menggunakan ***cammelCase***
- **Nama File standart** : Nama file harus menggunakan prefix `fetch` dan suffix `.service.ts` ada beberapa jenis fetch service yang di gunakan, dengan format `fetch<jenis><namaEntity>.service.ts`, berikut adalah jenis jenis fetch service yang di gunakan :
  - `table` : untuk melakukan request untuk data tabel, contoh :
      >`fetchTableDpartment.service.ts`\
      >`fetchTableUser.service.ts`
  - `detail` : untuk melakukan request untuk data detail
      >`fetchDetailDpartment.service.ts`\
      >`fetchDetailUser.service.ts`
  - `ddl` : untuk melakukan request untuk data droppdown dan list
      >`fetchDetailDpartment.service.ts`\
      >`fetchDetailUser.service.ts`
  > [!NOTE]
  > jenis fetch dapat di tambahkan sesuai dengan komponen yang di gunakan. misalnya ada komponent kanban untuk entitas `user`, maka fetch service yang di gunakan adalah `fetchKanbanUser.service.ts`
- **Nama Function Style** : Nama function harus menggunakan ***PascalCase*** sesuai dengan nama file yang di gunakan contoh :

  ```ts
  export const FetchTableIssueCategory = async (data: any) => {}
  ```

- **Interface** : wajib menggunakan interface untuk menentukan tipe data hasil response yang akan di dapatkan dari server

  ```ts
  // ini adalah format response pasti yang akan di dapatkan dari server 
  // ketika melakukan request dalam bentuk list atau array
  // interface IResponse tidak perlu di ubah
  interface IResponse<T> {
    data: T[]
  }

  // ini adalah format expectasi data yang akan di dapatkan dari server
  // nama interfacenya bisa di sesuaikan dengan nama entity yang di gunakan
  // misalnya ada entity `user` maka interface nya adalah `FetchResponseGetTableUser`
  export interface FetchResponseGetTableIssueCategory {
    id: string,
    code: string
  }

  // interface FetchParametrs adalah interface untuk menentukan tipe filter yang akan di gunakan
  interface FetchParametrs extends IParams {
    search?: string,
    myDept?: string
  }
  ```

## 💻 Contoh Fetch Service

- **Contoh Code type Table***
  
  di bawah ini adalah contoh action service yang di gunakan untuk melakukan aksi ***GET*** dengan type ***Table*** menggunakan ***Rest Api***

  ```ts
  import { useQuery } from '@tanstack/react-query'
  import client from 'src/client'
  import { PREFIX_KEY } from 'src/constant/common'
  import { IParams } from 'src/types/master/filter'

  // ini adalah format response pasti yang akan di dapatkan dari server 
  // ketika melakukan request dalam bentuk list atau array
  // interface IResponse tidak perlu di ubah
  interface IResponse<T> {
    data: T[]
  }

  // ini adalah format expectasi data yang akan di dapatkan dari server
  // nama interfacenya bisa di sesuaikan dengan nama entity yang di gunakan
  // misalnya ada entity `user` maka interface nya adalah `FetchResponseGetTableUser`
  export interface FetchResponseGetTableIssueCategory {
    id: string,
    code: string
  }

  // interface FetchParametrs adalah interface untuk menentukan tipe filter yang akan di gunakan
  interface FetchParametrs extends IParams {
    search?: string,
    myDept?: string
  }

  /**
   * @NOTE hanya boleh ada satu PRIMARY_QUERY_KEY di dalam file, jika berbeda silahkan  buat file baru.
   * agar codenya lebih terstruktur dan lebih mudah di baca
   */
  const PRIMARY_QUERY_KEY = 'MT_ISSUE_CATEGORY' //-->> Table name in upercase

  /**
   *
   * @method GET
   * @param params
   * @returns response
   */

  export const FetchTableIssueCategory = <T>(params: FetchParametrs = {}) => {
    //ONLY CHANGE THE FUNCTION NAME AND MAKE SURE THE NAME IS NOT USED
    const requestOption: any = { retry: false }
    const queryParam: any = {
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
    }
    const keys = [PREFIX_KEY.GET, PRIMARY_QUERY_KEY, queryParam]

    const fetch = async <T>(params: IParams): Promise<IResponse<T>> => {
      const { data } = await client.api.get<IResponse<T>>('/items/mt_issue_category', {
        params
      })

      return data
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
  ```

  Contoh penggunaan fetch service di dalam component dapat di lihat seperti code di bawah ini
  
  ```tsx
  import { TableAsyncV2 } from 'src/directory/of/component/TableAsyncV2'
  import { FetchTableIssueCategory } from 'src/directory/of/service/ActionButton'


  export const Component = () => {
    /**
     * @NOTE untuk columns configuration silahkan lihat di storybook
     */
    const columns = []

    return (
      <TableAsyncV2
        dataFetchService={FetchTableIssueCategory}
        columns={columns}
        type='inline'
        resultController={[
          {
            key: 'name',
            name: 'Search Shift Name...',
            type: FilterType.SEARCH
          },
          {
            key: 'is_active',
            name: 'Filter by Status',
            type: FilterType.SELECT,
            valueKey: 'id',
            labelKey: 'name',
            options: [
              {
                id: true,
                name: 'Active'
              },
              {
                id: false,
                name: 'Not Active'
              }
            ]
          }
        ]}
      />
    )
  }
  ```
