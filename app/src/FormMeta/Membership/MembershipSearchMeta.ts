import { getMembershipProgramTypes } from "~/ApiServices/Service/RefLookupService"
import { IFilterField, DATE_PICKERS, DROPDOWN, TEXT } from "~/Component/Common/SearchFilters/common"
import { SearchPersonLookupButton } from "~/Component/Common/SearchFilters/SearchLookups/SearchPersonLookup"

export const MembershipSearchMeta: IFilterField[] = [
  {
    label: "Person",
    fieldName: "PersonID",
    customFilterComponent: SearchPersonLookupButton
  },
  {
    label: "Email",
    fieldName: "EmailAddress",
    inputType: TEXT
  },
  {
    label: "Expiration",
    inputType: DATE_PICKERS,
    displayKey: "From",
    fieldName: "TermExpirationDate",
    valueKey: "TermExpirationDate",
    displayKey2: "To",
    valueKey2: "TermExpirationDate1",
    fieldName2: "TermExpirationDate1"
  },
  {
    label: "Member Since",
    inputType: DATE_PICKERS,
    displayKey: "From",
    fieldName: "MemberSince",
    valueKey: "MemberSince",
    displayKey2: "To",
    valueKey2: "MemberSince1",
    fieldName2: "MemberSince1"
  },
  {
    label: "Renewal Period Starts",
    inputType: DATE_PICKERS,
    displayKey: "From",
    fieldName: "TermRenewalBeginDate",
    valueKey: "TermRenewalBeginDate",
    displayKey2: "To",
    valueKey2: "TermRenewalBeginDate1",
    fieldName2: "TermRenewalBeginDate1"
  },
  {
    label: "Membership Program",
    inputType: DROPDOWN,
    fieldName: "MembershipProgramID",
    refLookupService: getMembershipProgramTypes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Renewed",
    inputType: DROPDOWN,
    fieldName: "IsRenewed",
    options: [
      { label: "Yes", value: "Yes" },
      { label: "No", value: "No" }
    ]
  }
]
