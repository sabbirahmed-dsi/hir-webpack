import { getOrganizations, getSourceModule } from "~/ApiServices/Service/RefLookupService"
import {
  DATE_PICKERS,
  DROPDOWN,
  NUMBER,
  CUSTOM_FIELD,
  IField
} from "~/Component/Common/SearchFilters/SearchForm/common"

import { SearchAccountLookup } from "~/Component/Common/SearchFilters/SearchLookups/SearchAccountLookup"
import { SearchPersonLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchPersonLookup"
import { IReportMeta } from "~/Pages/Discovery/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Order Date",

    inputType: DATE_PICKERS,
    fieldName: "OrderDateFrom",
    fieldName2: "OrderDateTo"
  },
  {
    label: "Purchaser",
    fieldName: "PersonID",
    customFilterComponent: SearchPersonLookupButton,
    inputType: CUSTOM_FIELD
  },
  {
    label: "Source",
    inputType: DROPDOWN,
    fieldName: "SourceID",
    refLookupService: getSourceModule,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Account",
    fieldName: "AffiliateOrganizationID",
    customFilterComponent: SearchAccountLookup,
    inputType: CUSTOM_FIELD
  },
  {
    label: "Department",
    inputType: DROPDOWN,
    fieldName: "OrganizationID",

    refLookupService: getOrganizations,
    displayKey: "Name",
    valueKey: "OrganizationID"
  },
  {
    label: "OrderID",
    inputType: NUMBER,
    fieldName: "OrderID"
  }
]

const reportMeta: IReportMeta = {
  meta,
  mapping: {
    OrderDateFrom: "OrderDateFrom_DisplayOnly",
    OrderDateTo: "OrderDateTo_DisplayOnly"
  }
}

export default reportMeta
