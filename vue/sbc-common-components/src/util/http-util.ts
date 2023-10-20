import Axios from 'axios'
import ConfigHelper from '@sbc/util/config-helper'
import { SessionStorageKeys } from '@sbc/util/constants'

const axios = Axios.create()

axios.interceptors.request.use(
  request => {
    // Bypass adding auth header for minio
    if (request.url?.includes('minio')) {
      return request
    }

    const token = ConfigHelper.getFromSession(SessionStorageKeys.KeyCloakToken)
    if (token) {
      request.headers.Authorization = `Bearer ${token}`
    }
    return request
  },
  error => Promise.reject(error)
)

axios.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error)
  }
)

export { axios }
