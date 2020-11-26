import { getRequestType, getSourceModule } from "~/ApiServices/Service/RefLookupService"
import { getEnumValues } from "~/ApiServices/Service/RequestService"
import { DROPDOWN, IFilterField, DATE_PICKERS, TEXT } from "~/Component/Common/SearchFilters/common"
import { SearchSectionLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchSectionLookup"
import RequestSearchCustomLookupFilter from "~/FormMeta/Request/RequestSearchCustomLookupFilter"

export const RequestSearchMeta: IFilterField[] = [
  {
    label: "Section",
    fieldName: "SectionID",
    customFilterComponent: SearchSectionLookupButton
  },
  {
    label: "Request Type",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "RequestTypeID",
    ariaLabel: "Request Type",
    refLookupService: getRequestType,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Request Status",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "StateID",
    ariaLabel: "Request Status",
    refLookupService: getEnumValues,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Source",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "sourceID",
    ariaLabel: "Source",
    refLookupService: getSourceModule,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Staff",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "RequesterStaffUserName",
    ariaLabel: "Staff"
  },
  {
    label: "Reservation Token",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "ReservationToken",
    ariaLabel: "ReservationToken"
  },
  {
    label: "Creation Date",
    inputType: DATE_PICKERS,
    displayKey: "From",
    defaultValue: "",
    fieldName: "CreatedFromDate",
    valueKey: "CreatedFromDate",
    ariaLabel: "Creation Date From",
    displayKey2: "To",
    valueKey2: "CreatedToDate",
    fieldName2: "CreatedToDate",
    ariaLabel2: "Creation Date To"
  },
  {
    label: "Account & Person",
    fieldName: "",
    customFilterComponent: RequestSearchCustomLookupFilter
  }
]