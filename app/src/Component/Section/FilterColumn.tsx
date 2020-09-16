import React, { useState } from "react"
import { Col, Row, Checkbox, Input, Select, Button, Typography, DatePicker } from "antd"
import { CloseOutlined } from "@ant-design/icons"
import moment from "moment"
import { CheckboxChangeEvent } from "antd/lib/checkbox"
import styles from "~/Component/Offering/FilterColumn.module.scss"

import { ColProps } from "antd/lib/col"
import { useOfferingFilterData } from "~/Hooks/Offering"

const { Option } = Select
const { Title } = Typography

const layout = {
  label: {
    md: 24,
    lg: 24,
    xl: 24,
    xxl: 24,
    sm: 24,
    xs: 24
  },
  input: {
    md: 20,
    lg: 20,
    xl: 20,
    xxl: 20,
    sm: 20,
    xs: 20
  }
}

function LabelCol(props: ColProps) {
  return <Col {...layout.label} {...props} />
}

function InputCol(props: ColProps) {
  return <Col {...layout.input} {...props} />
}

export interface IFilterValues {
  OfferingCode: string
  OfferingName: string
  ToCreationDate: string
  FromCreationDate: string
  ToTerminationDate: string
  FromTerminationDate: string
  IsQuickAdmit: string
  StatusID: string
  Coordinator: string
  OrganizationID: string
  OfferingTypeID: string
  SectionTypeID: string
  InstructorID: string
  ShowProgramOffering: string
  TagName: string
  TagTypeID: string
  IsSearchTagHierarchy: string
  OfferingNearCapacity: string
  ToFinalEnrollmentDate: string
  FromFinalEnrollmentDate: string
}

type ISelectName =
  | "IsQuickAdmit"
  | "StatusID"
  | "Coordinator"
  | "OrganizationID"
  | "OfferingTypeID"
  | "SectionTypeID"
  | "TagTypeID"
  | "IsSearchTagHierarchy"

const dateFormat = "MM/DD/YYYY"

interface IFilterColumnProps {
  visible: boolean
  toggleVisiibility: () => void
  onApplyChanges: (newValues: IFilterValues, appliedFilterCount: number) => void
  data: IFilterValues
  isModalView: boolean
}

export default function FilterColumn(props: IFilterColumnProps) {
  const [offeringStatusTypes, tagTypes, offeringTypes, sectonTypes, organizations, users] = useOfferingFilterData()

  const { visible, toggleVisiibility, data } = props
  const [filterData, updateFilterData] = useState<IFilterValues>(data)

  const [showOfferingCodeBlock, setOfferingCodeBLockVisible] = useState<boolean>(data.OfferingCode !== "")
  const [showOfferingNameBlock, setOfferingNameBLockVisible] = useState<boolean>(data.OfferingName !== "")
  const [showCreationDateBlock, setCreationDateBLockVisible] = useState<boolean>(
    data.ToCreationDate !== "" || data.FromCreationDate !== ""
  )
  const [showIsQuickAdmitBlock, setIsQuickAdmitBLockVisible] = useState<boolean>(data.IsQuickAdmit !== "")
  const [showTerminationDateBlock, setTerminationDateBLockVisible] = useState<boolean>(
    data.ToTerminationDate !== "" || data.FromTerminationDate !== ""
  )
  const [showOfferingStatusBlock, setOfferingStatusBLockVisible] = useState<boolean>(data.StatusID !== "")
  const [showOfferingTypeBlock, setOfferingTypeBLockVisible] = useState<boolean>(data.OfferingTypeID !== "")
  const [showCoordinatorBlock, setCoordinatorBLockVisible] = useState<boolean>(data.Coordinator !== "")
  const [showDepartmentBlock, setDepartmentBLockVisible] = useState<boolean>(data.OrganizationID !== "")
  const [showSectionTypeBlock, setSectionTypeBLockVisible] = useState<boolean>(data.SectionTypeID !== "")
  const [showTagNameBlock, setTagNameBLockVisible] = useState<boolean>(data.TagName !== "")
  const [showTagTypeBlock, setTagTypeBLockVisible] = useState<boolean>(data.TagTypeID !== "")
  const [showIsSearchTagHierarchyBlock, setIsSearchTagHierarchyBLockVisible] = useState<boolean>(
    data.IsSearchTagHierarchy !== ""
  )
  const [showFinalEnrollmentBlock, setFinalEnrollmentBLockVisible] = useState<boolean>(
    data.ToFinalEnrollmentDate !== "" || data.FromFinalEnrollmentDate !== ""
  )
  const [showOfferingNearCapacityBlock, setOfferingNearCapacityBlockVisible] = useState<boolean>(
    data.OfferingNearCapacity !== ""
  )

  const filterCount = [
    showOfferingCodeBlock,
    showOfferingNameBlock,
    showCreationDateBlock,
    showIsQuickAdmitBlock,
    showTerminationDateBlock,
    showOfferingStatusBlock,
    showOfferingTypeBlock,
    showCoordinatorBlock,
    showDepartmentBlock,
    showSectionTypeBlock,
    showTagNameBlock,
    showTagTypeBlock,
    showIsSearchTagHierarchyBlock,
    showFinalEnrollmentBlock,
    showOfferingNearCapacityBlock
  ].filter(Boolean).length

  const fromCreationDate =
    filterData.FromCreationDate !== "" ? moment(filterData.FromCreationDate, dateFormat) : undefined
  const toCreationDate = filterData.ToCreationDate !== "" ? moment(filterData.ToCreationDate, dateFormat) : undefined

  const fromTerminationDate =
    filterData.FromTerminationDate !== "" ? moment(filterData.FromTerminationDate, dateFormat) : undefined
  const toTerminationDate =
    filterData.ToTerminationDate !== "" ? moment(filterData.ToTerminationDate, dateFormat) : undefined

  const fromFinalEnrollmentDate =
    filterData.FromFinalEnrollmentDate !== "" ? moment(filterData.FromFinalEnrollmentDate, dateFormat) : undefined
  const toFinalEnrollmentDate =
    filterData.ToFinalEnrollmentDate !== "" ? moment(filterData.ToFinalEnrollmentDate, dateFormat) : undefined

  const toggleOfferingCodeBLock = (event: CheckboxChangeEvent) => {
    setOfferingCodeBLockVisible(!showOfferingCodeBlock)
    updateFilterData({ ...filterData, OfferingCode: event.target.checked ? filterData.OfferingCode : "" })
  }

  const toggleOfferingNameBLock = (event: CheckboxChangeEvent) => {
    setOfferingNameBLockVisible(!showOfferingNameBlock)
    updateFilterData({ ...filterData, OfferingName: event.target.checked ? filterData.OfferingName : "" })
  }

  const toggleCreationDateBLock = (event: CheckboxChangeEvent) => {
    setCreationDateBLockVisible(!showCreationDateBlock)
    updateFilterData({ ...filterData, ToCreationDate: event.target.checked ? filterData.ToCreationDate : "" })
    updateFilterData({ ...filterData, FromCreationDate: event.target.checked ? filterData.FromCreationDate : "" })
  }

  const toggleTerminationDateBLock = (event: CheckboxChangeEvent) => {
    setTerminationDateBLockVisible(!showTerminationDateBlock)
    updateFilterData({ ...filterData, ToTerminationDate: event.target.checked ? filterData.ToTerminationDate : "" })
    updateFilterData({ ...filterData, FromTerminationDate: event.target.checked ? filterData.FromTerminationDate : "" })
  }

  const toggleIsQuickAdmitBLock = (event: CheckboxChangeEvent) => {
    setIsQuickAdmitBLockVisible(!showIsQuickAdmitBlock)
    updateFilterData({ ...filterData, IsQuickAdmit: event.target.checked ? filterData.IsQuickAdmit : "" })
  }

  const toggleOfferingStatusBLock = (event: CheckboxChangeEvent) => {
    setOfferingStatusBLockVisible(!showOfferingStatusBlock)
    updateFilterData({ ...filterData, StatusID: event.target.checked ? filterData.StatusID : "" })
  }

  const toggleOfferingTypeBLock = (event: CheckboxChangeEvent) => {
    setOfferingTypeBLockVisible(!showOfferingTypeBlock)
    updateFilterData({ ...filterData, OfferingTypeID: event.target.checked ? filterData.OfferingTypeID : "" })
  }

  const toggleCoordinatorBLock = (event: CheckboxChangeEvent) => {
    setCoordinatorBLockVisible(!showCoordinatorBlock)
    updateFilterData({ ...filterData, Coordinator: event.target.checked ? filterData.Coordinator : "" })
  }

  const toggleDepartmentBLock = (event: CheckboxChangeEvent) => {
    setDepartmentBLockVisible(!showDepartmentBlock)
    updateFilterData({ ...filterData, OrganizationID: event.target.checked ? filterData.OrganizationID : "" })
  }

  const toggleSectionTypeBLock = (event: CheckboxChangeEvent) => {
    setSectionTypeBLockVisible(!showSectionTypeBlock)
    updateFilterData({ ...filterData, SectionTypeID: event.target.checked ? filterData.SectionTypeID : "" })
  }

  const toggleTagNameBLock = (event: CheckboxChangeEvent) => {
    setTagNameBLockVisible(!showTagNameBlock)
    updateFilterData({ ...filterData, TagName: event.target.checked ? filterData.TagName : "" })
  }

  const toggleTagBLock = (event: CheckboxChangeEvent) => {
    setTagTypeBLockVisible(!showTagTypeBlock)
    updateFilterData({
      ...filterData,
      TagTypeID: event.target.checked ? filterData.TagTypeID : ""
    })
  }

  const toggleIsSearchTagHierarchyBLock = (event: CheckboxChangeEvent) => {
    setIsSearchTagHierarchyBLockVisible(!showIsSearchTagHierarchyBlock)
    updateFilterData({
      ...filterData,
      IsSearchTagHierarchy: event.target.checked ? filterData.IsSearchTagHierarchy : ""
    })
  }

  const toggleFinalEnrollmentBLock = (event: CheckboxChangeEvent) => {
    setFinalEnrollmentBLockVisible(!showFinalEnrollmentBlock)
    updateFilterData({
      ...filterData,
      FromFinalEnrollmentDate: event.target.checked ? filterData.FromFinalEnrollmentDate : ""
    })
    updateFilterData({
      ...filterData,
      ToFinalEnrollmentDate: event.target.checked ? filterData.ToFinalEnrollmentDate : ""
    })
  }

  const toggleOfferingNearCapacityBLock = (event: CheckboxChangeEvent) => {
    setOfferingNearCapacityBlockVisible(!showOfferingNearCapacityBlock)
    updateFilterData({
      ...filterData,
      OfferingNearCapacity: event.target.checked ? filterData.OfferingNearCapacity : ""
    })
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateFilterData({
      ...filterData,
      [event.target.name as keyof IFilterValues]: event.target.value
    })
  }

  const handleFromCreationDateChange = (dateString: any) => {
    if (dateString !== null) {
      updateFilterData({
        ...filterData,
        FromCreationDate: dateString
      })
    }
  }
  const handleToCreationDateChange = (dateString: any) => {
    if (dateString !== null) {
      updateFilterData({
        ...filterData,
        ToCreationDate: dateString
      })
    }
  }

  const handleFromTerminationDateChange = (dateString: any) => {
    if (dateString !== null) {
      updateFilterData({
        ...filterData,
        FromTerminationDate: dateString
      })
    }
  }
  const handleToTerminationDateChange = (dateString: any) => {
    if (dateString !== null) {
      updateFilterData({
        ...filterData,
        ToTerminationDate: dateString
      })
    }
  }

  const handleFromFinalEnrollmentDateChange = (dateString: any) => {
    if (dateString !== null) {
      updateFilterData({
        ...filterData,
        FromFinalEnrollmentDate: dateString
      })
    }
  }
  const handleToFinalEnrollmentDateChange = (dateString: any) => {
    if (dateString !== null) {
      updateFilterData({
        ...filterData,
        ToFinalEnrollmentDate: dateString
      })
    }
  }

  const onChangeSelect = (selectName: ISelectName) => {
    return (val: string) =>
      updateFilterData({
        ...filterData,
        [selectName]: val
      })
  }

  return (
    <Col
      className={visible ? `gutter-row ${styles.offeringFilter}` : styles.hidden}
      xs={24}
      sm={24}
      md={props.isModalView ? 12 : 6}
    >
      <Row>
        <Col span={12}>
          <Title level={4}>Offering Filter</Title>
        </Col>
        <Col span={12} className={styles.padding5px}>
          <CloseOutlined onClick={toggleVisiibility} style={{ fontSize: "20px", color: "black", float: "right" }} />
        </Col>
      </Row>
      <Row>
        <LabelCol>
          <Checkbox checked={showOfferingCodeBlock} onChange={toggleOfferingCodeBLock}>
            Offering Code
          </Checkbox>
        </LabelCol>
        <InputCol className={showOfferingCodeBlock ? styles.offeringFilterField : styles.hidden}>
          <Input
            aria-label="OfferingCode"
            name="OfferingCode"
            defaultValue=""
            value={filterData.OfferingCode === "*" ? "" : filterData.OfferingCode}
            onChange={handleInputChange}
          />
        </InputCol>
      </Row>
      <Row>
        <LabelCol>
          <Checkbox checked={showOfferingNameBlock} onChange={toggleOfferingNameBLock}>
            Offering Name
          </Checkbox>
        </LabelCol>
        <InputCol className={showOfferingNameBlock ? styles.offeringFilterField : styles.hidden}>
          <Input
            aria-label="OfferingName"
            name="OfferingName"
            defaultValue=""
            value={filterData.OfferingName === "*" ? "" : filterData.OfferingName}
            onChange={handleInputChange}
          />
        </InputCol>
      </Row>
      <Row>
        <LabelCol>
          <Checkbox checked={showCreationDateBlock} onChange={toggleCreationDateBLock}>
            Creation Date
          </Checkbox>
        </LabelCol>
        <Row className={showCreationDateBlock ? styles.offeringFilterDateField : styles.hidden}>
          <Col span={11}>
            From
            <DatePicker
              allowClear
              aria-label="Creation Date From"
              value={fromCreationDate}
              onChange={handleFromCreationDateChange}
              format={dateFormat}
            />
          </Col>

          <Col span={11} offset={2}>
            To
            <DatePicker
              aria-label="Creation Date To"
              allowClear
              value={toCreationDate}
              onChange={handleToCreationDateChange}
              format={dateFormat}
            />
          </Col>
        </Row>
      </Row>
      <Row>
        <LabelCol>
          <Checkbox checked={showTerminationDateBlock} onChange={toggleTerminationDateBLock}>
            Termination Date
          </Checkbox>
        </LabelCol>
        <Row className={showTerminationDateBlock ? styles.offeringFilterDateField : styles.hidden}>
          <Col span={11}>
            From
            <DatePicker
              allowClear
              aria-label="Termination Date From"
              value={fromTerminationDate}
              onChange={handleFromTerminationDateChange}
              format={dateFormat}
            />
          </Col>
          <Col span={11} offset={2}>
            To
            <DatePicker
              allowClear
              aria-label="Termination Date To"
              value={toTerminationDate}
              onChange={handleToTerminationDateChange}
              format={dateFormat}
            />
          </Col>
        </Row>
      </Row>
      <Row>
        <LabelCol>
          <Checkbox checked={showIsQuickAdmitBlock} onChange={toggleIsQuickAdmitBLock}>
            Is QuickAdmit
          </Checkbox>
        </LabelCol>
        <InputCol className={showIsQuickAdmitBlock ? styles.offeringFilterField : styles.hidden}>
          <Select
            aria-label="Is Quick Admit"
            style={{ width: 250 }}
            value={filterData.IsQuickAdmit}
            onChange={onChangeSelect("IsQuickAdmit")}
          >
            <Option value="true">Yes</Option>
            <Option value="false">No</Option>
          </Select>
        </InputCol>
      </Row>
      {offeringStatusTypes.length > 0 && (
        <Row>
          <LabelCol>
            <Checkbox checked={showOfferingStatusBlock} onChange={toggleOfferingStatusBLock}>
              Offering Status
            </Checkbox>
          </LabelCol>
          <InputCol className={showOfferingStatusBlock ? styles.offeringFilterField : styles.hidden}>
            <Select
              aria-label="Offering Status Select"
              style={{ width: 250 }}
              value={filterData.StatusID}
              onChange={onChangeSelect("StatusID")}
            >
              {offeringStatusTypes.map((x) => {
                return (
                  <Select.Option key={x.StatusID} value={x.StatusID}>
                    {x.Name}
                  </Select.Option>
                )
              })}
            </Select>
          </InputCol>
        </Row>
      )}
      {offeringTypes.length > 0 && (
        <Row>
          <LabelCol>
            <Checkbox checked={showOfferingTypeBlock} onChange={toggleOfferingTypeBLock}>
              Offering Type
            </Checkbox>
          </LabelCol>
          <InputCol className={showOfferingTypeBlock ? styles.offeringFilterField : styles.hidden}>
            <Select
              style={{ width: 250 }}
              value={filterData.OfferingTypeID}
              onChange={onChangeSelect("OfferingTypeID")}
              aria-label="Offering Type Select"
            >
              {offeringTypes.map((x) => {
                return (
                  <Select.Option key={x.OfferingTypeID} value={x.OfferingTypeID}>
                    {x.Name}
                  </Select.Option>
                )
              })}
            </Select>
          </InputCol>
        </Row>
      )}
      {organizations.length > 0 && (
        <Row>
          <LabelCol>
            <Checkbox checked={showDepartmentBlock} onChange={toggleDepartmentBLock}>
              Department
            </Checkbox>
          </LabelCol>
          <InputCol className={showDepartmentBlock ? styles.offeringFilterField : styles.hidden}>
            <Select aria-label="Department Select" style={{ width: 250 }} onChange={onChangeSelect("OrganizationID")}>
              {organizations.map((x) => {
                return (
                  <Select.Option key={x.OrganizationTypeID} value={x.OrganizationTypeID}>
                    {x.Name}
                  </Select.Option>
                )
              })}
            </Select>
          </InputCol>
        </Row>
      )}
      {users.length > 0 && (
        <Row>
          <LabelCol>
            <Checkbox checked={showCoordinatorBlock} onChange={toggleCoordinatorBLock}>
              Coordinator
            </Checkbox>
          </LabelCol>
          <InputCol className={showCoordinatorBlock ? styles.offeringFilterField : styles.hidden}>
            <Select
              aria-label="Coordinator Select"
              style={{ width: 250 }}
              value={filterData.Coordinator}
              onChange={onChangeSelect("Coordinator")}
            >
              {users.map((x) => {
                return (
                  <Select.Option key={x.UserLogin} value={x.UserLogin}>
                    {x.FormattedName}
                  </Select.Option>
                )
              })}
            </Select>
          </InputCol>
        </Row>
      )}
      {sectonTypes.length > 0 && (
        <Row>
          <LabelCol>
            <Checkbox checked={showSectionTypeBlock} onChange={toggleSectionTypeBLock}>
              Section Type
            </Checkbox>
          </LabelCol>
          <InputCol className={showSectionTypeBlock ? styles.offeringFilterField : styles.hidden}>
            <Select
              aria-label="Section Type Select"
              style={{ width: 250 }}
              value={filterData.SectionTypeID}
              onChange={onChangeSelect("SectionTypeID")}
            >
              {sectonTypes.map((x) => {
                return (
                  <Select.Option key={x.SectionTypeID} value={x.SectionTypeID}>
                    {x.SectionTypeName}
                  </Select.Option>
                )
              })}
            </Select>
          </InputCol>
        </Row>
      )}
      <Row>
        <LabelCol>
          <Checkbox checked={showIsSearchTagHierarchyBlock} onChange={toggleIsSearchTagHierarchyBLock}>
            Is Search Tag Hierarchy
          </Checkbox>
        </LabelCol>
        <InputCol className={showIsSearchTagHierarchyBlock ? styles.offeringFilterField : styles.hidden}>
          <Select
            style={{ width: 250 }}
            value={filterData.IsSearchTagHierarchy}
            onChange={onChangeSelect("IsSearchTagHierarchy")}
          >
            <Option value="true">Yes</Option>
            <Option value="false">No</Option>
          </Select>
        </InputCol>
      </Row>
      {tagTypes.length > 0 && (
        <Row>
          <LabelCol>
            <Checkbox checked={showTagTypeBlock} onChange={toggleTagBLock}>
              Tag Type
            </Checkbox>
          </LabelCol>
          <InputCol className={showTagTypeBlock ? styles.offeringFilterField : styles.hidden}>
            <Select
              aria-label="Tag Type Select"
              style={{ width: 250 }}
              value={filterData.TagTypeID}
              onChange={onChangeSelect("TagTypeID")}
            >
              {tagTypes.map((x) => {
                return (
                  <Select.Option key={x.ID} value={x.ID}>
                    {x.Name}
                  </Select.Option>
                )
              })}
            </Select>
          </InputCol>
        </Row>
      )}
      <Row>
        <LabelCol>
          <Checkbox checked={showTagNameBlock} onChange={toggleTagNameBLock}>
            Tag
          </Checkbox>
        </LabelCol>
        <InputCol className={showTagNameBlock ? styles.offeringFilterField : styles.hidden}>
          <Input
            aria-label="Tag name"
            name="TagName"
            defaultValue=""
            value={filterData.TagName === "*" ? "" : filterData.TagName}
            onChange={handleInputChange}
          />
        </InputCol>
      </Row>
      <Row>
        <LabelCol>
          <Checkbox checked={showFinalEnrollmentBlock} onChange={toggleFinalEnrollmentBLock}>
            Final Enrollment Date
          </Checkbox>
        </LabelCol>
        <Row className={showFinalEnrollmentBlock ? styles.offeringFilterDateField : styles.hidden}>
          <Col span={11}>
            From
            <DatePicker
              allowClear
              aria-label="Final Enrollment Date From"
              value={fromFinalEnrollmentDate}
              onChange={handleFromFinalEnrollmentDateChange}
              format={dateFormat}
            />
          </Col>
          <Col span={11} offset={2}>
            To
            <DatePicker
              allowClear
              aria-label="Final Enrollment Date To"
              value={toFinalEnrollmentDate}
              onChange={handleToFinalEnrollmentDateChange}
              format={dateFormat}
            />
          </Col>
        </Row>
      </Row>
      <Row>
        <LabelCol>
          <Checkbox checked={showOfferingNearCapacityBlock} onChange={toggleOfferingNearCapacityBLock}>
            Capacity Util
          </Checkbox>
        </LabelCol>
        <InputCol className={showOfferingNearCapacityBlock ? styles.offeringFilterField : styles.hidden}>
          <Input
            aria-label="Offering Near Capacity"
            name="OfferingNearCapacity"
            defaultValue=""
            value={filterData.OfferingNearCapacity === "*" ? "" : filterData.OfferingNearCapacity}
            onChange={handleInputChange}
          />
        </InputCol>
      </Row>
      <Row className={styles.floatRight}>
        <Button
          type="primary"
          aria-label="Apply Filter"
          className={styles.applyBtn}
          onClick={() => {
            props.onApplyChanges(filterData, filterCount)
          }}
        >
          Apply
        </Button>
      </Row>
    </Col>
  )
}