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
})

store = devtools(store)
store = persist(store, { name: 'user' })
export default create(store)
