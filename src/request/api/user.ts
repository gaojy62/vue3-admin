import { request } from '../request'



export function login (userInfo: {username: string, password: string}){
  return request('/user/login', {
    method: 'POST',
    data: JSON.stringify(userInfo),
    headers: {
      'Content-Type': 'application/json'
    },
  })
}

export function getUserInfo (token: string) {
  return request('/user/info', {
    method: 'GET',
    params: {
      token
    }
  })
}

export function logout () {
  return request('/user/logout', {
    method: 'POST'
  })
}
