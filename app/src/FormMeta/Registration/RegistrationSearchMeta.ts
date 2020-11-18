import { DATE_PICKERS, IFilterField } from "~/Component/Common/SearchFilters/common"
import { SearchPersonLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchPersonLookup"
import { SearchSectionLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchSectionLookup"
import { SearchStudentLookup } from "~/Component/Common/SearchFilters/SearchLookups/SearchStudentLookup"

export const RegistrationSearchMeta: IFilterField[] = [
  {
    label: "Section Lookup",
    fieldName: "SectionID",
    customFilterComponent: SearchSectionLookupButton
  },
  {
    label: "Purchaser Lookup",
    fieldName: "PersonID",
    customFilterComponent: SearchPersonLookupButton
  },
  {
    label: "Student",
    fieldName: "StudentID",
    customFilterComponent: SearchStudentLookup
  },
  {
    label: "Account",
    fieldName: "AccountID",
    customFilterComponent: SearchStudentLookup
  },
  {
    label: "Start Date",
    inputType: DATE_PICKERS,
    displayKey: "From",
    defaultValue: "",
    fieldName: "StartDateFrom",
    valueKey: "StartDateFrom",
    ariaLabel: "Start Date From",
    displayKey2: "To",
    valueKey2: "StartDateTo",
    fieldName2: "StartDateTo",
    ariaLabel2: "Start Date To"
  },
  {
    label: "Create Date",
    inputType: DATE_PICKERS,
    displayKey: "From",
    defaultValue: "",
    fieldName: "CreatedFromDate",
    valueKey: "CreatedFromDate",
    ariaLabel: "Start Date From",
    displayKey2: "To",
    valueKey2: "CreatedToDate",
    fieldName2: "CreatedToDate",
    ariaLabel2: "Start Date To"
  }
]
