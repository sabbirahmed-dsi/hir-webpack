import StudentIf, { config } from "@packages/api/lib/proxy/BizApi/student/studentIf"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function searchStudents(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return StudentIf[config.Actions.searchStudents]([Params], Headers)
}

export function findAllStudentNotice(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return StudentIf[config.Actions.findAllStudentNotice]([Params], Headers)
}
