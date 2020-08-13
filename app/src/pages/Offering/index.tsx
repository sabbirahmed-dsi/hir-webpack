import * as React from "react"

import moment from "moment"
import {
  Layout,
  Menu,
  Row,
  Col,
  Button,
  Input,
  Select,
  Table,
  Space,
  Dropdown,
  Typography,
  Checkbox,
  DatePicker
} from "antd"

import { DownOutlined, CloseOutlined } from "@ant-design/icons"
import { Header, Breadcrumb, Toolbar } from "~/component/Offering"
import { searchOfferingWrap } from "~/ApiServices/Service/OfferingServiceWrap"
import { RouteComponentProps, Link, Redirect } from "react-router-dom"
import styles from "~/pages/Offering/Offering.module.scss"

const { Content, Footer } = Layout

const { Title } = Typography
const { RangePicker } = DatePicker
const { Option } = Select

const dateFormat = "MM/DD/YYYY"

type OfferingState = {
  OfferingCode: string
  OfferingName: string
  ToCreationDate: string
  FromCreationDate: string
  ToTerminationDate: string
  FromTerminationDate: string
  filterCounter: number
  showFilter: boolean
  loading: boolean
  onRowClick: boolean
  selectRowOfferingID: number
  showOfferingCodeBlock: boolean
  showOfferingNameBlock: boolean
  showCreationDateBlock: boolean
  showTerminationDateBlock: boolean
  showIsQuickAdmitBlock: boolean
  offeringItems: any
  expandedRowKeys: any
  shouldOpenOfferingCreateForm: boolean
}

class OfferingPage extends React.Component<RouteComponentProps, OfferingState> {
  filterCount = 0
  columns = [
    {
      title: "Offering Code",
      dataIndex: "OfferingCode",
      key: "OfferingCode",
      sorter: (a: any, b: any) => a.OfferingCode.length - b.OfferingCode.length
    },
    {
      title: "Offering Name",
      dataIndex: "OfferingName",
      key: "OfferingName",
      sorter: (a: any, b: any) => a.OfferingName.length - b.OfferingName.length
    },
    {
      title: "Creation Date",
      dataIndex: "CreationDate",
      key: "CreationDate",
      render: (text: any) => (text !== null ? moment(text).format("YYYY-MM-DD") : "")
    },
    {
      title: "Termination Date",
      dataIndex: "TerminationDate",
      key: "TerminationDate",
      render: (text: any) => (text !== null ? moment(text).format("YYYY-MM-DD") : "")
    },
    {
      title: "Status",
      dataIndex: "StatusCode",
      key: "StatusCode",
      sorter: (a: any, b: any) => a.StatusCode.length - b.StatusCode.length
    },
    {
      title: "Department",
      dataIndex: "OrganizationName",
      key: "OrganizationName"
    },
    {
      title: "Offering Type",
      dataIndex: "OfferingTypeName",
      key: "OfferingTypeName"
    },
    {
      title: "Def Section",
      dataIndex: "SectionTypeName",
      key: "SectionTypeName"
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <Dropdown overlay={OfferingPage.generateMenu(record)} trigger={["click"]}>
            <span className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              Select actions <DownOutlined />
            </span>
          </Dropdown>
        </Space>
      )
    }
  ]

  state: OfferingState = {
    OfferingCode: "",
    OfferingName: "",
    ToCreationDate: "",
    FromCreationDate: "",
    ToTerminationDate: "",
    FromTerminationDate: "",
    filterCounter: 0,
    showFilter: false,
    loading: false,
    onRowClick: false,
    selectRowOfferingID: 0,
    showOfferingCodeBlock: false,
    showOfferingNameBlock: false,
    showCreationDateBlock: false,
    showTerminationDateBlock: false,
    showIsQuickAdmitBlock: false,
    offeringItems: [],
    expandedRowKeys: [],
    shouldOpenOfferingCreateForm: false
  }

  static expandableRowRender(data: any) {
    return (
      <div style={{ border: "1px solid", padding: "5px" }}>
        <Row>
          <Col span="8" className={styles.fontWeightBold}>
            Description:
          </Col>
          <Col span="16">{data.OfferingDescription}</Col>
        </Row>
      </div>
    )
  }

  static generateMenu(record: any) {
    return (
      <Menu>
        <Menu.Item key="0">
          <Link to={`/offering/${record.OfferingID}/financial`}>Offering Financial</Link>
        </Menu.Item>
        <Menu.Item key="1">
          <a href="/">Requisite Management</a>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to={`/offering/${record.OfferingID}/catalog`}>Catalogs</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <a href="/">Offering Tag</a>
        </Menu.Item>
        <Menu.Item key="4">
          <a href="/">Offering Approval</a>
        </Menu.Item>
        <Menu.Item key="5">
          <a href="/">Qualified Instructors</a>
        </Menu.Item>
      </Menu>
    )
  }

  async searchOffering() {
    this.setState({
      loading: true
    })

    const params = {
      OfferingCode: this.state.OfferingCode === "" ? "*" : this.state.OfferingCode,
      OfferingName: this.state.OfferingName === "" ? "*" : this.state.OfferingName
    }

    /*if (this.state.FromCreationDate !== '') {
			params["FromCreationDate"] = this.state.FromCreationDate;
		}
		if (this.state.ToCreationDate !== '') {
			params["ToCreationDate"] = this.state.ToCreationDate;
		}*/

    const [result] = await searchOfferingWrap(params)

    if (result) {
      this.setState({
        loading: false,
        offeringItems: result.data
      })
    }
  }

  async componentDidMount() {
    this.searchOffering()
  }

  handleCreationDateChange = (dateString: any) => {
    if (dateString !== null) {
      this.setState({
        FromCreationDate: dateString[0],
        ToCreationDate: dateString[1]
      })
    }
  }

  handleTerminationDateChange = (dateString: any) => {
    if (dateString !== null) {
      this.setState({
        FromTerminationDate: dateString[0],
        ToTerminationDate: dateString[1]
      })
    }
  }

  handleInputChange = (event: any) => {
    this.setState({
      [event.target.name]: event.target.value
    } as OfferingState)
  }

  handleSubmit = (event: any) => {
    event.preventDefault()
    this.setState({
      filterCounter: this.filterCount
    })
    this.searchOffering()
  }

  handleOfferingCreateForm = (shouldOpen: boolean) => {
    this.setState({ shouldOpenOfferingCreateForm: shouldOpen })
  }

  toggleFilter = () => {
    this.setState({
      showFilter: !this.state.showFilter
    })
  }

  toggleOfferingCodeBLock = (event: any) => {
    this.setState({
      showOfferingCodeBlock: !this.state.showOfferingCodeBlock,
      OfferingCode: event.target.checked ? this.state.OfferingCode : ""
    })
    this.filterCounter(event)
  }

  toggleOfferingNameBLock = (event: any) => {
    this.setState({
      showOfferingNameBlock: !this.state.showOfferingNameBlock,
      OfferingName: event.target.checked ? this.state.OfferingName : ""
    })
    this.filterCounter(event)
  }

  toggleCreationDateBLock = (event: any) => {
    this.setState({
      showCreationDateBlock: !this.state.showCreationDateBlock
    })
    this.filterCounter(event)
  }

  toggleTerminationDateBLock = (event: any) => {
    this.setState({
      showTerminationDateBlock: !this.state.showTerminationDateBlock
    })
    this.filterCounter(event)
  }

  toggleIsQuickAdmitBLock = (event: any) => {
    this.setState({
      showIsQuickAdmitBlock: !this.state.showIsQuickAdmitBlock
    })
    this.filterCounter(event)
  }

  filterCounter = (event: any) => {
    this.setState({
      filterCounter: event.target.checked ? this.state.filterCounter + 1 : this.state.filterCounter - 1
    })
    this.filterCount = event.target.checked ? this.state.filterCounter + 1 : this.state.filterCounter - 1
  }

  render() {
    const {
      showFilter,
      offeringItems,
      loading,
      onRowClick,
      selectRowOfferingID,
      OfferingName,
      OfferingCode,
      FromCreationDate,
      ToCreationDate,
      FromTerminationDate,
      ToTerminationDate,
      showOfferingCodeBlock,
      showOfferingNameBlock,
      showCreationDateBlock,
      showTerminationDateBlock,
      showIsQuickAdmitBlock
    } = this.state

    const fromCreationDate =
      FromCreationDate !== "" ? moment(FromCreationDate, dateFormat) : moment(new Date(), dateFormat)
    const toCreationDate = ToCreationDate !== "" ? moment(ToCreationDate, dateFormat) : moment(new Date(), dateFormat)

    const fromTerminationDate =
      FromTerminationDate !== "" ? moment(FromTerminationDate, dateFormat) : moment(new Date(), dateFormat)
    const toTerminationDate =
      ToTerminationDate !== "" ? moment(ToTerminationDate, dateFormat) : moment(new Date(), dateFormat)

    if (onRowClick) {
      return <Redirect to={`/offering/${selectRowOfferingID}`} />
    } else {
      return (
        <Layout className="layout">
          <Header />
          <Content style={{ padding: "0 50px" }}>
            <Breadcrumb />
            <div className="site-layout-content">
              <Row>
                <Title level={3}>Manage Offerings</Title>
              </Row>
              <Toolbar
                filterCount={this.filterCount}
                filterColumnVisible={showFilter}
                toggleFilter={this.toggleFilter}
              />
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={styles.paddingTop10px}>
                <Col
                  className={showFilter ? `gutter-row ${styles.offeringFilter}` : styles.hidden}
                  xs={24}
                  sm={24}
                  md={5}
                >
                  <Row>
                    <Col span={12}>
                      <Title level={4}>Offering Filter</Title>
                    </Col>
                    <Col span={12} className={styles.padding5px}>
                      <span onClick={this.toggleFilter}>
                        <CloseOutlined style={{ fontSize: "20px", color: "black", float: "right" }} />
                      </span>
                    </Col>
                  </Row>
                  <Row>
                    <Checkbox onChange={this.toggleOfferingCodeBLock}>Offering Code</Checkbox>
                    <Row className={showOfferingCodeBlock ? styles.offeringFilterField : styles.hidden}>
                      <Input
                        name="OfferingCode"
                        defaultValue=""
                        value={OfferingCode === "*" ? "" : OfferingCode}
                        onChange={this.handleInputChange}
                      />
                    </Row>
                  </Row>
                  <Row>
                    <Checkbox onChange={this.toggleOfferingNameBLock}>Offering Name</Checkbox>
                    <Row className={showOfferingNameBlock ? styles.offeringFilterField : styles.hidden}>
                      <Input
                        name="OfferingName"
                        defaultValue=""
                        value={OfferingName === "*" ? "" : OfferingName}
                        onChange={this.handleInputChange}
                      />
                    </Row>
                  </Row>
                  <Row>
                    <Checkbox onChange={this.toggleCreationDateBLock}>Creation Date</Checkbox>
                    <Row className={showCreationDateBlock ? styles.offeringFilterField : styles.hidden}>
                      <RangePicker
                        value={[fromCreationDate, toCreationDate]}
                        onChange={this.handleCreationDateChange}
                        format={dateFormat}
                      />
                    </Row>
                  </Row>
                  <Row>
                    <Checkbox onChange={this.toggleTerminationDateBLock}>Termination Date</Checkbox>
                    <Row className={showTerminationDateBlock ? styles.offeringFilterField : styles.hidden}>
                      <RangePicker
                        value={[fromTerminationDate, toTerminationDate]}
                        onChange={this.handleTerminationDateChange}
                        format={dateFormat}
                      />
                    </Row>
                  </Row>
                  <Row>
                    <Checkbox onChange={this.toggleIsQuickAdmitBLock}>Is QuickAdmit</Checkbox>
                    <Row className={showIsQuickAdmitBlock ? styles.offeringFilterField : styles.hidden}>
                      <Select defaultValue="1" style={{ width: 200 }}>
                        <Option value="1">Yes</Option>
                        <Option value="2">No</Option>
                      </Select>
                    </Row>
                  </Row>
                  <Row className={styles.floatRight}>
                    <Button type="primary" className={styles.applyBtn} onClick={this.handleSubmit}>
                      Apply
                    </Button>
                  </Row>
                </Col>
                <Col
                  className={`gutter-row ${styles.offeringDetails}`}
                  xs={24}
                  sm={24}
                  md={{ span: showFilter ? 18 : 24, offset: showFilter ? 1 : 0 }}
                >
                  <Table
                    onRow={(record, rowIndex) => {
                      return {
                        onClick: (event) => {
                          this.setState({ onRowClick: true, selectRowOfferingID: record.OfferingID })
                        }
                      }
                    }}
                    columns={this.columns}
                    dataSource={offeringItems}
                    loading={loading}
                    bordered
                    expandedRowRender={OfferingPage.expandableRowRender}
                    rowKey="OfferingID"
                    pagination={{ position: ["topLeft"] }}
                    scroll={{ x: "fit-content" }}
                  />
                </Col>
              </Row>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>Jenzbar ©2020 Created by Jenzabar Team</Footer>
        </Layout>
      )
    }
  }
}

export default OfferingPage
