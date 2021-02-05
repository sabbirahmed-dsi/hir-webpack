import { getCountries } from "~/ApiServices/Service/RefLookupService"
import { BOOLEAN, DROPDOWN, IField, NUMBER, TEXT } from "~/Component/Common/Form/common"

export const FormMeta: IField[] = [
  {
    label: "RegionCode",
    fieldName: "Name",
    inputType: TEXT
  },
  {
    label: "Description",
    fieldName: "Description",
    inputType: TEXT
  },
  {
    label: "IPEDS Code",
    fieldName: "IPEDSCode",
    inputType: TEXT
  },
  {
    label: "CountryCode",
    inputType: DROPDOWN,
    fieldName: "CountryCodeID",
    refLookupService: getCountries,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "SortPosition",
    fieldName: "SortPosition",
    inputType: NUMBER
  },
  {
    label: "Is Active",
    fieldName: "IsActive",
    inputType: BOOLEAN
  }
]
