import { ITableWrapperProps } from "~/Component/Offering"
import { Row, Col } from "antd"
import React from "react"
import moment from "moment"
import ResponsiveTable from "~/Component/ResponsiveTable"

export function QualifiedInstructorTable(props: ITableWrapperProps) {
  const columns = [
    {
      title: "ID",
      dataIndex: "FacultySerialNum",
      key: "FacultySerialNum",
      sorter: (a: any, b: any) => a.FacultySerialNum.length - b.FacultySerialNum.length
    },
    {
      title: "Last Name",
      dataIndex: "LastName",
      key: "LastName"
    },
    {
      title: "First Name",
      dataIndex: "FirstName",
      key: "FirstName"
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status"
    },
    {
      title: "Birthday",
      dataIndex: "Birthday",
      render: (text: any) => (text !== null ? moment(text).format("YYYY-MM-DD") : ""),
      key: "Birthday"
    },
    {
      title: "Gender",
      dataIndex: "GenderTypeName",
      key: "GenderTypeNamer"
    },
    {
      title: "Ethnicity",
      dataIndex: "EthnicityTypeName",
      key: "EthnicityTypeName"
    },
    {
      title: "Address",
      dataIndex: "Address",
      key: "Address"
    },
    {
      title: "Telephone",
      dataIndex: "TelephoneNumber",
      key: "TelephoneNumber"
    },
    {
      title: "Email",
      dataIndex: "EmailAddress",
      key: "EmailAddress"
    }
  ]

  function expandableRowRender(data: any, display: boolean) {
    return (
      <div style={{ border: "1px solid", padding: "5px" }}>
        {display && (
          <Row>
            <Col span="8">Ethnicity:</Col>
            <Col span="16">{data.EthnicityTypeName}</Col>
          </Row>
        )}
        {display && (
          <Row>
            <Col span="8">Address:</Col>
            <Col span="16">{data.Address}</Col>
          </Row>
        )}
        {display && (
          <Row>
            <Col span="8">Telephone:</Col>
            <Col span="16">{data.TelephoneNumber}</Col>
          </Row>
        )}
        <Row>
          <Col span="8">Organization:</Col>
          <Col span="16">{data.OrganizationName}</Col>
        </Row>
        {display && (
          <Row>
            <Col span="8">Instructor Type:</Col>
            <Col span="16">{data.InstructorType}</Col>
          </Row>
        )}
        {display && (
          <Row>
            <Col span="8">Deceased:</Col>
            <Col span="16">{data.IsDeceased}</Col>
          </Row>
        )}
      </div>
    )
  }

  return (
    <ResponsiveTable
      columns={columns}
      dataSource={props.dataSource}
      loading={props.loading}
      bordered
      breakpoints={["xxl"]}
      responsiveColumnIndices={[6, 7, 8]}
      rowSelection={props.rowSelection}
      expandableRowRender={expandableRowRender}
      rowKey="FacultyID"
      pagination={{ position: ["topLeft"] }}
      scroll={{ y: props.isModal ? Math.floor(window.innerHeight * 0.45) : 600 }}
    />
  )
}