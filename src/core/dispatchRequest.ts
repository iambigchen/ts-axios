import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/index'
import xhr from './xhr'
import { bulidURL } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import {processHeaders} from '../helpers/headers'
function axios(config: AxiosRequestConfig): AxiosPromise {
  config = processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): AxiosRequestConfig {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
  return config
}

function transformUrl(config: AxiosRequestConfig) {
  const { url, params = null } = config
  return bulidURL(url!, params)
}

function transformRequestData(config: AxiosRequestConfig) {
  const {data = null} = config
  return transformRequest(data)
}

function transformHeaders(config: AxiosRequestConfig) {
  const {data = null, headers = {}} = config
  return processHeaders(data, headers)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}
export default axios
