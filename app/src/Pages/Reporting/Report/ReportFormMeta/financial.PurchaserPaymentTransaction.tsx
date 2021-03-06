import moment from "moment"
import { getPaymentGatewayAccounts } from "~/ApiServices/Service/RefLookupService"
import { DATE_PICKERS, DROPDOWN, CUSTOM_FIELD, IField } from "~/Component/Common/Form/common"

import { PersonLookup } from "~/Component/Common/Form/FormLookupFields/PersonLookup"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"
import { DATE_FORMAT } from "~/utils/Constants"

const meta: IField[] = [
  {
    label: "Payer",
    fieldName: "PersonID",
    rules: [{ required: true, message: "Payer is Required" }],
    inputType: CUSTOM_FIELD,
    customFilterComponent: PersonLookup
  },
  {
    label: "Order Date",
    rules: [{ required: true, message: "Date field is Required" }],
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
  },
  initialFormValue: {
    OrderDateFrom: "",
    OrderDateTo: moment().format(DATE_FORMAT)
  }
}

export default reportMeta
