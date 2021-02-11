import { BOOLEAN, IField, TEXT } from "~/Component/Common/Form/common"

export const FormMeta: IField[] = [
  {
    label: "Name",
    fieldName: "Name",
    inputType: TEXT
  },
  {
    label: "Description",
    fieldName: "Description",
    inputType: TEXT
  },
  {
    label: "City",
    fieldName: "City",
    inputType: TEXT
  },
  {
    label: "State/Province",
    fieldName: "State",
    inputType: TEXT
  },
  {
    label: "Is Active",
    fieldName: "IsActive",
    inputType: BOOLEAN
  }
]