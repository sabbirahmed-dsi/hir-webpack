import React from "react"
import QuestionSearchFilters from "~/Component/Common/SearchFilters"
import { DROPDOWN, IFilterField, TEXT } from "~/Component/Common/SearchFilters/common"
import { getOrganizations, getPreferenceValueType } from "~/ApiServices/Service/RefLookupService"

interface IQuestionSearch {
  onFormSubmission: (Params: any) => void
}

const QuestionSearchFiltersMeta: IFilterField[] = [
  {
    label: "Name",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "Name",
    ariaLabel: "Question Name"
  },
  {
    label: "Active",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "IsActive",
    ariaLabel: "Active",
    options: [
      { label: "Yes", value: "true" },
      { label: "No", value: "false" }
    ]
  },
  {
    label: "Department",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "OrganizationID",
    ariaLabel: "Department Select",
    refLookupService: getOrganizations,
    displayKey: "Name",
    valueKey: "OrganizationID"
  },
  {
    label: "Widget",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "PreferenceValueTypeID",
    ariaLabel: "Widget Type Select",
    refLookupService: getPreferenceValueType,
    displayKey: "Name",
    valueKey: "ID"
  }
]

export default function QuestionSearch(props: IQuestionSearch) {
  return (
    <QuestionSearchFilters
      initialFilter={{}}
      visible={true}
      isChecked={false}
      isModalView
      toggleVisiibility={() => {
        console.log("do nothing")
      }}
      meta={QuestionSearchFiltersMeta}
      title="Instructor Filter"
      onApplyChanges={(newFilterValues, newFilterCount) => {
        props.onFormSubmission(newFilterValues)
      }}
    />
  )
}