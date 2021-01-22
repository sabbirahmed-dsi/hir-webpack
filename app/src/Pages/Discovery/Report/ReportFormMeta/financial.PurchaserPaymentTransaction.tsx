import { getPaymentGatewayAccounts } from "~/ApiServices/Service/RefLookupService"
import { DATE_PICKERS, DROPDOWN, CUSTOM_FIELD, IField } from "~/Component/Common/SearchFilters/SearchForm/common"

import { SearchPersonLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchPersonLookup"
import { IReportMeta } from "~/Pages/Discovery/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Payer",
    fieldName: "PersonID",
    customFilterComponent: SearchPersonLookupButton,
    inputType: CUSTOM_FIELD
  },
  {
    label: "Order Date",

    inputType: DATE_PICKERS,
    fieldName: "OrderDateFrom",
    fieldName2: "OrderDateTo"
  },
  {
    label: "Payment Gateway",
    inputType: DROPDOWN,
    fieldName: "PaymentGatewayAccountID",
    refLookupService: getPaymentGatewayAccounts,
    displayKey: "Name",
    valueKey: "ID"
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
