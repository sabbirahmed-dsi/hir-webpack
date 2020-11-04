import { getOPCStatusCode, getSourceModule } from "~/ApiServices/Service/RefLookupService"
import { DROPDOWN, IFilterField, NUMBER, TEXT } from "~/Component/Common/SearchFilters/common"
import PersonSelectorForOrderManagement from "~/Component/Section/Order/OrderManagementFilters/PersonSelector"
import DateTypelectorForOrderManagement from "~/Component/Section/Order/OrderManagementFilters/DateTypelector"
import TotalAmountRange from "~/Component/Section/Order/TotalAmountRange"
import AccountLookupForOrderManagement from "~/Component/Section/Order/OrderManagementFilters/AccountLookup"

export const OrderManagementSearchFilterMeta: IFilterField[] = [
  {
    label: "Total Amount",
    fieldName: "",
    customFilterComponent: TotalAmountRange
  },
  {
    label: "Order Id",
    inputType: NUMBER,
    defaultValue: "",
    fieldName: "OrderID",
    ariaLabel: "OrderID"
  },
  {
    label: "Order Status",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "OrderStatusID",
    ariaLabel: "Order Status",
    refLookupService: getOPCStatusCode,
    displayKey: "Name",
    valueKey: "StatusID"
  },
  {
    label: "Source",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "SourceID",
    ariaLabel: "Source",
    refLookupService: getSourceModule,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Product Name",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "ProductName",
    ariaLabel: "ProductName"
  },
  {
    label: "Account Lookup",
    fieldName: "",
    customFilterComponent: AccountLookupForOrderManagement
  },
  {
    label: "Person Selector",
    fieldName: "",
    customFilterComponent: PersonSelectorForOrderManagement
  },
  {
    label: "Date Type Selector",
    fieldName: "",
    customFilterComponent: DateTypelectorForOrderManagement
  }
]
