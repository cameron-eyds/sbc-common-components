/* eslint-disable no-multi-str */
import Axios, { AxiosResponse } from 'axios'
import ConfigHelper from '@sbc/util/config-helper'
import { addAxiosInterceptors } from '@sbc/util/interceptors'
import { Notifications } from '@sbc/models/notification'

const axios = addAxiosInterceptors(Axios.create())

export default class NotificationService {
  static async getNotifications (): Promise<AxiosResponse<Notifications>> {
    return axios.get(`${ConfigHelper.getStatusAPIUrl()}/whatsnew`)
  }
}
