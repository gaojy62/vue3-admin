import { defineStore } from 'pinia'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, logout, getUserInfo } from '@/request/api/user'
import router, { resetRouter } from '@/router'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken(),
    name: '',
    roles: [],
    avatar: 'https://avatars.githubusercontent.com/u/34189047?s=40&v=4'
  }),
  getters: {
    hasToken: (state) => !!state.token,
    hasRoles: (state) => state.roles.length > 0
  },
  actions: {
    login (username:string, password: string) {
      return new Promise((resolve, reject) => {
        username = username.trim()
        login({ username, password }).then(response => {
          const { data } = response
          this.token = data.token
          setToken(data.token)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    logout () {
      return new Promise((resolve, reject) => {
        logout().then(res => {
          this.token = ''
          this.roles = []
          removeToken()
          resetRouter()
          console.log(router.getRoutes())
          resolve(res.data)
        }).catch(err => {
          console.log(err)
          reject(err)
        })                                                      
      })
    },
    resetToken() {
      return new Promise<void>(resolve => {
        this.token = void 0
        this.roles = []
        resolve()
      })
    },
    getUserInfo () {
      return new Promise(async (resolve, reject) => {
        if (!this.token) {
          reject(new Error('token is undefined'))
        }
        getUserInfo(this.token!).then(data => {
            const { data: userInfo } = data
            const { roles, avatar, name } = userInfo
            if (roles.length === 0) {
              reject('getUserInfo: roles must be a non-null array !')
            }
            this.roles = roles
            this.avatar = avatar
            this.name = name
            resolve(userInfo)
          }
        ).catch(err => {
          reject(err)
        })
      })
    },
    changeRole (role: string) {
      // TODO
    }
  }
})

export default useUserStore
