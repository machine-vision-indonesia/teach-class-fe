# ACTION SERVICE

![MVDP Logo](https://static.wixstatic.com/media/eb21c1_0189d0cb1beb4ff0b9597d59abdebfac~mv2.png/v1/fill/w_201,h_58,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Machine%20Vision.png)

**Action Service** Action service adalah custom hook yang di gunakan untuk melakukan aksi ***POS, PUT, PATCH, DELETE*** yang di kirim ke ***server*** menggunakan protokol ***Rest Api***

## 📚 Standart

- **Nama File Style** : Nama file harus menggunakan ***cammelCase***
- **Nama File standart** : Nama file harus menggunakan Prefix `action` contoh :
  
  > `actionSaveData.service.ts` \
  > `actionDeleteData.service.ts`
- **Nama Function Style** : Nama function harus menggunakan ***cammelCase*** sesuai dengan nama file yang di gunakan contoh :

  ```ts
  export const actionSaveData = async (data: any) => {}
  ```

- **Interface** : wajib menggunakan interface untuk menentukan tipe data yang payload yang akan di gunakan

  ```ts
  export interface IRequestBodyActionSubmit extends ICommonDto {
    id: string,
    name: string,
    code: string
  }
  ```

## 💻 Contoh Action service

- **Contoh Code**
  
  di bawah ini adalah contoh action service yang di gunakan untuk melakukan aksi ***POST*** dan ***PATCH*** menggunakan ***Rest Api***

  ```ts
    import { AxiosResponse } from 'axios'
    import client from 'src/client'
    import { ICommonDto } from 'src/types/model/common'

    /**
     * Ini adalah interface untuk payload di sesuaikan dengan table nya
     */
    export interface IRequestBodyActionSaveData extends ICommonDto {
      id: string,
      name: string,
      code: string
    }

    type IRequestBody = IRequestBodyActionSaveData

    export const ActionSaveData = <T>(body: IRequestBody): Promise<AxiosResponse<any<T>>> => {
    /**
     * client.api adalah wrapper untuk axios yang di gunakan untuk melakukan request ke server
     */
      if (body.id) {
        return client.api.patch<IResponse<T>>(`/items/change_me/${body.id}`, body)
      }

      return client.api.post<IResponse<T>>('/items/change_me', body)
    }
  ```

  Contoh action service di dalam component dapat di lihat seperti code di bawah ini

  > [!IMPORTANT]
  > Menggunakan action service harus di kombinasikan dengan component 

  > [!TIP]
  > untuk lebih jelasnya penggunaan ButtonAction, bisa di lihat di [**storybook**](https://storybook-dev.mvtool.machinevision.global/)
  
  ```tsx
  import { ActionButton } from 'src/components/atoms/ActionButton'
  import { ActionSaveData } from 'src/directory/of/service/ActionButton'

  export const Component = () => {
    return (
      <ButtonAction
        size='medium'
        payload={{}}
        actionService={ActionSaveData}
        confirmationStatusVariant='warning'
        modalOptions='default'
        confirmationText={{
          negativeLabel: 'Cancel',
          positiveLabel: 'Yes',
          title: 'Are you sure want to confirm date?',
          description: 'You won’t be able to revert this!'
        }}
        alertText={{
          error: {
            title: 'Network Errors.',
            description: 'Unable to connect to the network or server.'
          },
          success: {
            title: 'Successfully save data.',
            description: 'Date has been saved by our system.'
          }
        }}
        variant='contained'
        color='primary'
        text={'Save'}
        content='textOnly'
        sx={{
          minWidth: 0,
          paddingX: '16px',
          paddingY: '12px'
        }}
      />
    )
  }
  ```
