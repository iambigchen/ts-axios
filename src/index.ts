import { AxiosRequestConfig } from './types/index'
import xhr from './xhr'
import { bulidURL } from './helpers/url'
function axios(config: AxiosRequestConfig) {
  config = processConfig(config)
  xhr(config)
}

function processConfig(config: AxiosRequestConfig): AxiosRequestConfig {
  config.url = transformUrl(config)
  return config
}

function transformUrl(config: AxiosRequestConfig) {
  const { url, params = null } = config
  return bulidURL(url, params)
}
export default axios
