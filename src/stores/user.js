/* eslint-disable camelcase */
import axios from 'axios'
import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

let store = (set, get) => ({
  user: null,
  accessToken: null,
  getUser: () => get().user,
  setDataUser: (data) => {
    set((state) => ({
      ...state,
      user: data,
      accessToken: data.accessToken,
    }))
  },
  logout: async () => {
    set((state) => ({
      ...state,
      user: null,
      accessToken: null,
    }))
  },

  refreshToken: async () => {
    await axios(`https://securetoken.googleapis.com/v1/token?key=${process.env.REACT_APP_FIREBASE_API_KEY}`, {
      method: 'post',
      data: {
        grant_type: 'refresh_token',
        refresh_token: get().user?.stsTokenManager?.refreshToken,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(function (response) {
        if (response?.status === 200) {
          set((state) => ({
            ...state,
            accessToken: response?.data?.access_token,
          }))
        }
      })
      .catch(function (error) {
        console.log(error)
        get()?.logout()
      })
  },
})

store = devtools(store)
store = persist(store, { name: 'user' })
export default create(store)
