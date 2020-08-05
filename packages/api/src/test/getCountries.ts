import { ApiConfig } from "../utils/Interfaces"
import callApi from "../utils/CallApi"
import { AxiosRequestConfig } from "axios"

export function getCountries(): Promise<[any, any]> {
  const config: AxiosRequestConfig = {
    baseURL: "https://api.staging.deligram.com/storefront/api/v1/user",
    method: "GET"
  }
  return callApi(config)
}
