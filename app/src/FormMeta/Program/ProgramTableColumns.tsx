import { renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
import { searchPrograms } from "~/ApiServices/BizApi/program/programIF"

export const getProgramTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    { title: "Program Code", dataIndex: "ProgramCode" },
    { title: "Program Name", dataIndex: "Name" },
    { title: "Status", dataIndex: "ProgramStatusName" },
    { title: "State Date ", dataIndex: "ProgramStartDate", render: renderDate },
    { title: "End Date ", dataIndex: "ProgramEndDate", render: renderDate },
    { title: "Department", dataIndex: "DepartmentName" },
    { title: "Certificate Name", dataIndex: "CertificateName" }
  ]

  const responsiveColumnIndices = [1, 3, 4, 5, 6]
  const expandableColumnIndices = [6, 7]
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: searchPrograms }
}