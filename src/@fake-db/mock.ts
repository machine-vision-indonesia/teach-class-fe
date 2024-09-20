import axios, { AxiosRequestConfig } from 'axios'
import MockAdapter from 'axios-mock-adapter'

export const makeMock = axios.create()

const mock = new MockAdapter(makeMock)

export default mock
