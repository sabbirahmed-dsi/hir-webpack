import AccountIf, { config } from "@packages/api/lib/proxy/BizApi/account/accountIf"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
/* -------------------------------------------------------------------------- */
/*                              offering requisite section                              */
/* -------------------------------------------------------------------------- */
export function findAccountForLookUp(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return AccountIf[config.Actions.findAccountForLookUp]([Params], Headers)
}

export function findAccountAffiliation(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return AccountIf[config.Actions.findAccountAffiliation]([Params], Headers)
}

export function findAccount(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return AccountIf[config.Actions.findAccount]([Params], Headers)
}

export function getAffiliationRoleTypes(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return AccountIf[config.Actions.getAffiliationRoleTypes]([Params], Headers)
}

export function getTaggedQuestionsByAffiliationRoleType(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return AccountIf[config.Actions.getTaggedQuestionsByAffiliationRoleType]([Params], Headers)
}
