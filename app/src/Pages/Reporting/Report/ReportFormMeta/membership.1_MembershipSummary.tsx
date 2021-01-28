import { getMembershipProgramTypes } from "~/ApiServices/Service/RefLookupService"
import { DATE_PICKERS, DROPDOWN, IFilterField } from "~/Component/Common/SearchFilters/common"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IFilterField[] = [
  {
    label: "Select Date",
    fieldName: "StartDate",
    fieldName2: "EndDate",
    inputType: DATE_PICKERS
  },
  {
    label: "Membership Program",
    inputType: DROPDOWN,
    fieldName: "ID",
    refLookupService: getMembershipProgramTypes,
    displayKey: "Name",
    valueKey: "ID"
  }
]

const reportMeta: IReportMeta = {
  meta,
  mapping: {
    StartDate: "DisplayStartDate",
    EndDate: "DisplayEndDate"
  }
}

export default reportMeta