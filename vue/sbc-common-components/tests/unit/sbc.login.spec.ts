import { mount } from '@vue/test-utils'
import SbcLogin from '@sbc/components/SbcLogin.vue'
import vuetify, { createVueRouter } from './setup'
import { it, describe, expect, vi, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

setActivePinia(createPinia())

global.ResizeObserver =
global.ResizeObserver ||
    vi.fn().mockImplementation(() => ({
      disconnect: vi.fn(),
      observe: vi.fn(),
      unobserve: vi.fn()
    }))

describe('SbcLogin', () => {
  let store: any
  let router: any

  beforeEach(() => {
    router = createVueRouter()
  })

  it('renders login button with correct label', () => {
    const wrapper = mount(SbcLogin,
      {
        global: {
          plugins: [vuetify, store, router]
        }
      })
    const loginButton = wrapper.find('#loginBtn')
    expect(loginButton.exists()).toBe(true)
    expect(loginButton.text()).toBe('Log in to my BC Registries Account')
  })

  it('sets redirectUrl prop correctly', () => {
    const redirectUrl = '/dashboard'
    const wrapper = mount(SbcLogin, {
      props: {
        redirectUrl: redirectUrl
      },
      global: {
        plugins: [vuetify, store, router]
      }
    })
    expect(wrapper.props('redirectUrl')).toBe(redirectUrl)
  })

  it('displays the image with correct source', () => {
    const imageSource = '/img/BCReg_Generic_Login_image.jpg'
    const wrapper = mount(SbcLogin,
      {
        global: {
          plugins: [vuetify, store, router]
        }
      })
    const image = wrapper.find('img.v-img__img')
    expect(image.exists()).toBe(true)
    expect(image.attributes('src')).toContain(imageSource)
  })
})