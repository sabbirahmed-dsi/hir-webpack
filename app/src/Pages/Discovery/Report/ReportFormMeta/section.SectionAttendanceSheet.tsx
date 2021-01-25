import { DATE_PICKERS, CUSTOM_FIELD, IField } from "~/Component/Common/SearchFilters/SearchForm/common"

import { SearchSectionLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchSectionLookup"
import { IReportMeta } from "~/Pages/Discovery/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Section",
    fieldName: "SectionID",
    customFilterComponent: SearchSectionLookupButton,
    inputType: CUSTOM_FIELD
  },
  {
    label: "Schedule Date",
    fieldName: "DateRangeStart",
    fieldName2: "DateRangeEnd",
    rules: [{ required: true, message: "Date field is Required" }],

    inputType: DATE_PICKERS
  }
]

const reportMeta: IReportMeta = {
  meta
}

export default reportMeta
