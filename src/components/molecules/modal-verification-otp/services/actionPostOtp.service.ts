import client from '@/client'
import { IEnableOtp } from '../types/ModalVerificationOtp'
import { getTFAToken } from '../utils'


export async function actionPostEnableOtp(data: IEnableOtp) {
// Zconsole.log(TOKEN)
const TOKEN = getTFAToken();

  return client.api.post('/users/me/tfa/enable', data, {
    headers: {
      Authorization: `Bearer ${TOKEN}`
    }
  })
};

export async function actionPostDisableOtp(data: IEnableOtp) {
  return client.api.post('/users/me/tfa/disable', data)
};

export async function actionPostLoginOtp(data: IEnableOtp) {
  return client.api.post('/auth/login', data)
};
