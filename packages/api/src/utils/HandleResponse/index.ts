import { IApiResponse, ErrorType } from "../Interfaces"
import { AxiosError, AxiosResponse } from "axios"
import ProcessedApiError from "./ProcessedApiError"

const handleError = (error: AxiosError): IApiResponse => {
  let response: IApiResponse = {
    code: 503,
    error: undefined,
    data: undefined,
    success: false
  }
  if (error.isAxiosError && error && error.response) {
    if (error.response.data && typeof error.response.data !== "string") {
      response = {
        code: error.response.data["code"],
        error: error.response.data["error"],
        data: error.response.data["data"],
        success: error.response.data["success"]
      }
    } else {
      response = {
        code: error.response.status,
        error: error.response.data,
        data: null,
        success: false
      }
    }
  }
  response.error = new ProcessedApiError(response.error, response.code).getErrorMessages()
  return response
}

export const handleResponse = (promise: Promise<any>): Promise<IApiResponse> => {
  return promise
    .then((response: AxiosResponse<any>) => {
      if (response.headers && response.headers["content-type"]) {
        switch (response.headers["content-type"]) {
          case "text/csv":
            saveAs(response.data, `report-${new Date().toISOString()}.csv`)
            return { data: response, success: true, code: 200, error: null }
          case "application/vnd.ms-excel":
            saveAs(response.data, `report-${new Date().toISOString()}.xls`)
            return { data: response, success: true, code: 200, error: null }
        }
      }
      const result = <IApiResponse>response.data
      if (!result.success) {
        result.code = 404
        result.error = new ProcessedApiError(result.error, result.code).getErrorMessages()
      }
      return result
    })
    .catch((error: AxiosError) => Promise.resolve(handleError(error)))
}
