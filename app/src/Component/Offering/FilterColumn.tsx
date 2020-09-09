import React, { useState } from "react"
import { Col, Row, Checkbox, Input, Select, Button, Typography, DatePicker } from "antd"
import { CloseOutlined } from "@ant-design/icons"
import moment from "moment"
import { CheckboxChangeEvent } from "antd/lib/checkbox"
import styles from "~/Component/Offering/FilterColumn.module.scss"

import { useFilterData } from "~/Component/Offering/offeringUtils"

const { Option } = Select
const { Title } = Typography

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
}

export function FilterColumn(props: IFilterColumnProps) {
  const [offeringStatusTypes, tagTypes, offeringTypes, sectonTypes, organizations, users] = useFilterData()

  const { visible, toggleVisiibility, data } = props
  const [filterData, updateFilterData] = useState<IFilterValues>(data)

  const [showOfferingCodeBlock, setOfferingCodeBLockVisible] = useState<boolean>(false)
  const [showOfferingNameBlock, setOfferingNameBLockVisible] = useState<boolean>(false)
  const [showCreationDateBlock, setCreationDateBLockVisible] = useState<boolean>(false)
  const [showIsQuickAdmitBlock, setIsQuickAdmitBLockVisible] = useState<boolean>(false)
  const [showTerminationDateBlock, setTerminationDateBLockVisible] = useState<boolean>(false)
  const [showOfferingStatusBlock, setOfferingStatusBLockVisible] = useState<boolean>(false)
  const [showOfferingTypeBlock, setOfferingTypeBLockVisible] = useState<boolean>(false)
  const [showCoordinatorBlock, setCoordinatorBLockVisible] = useState<boolean>(false)
  const [showDepartmentBlock, setDepartmentBLockVisible] = useState<boolean>(false)
  const [showSectionTypeBlock, setSectionTypeBLockVisible] = useState<boolean>(false)
  const [showTagNameBlock, setTagNameBLockVisible] = useState<boolean>(false)
  const [showTagTypeBlock, setTagTypeBLockVisible] = useState<boolean>(false)
  const [showIsSearchTagHierarchyBlock, setIsSearchTagHierarchyBLockVisible] = useState<boolean>(false)
  const [showFinalEnrollmentBlock, setFinalEnrollmentBLockVisible] = useState<boolean>(false)
  const [showOfferingNearCapacityBlock, setOfferingNearCapacityBlockVisible] = useState<boolean>(false)

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
    <Col className={visible ? `gutter-row ${styles.offeringFilter}` : styles.hidden} xs={24} sm={24} md={7}>
      <Row>
        <Col span={12}>
          <Title level={4}>Offering Filter</Title>
        </Col>
        <Col span={12} className={styles.padding5px}>
          <CloseOutlined onClick={toggleVisiibility} style={{ fontSize: "20px", color: "black", float: "right" }} />
        </Col>
      </Row>
      <Row>
        <Checkbox onChange={toggleOfferingCodeBLock}>Offering Code</Checkbox>
        <Row className={showOfferingCodeBlock ? styles.offeringFilterField : styles.hidden}>
          <Input
            aria-label="OfferingCode"
            name="OfferingCode"
            defaultValue=""
            value={filterData.OfferingCode === "*" ? "" : filterData.OfferingCode}
            onChange={handleInputChange}
          />
        </Row>
      </Row>
      <Row>
        <Checkbox onChange={toggleOfferingNameBLock}>Offering Name</Checkbox>
        <Row className={showOfferingNameBlock ? styles.offeringFilterField : styles.hidden}>
          <Input
            aria-label="OfferingName"
            name="OfferingName"
            defaultValue=""
            value={filterData.OfferingName === "*" ? "" : filterData.OfferingName}
            onChange={handleInputChange}
          />
        </Row>
      </Row>
      <Row>
        <Checkbox onChange={toggleCreationDateBLock}>Creation Date</Checkbox>
        <Row className={showCreationDateBlock ? styles.offeringFilterField : styles.hidden}>
          <Col span={24}>From</Col>
          <DatePicker
            aria-label="Creation Date From"
            allowClear
            value={fromCreationDate}
            onChange={handleFromCreationDateChange}
            format={dateFormat}
          />
          <Col span={24}>To</Col>
          <DatePicker
            aria-label="Creation Date To"
            allowClear
            value={toCreationDate}
            onChange={handleToCreationDateChange}
            format={dateFormat}
          />
        </Row>
      </Row>
      <Row>
        <Checkbox onChange={toggleTerminationDateBLock}>Termination Date</Checkbox>
        <Row className={showTerminationDateBlock ? styles.offeringFilterField : styles.hidden}>
          <Col span={24}>From</Col>
          <DatePicker
            allowClear
            value={fromTerminationDate}
            onChange={handleFromTerminationDateChange}
            format={dateFormat}
          />
          <Col span={24}>To</Col>
          <DatePicker
            allowClear
            value={toTerminationDate}
            onChange={handleToTerminationDateChange}
            format={dateFormat}
          />
        </Row>
      </Row>
      <Row>
        <Checkbox onChange={toggleIsQuickAdmitBLock}>Is QuickAdmit</Checkbox>
        <Row className={showIsQuickAdmitBlock ? styles.offeringFilterField : styles.hidden}>
          <Select style={{ width: 200 }} value={filterData.IsQuickAdmit} onChange={onChangeSelect("IsQuickAdmit")}>
            <Option value="true">Yes</Option>
            <Option value="false">No</Option>
          </Select>
        </Row>
      </Row>
      {offeringStatusTypes.length > 0 && (
        <Row>
          <Checkbox onChange={toggleOfferingStatusBLock}>Offering Status</Checkbox>
          <Row className={showOfferingStatusBlock ? styles.offeringFilterField : styles.hidden}>
            <Select style={{ width: 200 }} value={filterData.StatusID} onChange={onChangeSelect("StatusID")}>
              {offeringStatusTypes.map((x) => {
                return (
                  <Select.Option key={x.StatusID} value={x.StatusID}>
                    {x.Name}
                  </Select.Option>
                )
              })}
            </Select>
          </Row>
        </Row>
      )}
      {offeringTypes.length > 0 && (
        <Row>
          <Checkbox onChange={toggleOfferingTypeBLock}>Offering Type</Checkbox>
          <Row className={showOfferingTypeBlock ? styles.offeringFilterField : styles.hidden}>
            <Select
              style={{ width: 200 }}
              value={filterData.OfferingTypeID}
              onChange={onChangeSelect("OfferingTypeID")}
            >
              {offeringTypes.map((x) => {
                return (
                  <Select.Option key={x.OfferingTypeID} value={x.OfferingTypeID}>
                    {x.Name}
                  </Select.Option>
                )
              })}
            </Select>
          </Row>
        </Row>
      )}
      {organizations.length > 0 && (
        <Row>
          <Checkbox onChange={toggleDepartmentBLock}>Department</Checkbox>
          <Row className={showDepartmentBlock ? styles.offeringFilterField : styles.hidden}>
            <Select style={{ width: 200 }} onChange={onChangeSelect("OrganizationID")}>
              {organizations.map((x) => {
                return (
                  <Select.Option key={x.OrganizationTypeID} value={x.OrganizationTypeID}>
                    {x.Name}
                  </Select.Option>
                )
              })}
            </Select>
          </Row>
        </Row>
      )}
      {users.length > 0 && (
        <Row>
          <Checkbox onChange={toggleCoordinatorBLock}>Coordinator</Checkbox>
          <Row className={showCoordinatorBlock ? styles.offeringFilterField : styles.hidden}>
            <Select style={{ width: 200 }} value={filterData.Coordinator} onChange={onChangeSelect("Coordinator")}>
              {users.map((x) => {
                return (
                  <Select.Option key={x.UserLogin} value={x.UserLogin}>
                    {x.FormattedName}
                  </Select.Option>
                )
              })}
            </Select>
          </Row>
        </Row>
      )}
      {sectonTypes.length > 0 && (
        <Row>
          <Checkbox onChange={toggleSectionTypeBLock}>Section Type</Checkbox>
          <Row className={showSectionTypeBlock ? styles.offeringFilterField : styles.hidden}>
            <Select style={{ width: 200 }} value={filterData.SectionTypeID} onChange={onChangeSelect("SectionTypeID")}>
              {sectonTypes.map((x) => {
                return (
                  <Select.Option key={x.SectionTypeID} value={x.SectionTypeID}>
                    {x.SectionTypeName}
                  </Select.Option>
                )
              })}
            </Select>
          </Row>
        </Row>
      )}
      <Row>
        <Checkbox onChange={toggleIsSearchTagHierarchyBLock}>Is Search Tag Hierarchy</Checkbox>
        <Row className={showIsSearchTagHierarchyBlock ? styles.offeringFilterField : styles.hidden}>
          <Select
            style={{ width: 200 }}
            value={filterData.IsSearchTagHierarchy}
            onChange={onChangeSelect("IsSearchTagHierarchy")}
          >
            <Option value="true">Yes</Option>
            <Option value="false">No</Option>
          </Select>
        </Row>
      </Row>
      {tagTypes.length > 0 && (
        <Row>
          <Checkbox onChange={toggleTagBLock}>Tag Type</Checkbox>
          <Row className={showTagTypeBlock ? styles.offeringFilterField : styles.hidden}>
            <Select style={{ width: 200 }} value={filterData.TagTypeID} onChange={onChangeSelect("TagTypeID")}>
              {tagTypes.map((x) => {
                return (
                  <Select.Option key={x.ID} value={x.ID}>
                    {x.Name}
                  </Select.Option>
                )
              })}
            </Select>
          </Row>
        </Row>
      )}
      <Row>
        <Checkbox onChange={toggleTagNameBLock}>Tag</Checkbox>
        <Row className={showTagNameBlock ? styles.offeringFilterField : styles.hidden}>
          <Input
            name="TagName"
            defaultValue=""
            value={filterData.TagName === "*" ? "" : filterData.TagName}
            onChange={handleInputChange}
          />
        </Row>
      </Row>
      <Row>
        <Checkbox onChange={toggleFinalEnrollmentBLock}>Final Enrollment Date</Checkbox>
        <Row className={showFinalEnrollmentBlock ? styles.offeringFilterField : styles.hidden}>
          <Col span={24}>From</Col>
          <DatePicker
            allowClear
            value={fromFinalEnrollmentDate}
            onChange={handleFromFinalEnrollmentDateChange}
            format={dateFormat}
          />
          <Col span={24}>To</Col>
          <DatePicker
            allowClear
            value={toFinalEnrollmentDate}
            onChange={handleToFinalEnrollmentDateChange}
            format={dateFormat}
          />
        </Row>
      </Row>
      <Row>
        <Checkbox onChange={toggleOfferingNearCapacityBLock}>Capacity Util</Checkbox>
        <Row className={showOfferingNearCapacityBlock ? styles.offeringFilterField : styles.hidden}>
          <Input
            name="OfferingNearCapacity"
            defaultValue=""
            value={filterData.OfferingNearCapacity === "*" ? "" : filterData.OfferingNearCapacity}
            onChange={handleInputChange}
          />
        </Row>
      </Row>
      <Row className={styles.floatRight}>
        <Button
          type="primary"
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
