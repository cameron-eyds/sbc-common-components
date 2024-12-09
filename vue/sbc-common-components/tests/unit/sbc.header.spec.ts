import Axios from 'axios'
import { mount } from '@vue/test-utils'
import SbcHeader from '@sbc/components/SbcHeader.vue'
import vuetify, { createVueRouter } from './setup'
import getNotifications from '@sbc/services/notification.services'
import { it, describe, expect, beforeEach, vi } from 'vitest'
import { addAxiosInterceptors } from '@sbc/util/interceptors'
import { createPinia, setActivePinia } from 'pinia'
vi.mock('axios')
vi.mock('@sbc/util/interceptors')
vi.mock('@sbc/services/notification.services')

const axios = Axios as any
const addAxiosInterceptorsMock = addAxiosInterceptors as any
const getNotificationsMock = getNotifications as any

setActivePinia(createPinia())

describe('SbcHeader', () => {
  let router: any

  beforeEach(() => {
    axios.get.mockResolvedValue([])
    axios.all.mockResolvedValue([])
    axios.spread.mockResolvedValue([] as any)
    addAxiosInterceptorsMock.mockReturnValue(axios)
    getNotificationsMock.mockResolvedValue([])
    router = createVueRouter()
  })
  it('renders the brand title correctly', () => {
    const wrapper = mount(SbcHeader, {
      global: {
        plugins: [vuetify, router]
      }
    })
    const header = wrapper.find('.app-header')
    expect(header.exists()).toBe(true)
  })
})