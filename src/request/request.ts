import Axios, { AxiosRequestConfig, Canceler } from 'axios'
import { getToken } from '@/utils/auth'
import { message as AMessage } from 'ant-design-vue'

export interface RequestCallback {
  errorCb?: <T>(error: any) => T
  successCb?: (response: any) => void
}

interface CustomerRequestConfig {
  cancel?: Boolean
}

const BASE_API = import.meta.env.VITE_BASE_API as string
const API_VERSION = import.meta.env.VITE_API_VERSION as string
const TIMEOUT = import.meta.env.VITE_TIMEOUT
const CancelToken = Axios.CancelToken
const token = getToken()
const pendingMap = new Map

function setDefaultHeader(config: AxiosRequestConfig) {
  if (token) {
    if (config.headers) {
      config.headers['X-Customer-ToKen'] = token
    } else {
      config.headers = {
        'X-Customer-ToKen': token
      }
    }
  }
}

function getPendingKey(config: AxiosRequestConfig) {
  let { url, method, data, params } = config
  if (typeof data === 'string') {
    data = JSON.parse(data)
  }
  return [url, method, data, params].join('&')
}

function addPending(config: AxiosRequestConfig) {
  const key = getPendingKey(config)
  config.cancelToken = config.cancelToken ||
    new CancelToken(cancel => {
      if (!pendingMap.has(key)) {
        pendingMap.set(key, cancel)
      }
    })
}

function removePending(config: AxiosRequestConfig) {
  const key = getPendingKey(config)
  if (pendingMap.has(key)) {
    const cancel = pendingMap.get(key)
    cancel(`request ${key} canceled`)
    pendingMap.delete(key)
  }
}

export function withCancelRequest<T>(fetcher: (data: T, config?: AxiosRequestConfig) => Promise<unknown>) {
  let abort: Canceler | null = null

  function send(data: T, config?: AxiosRequestConfig) {
    cancel()
    const cancelToken = new CancelToken(cancel => (abort = cancel))
    return fetcher(data, { ...config, cancelToken })
  }

  function cancel(message?: string | undefined) {
    if (abort) {
      abort(message || 'abort request')
      abort = null
    }
  }

  return [send, cancel] as const
}

export type SuccessResponse = {
  code: 20000,
  data: any,
}

export type ErrorResponse = {
  code: 50008 | 60204,
  message: string,
}

export type ResponseType = SuccessResponse | ErrorResponse

export function request<T = SuccessResponse>(url: string, axiosConfig: AxiosRequestConfig, customConfig?: CustomerRequestConfig): Promise<T> {
  const customOptions = Object.assign({
    cancel: false,
  }, customConfig)

  const instance = Axios.create({
    baseURL: BASE_API + API_VERSION,
    timeout: Number(TIMEOUT)
  })

  instance.interceptors.request.use(
    config => {
      removePending(config) // 取消重复请求
      customOptions?.cancel && addPending(config) // 只有需要取消重复请求的请求，才可以加到 map 中
      setDefaultHeader(config)
      return config
    },
    error => {
      AMessage.error(error)
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    response => {
      removePending(response.config)
      const { data } = response
      const { code, message } = data
      if (code !== 20000) {
        AMessage.error(message)
        return Promise.reject(data)
      }
      return data
    },
    error => {
      removePending(error.config)
      AMessage.error(error.message)
      return Promise.reject(error)
    }
  )
  return instance.request<T, T>({ url, ...axiosConfig })
}

export default request
