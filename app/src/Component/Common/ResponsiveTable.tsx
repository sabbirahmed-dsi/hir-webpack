import React, { useEffect, useState } from "react"
import { Breakpoint } from "antd/lib/_util/responsiveObserve"
import Table, { TableProps, ColumnsType } from "antd/lib/table"
import { useDeviceViews, IDeviceView } from "~/Hooks/useDeviceViews"
import { IApiResponse, RESPONSE_TYPE } from "@packages/api/lib/utils/Interfaces"
import moment from "moment"
import { DATE_FORMAT, DATE_TIME_FORMAT, TIME_FORMAT } from "~/utils/Constants"
import { eventBus, REFRESH_MODAl, REFRESH_PAGE } from "~/utils/EventBus"
import { Button, Dropdown, Menu } from "antd"
import { ReadOutlined, DownloadOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { useFirstRender } from "~/Hooks/useFirstRender"

export type TableColumnType = ColumnsType<{ [key: string]: any }>

// TODO: Currently we have generic responsive support for
// only one set of breakpoints, we need support for multiple set of
// breakpoints
export const renderDetailsLink = (url: string): JSX.Element => {
  return (
    <Link to={url}>
      <ReadOutlined />
    </Link>
  )
}
export const renderLink = (url: string, text: string, isModal?: boolean) =>
  !isModal ? <Link to={url}>{text}</Link> : <span>{`${text}`}</span>
export const renderDecimal = (text: any) =>
  typeof text === "number" && !isNaN(Number(text)) ? Number(text).toFixed(2) : text
export const renderEmail = (text: any): JSX.Element => (text !== null ? <a href={`mailto:${text}`}>{text}</a> : <></>)
export const renderDate = (text: any) => (text !== null ? moment(text).format(DATE_FORMAT) : "")
export const renderDateTime = (text: any) => (text !== null ? moment(text).format(DATE_TIME_FORMAT) : "")
export const renderTime = (text: any) => (text !== null ? moment(text).format(TIME_FORMAT) : "")
export const renderBoolean = (text: any) => {
  if (typeof text === "boolean") {
    return text ? "Yes" : "No"
  } else return ""
}

export const renderWeek = (text: any[], record: any) => {
  const weeks: string[] = ["Monday", "TuesDay", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  return text && Array.isArray(text) && weeks.filter((x, i) => text.includes(i + 1))
}

export const sortByBoolean = (a: boolean, b: boolean) => (a === b ? 0 : a ? -1 : 1)
export const sortByString = (a: string, b: string) => a.localeCompare(b)
export const sortByTime = (a?: string, b?: string) => {
  const aa = a ? new Date(a).getTime() : 0
  const bb = b ? new Date(b).getTime() : 0

  return aa === bb ? 0 : aa ? -1 : 1
}
export const sortByNumber = (a?: number, b?: number) => {
  return (a || 0) > (b || 0) ? -1 : 1
}
export interface IDataTableProps extends TableProps<{ [key: string]: any }> {
  columns: TableColumnType
  searchParams?: any
  searchFunc?: (Params: any, headers?: { [key: string]: any }) => Promise<IApiResponse>
  dataLoaded?: (Params: any) => void
  expandableColumnIndices?: number[]
  responsiveColumnIndices?: number[]
  expandableRowRender?: (record: any, mobileView: boolean) => JSX.Element
  breakpoints?: Breakpoint[]
  isModal?: boolean
  refreshEventName?: string
  rowKey?: string
}

export function ResponsiveTable(props: IDataTableProps) {
  const {
    columns,
    searchParams,
    searchFunc,
    dataLoaded,
    expandableColumnIndices,
    responsiveColumnIndices,
    breakpoints,
    isModal,
    ...otherTableProps
  } = props

  const [loading, setLoading] = useState(false)
  const [mobileView, setMobileView] = useState<boolean>(false)
  const [downloading, setDownloading] = useState(false)
  const firstRender = useFirstRender()

  const loadDataFromSearchFunc = () => {
    if (loading) {
      return
    } else if (otherTableProps.dataSource) {
      setTableProps()
    } else if (searchParams && searchFunc) {
      setLoading(true)
      typeof searchParams === "object" &&
        Object.keys(searchParams).forEach((key) => {
          if (searchParams[key] === "") delete searchParams[key]
        })
      searchFunc(searchParams).then((x) => {
        if (x.success && Array.isArray(x.data)) {
          const data = x.data.map((y: any, i: number) => {
            y.rowKey = i
            return y
          })
          setTableProps(data)
          dataLoaded && dataLoaded(data)
        }
        setTimeout(() => {
          setLoading(false)
        }, 0)
      })
    }
  }
  useEffect(() => {
    if (!firstRender) loadDataFromSearchFunc()
    // eslint-disable-next-line
  }, [otherTableProps.dataSource, searchParams])

  useEffect(() => {
    const eventName = isModal ? REFRESH_MODAl : props.refreshEventName ? props.refreshEventName : REFRESH_PAGE
    console.log("refreshEventName in responsive table ", props.refreshEventName)

    eventBus.subscribe(eventName, loadDataFromSearchFunc)
    eventBus.publish(eventName)
    return () => {
      eventBus.unsubscribe(eventName)
    }

    // eslint-disable-next-line
  }, [])

  useDeviceViews((deviceViews: IDeviceView) => {
    setMobileView(deviceViews.mobile)
  })

  const expandableRowRender = (record: any, mobileView: boolean): JSX.Element => {
    const _columns: any = columns
    const expandableRowElements = expandableColumnIndices ? (
      <>
        {expandableColumnIndices
          .filter((index) => index <= _columns.length)
          .map((index, i) => {
            const _index = index - 1
            const title = _columns[_index].title
            const text = record[_columns[_index].dataIndex]
            return (
              <React.Fragment key={i}>
                {title && text && (
                  <li>
                    <span>{title} : </span>
                    <span>
                      {" "}
                      {_columns[_index] && _columns[_index].render ? _columns[_index].render(text, record) : text}
                    </span>
                  </li>
                )}
              </React.Fragment>
            )
          })}
      </>
    ) : null
    const responsiveExpandableRowElements =
      responsiveColumnIndices && responsiveColumnIndices.length > 0 && mobileView ? (
        <>
          {responsiveColumnIndices
            .filter((index) => {
              return !expandableColumnIndices?.includes(index) || index <= _columns.length
            })
            .map((index, i) => {
              const _index = index - 1
              const title = _columns[_index].title
              let text: any = record[_columns[_index].dataIndex]
              if (Array.isArray(text)) text = text.toString()
              else if (typeof text === "boolean") text = renderBoolean(text)
              return (
                <React.Fragment key={i}>
                  {title && text && (
                    <li>
                      <span>{title} : </span>
                      <span>
                        {" "}
                        {_columns[_index] && _columns[_index].render ? _columns[_index].render(text, record) : text}
                      </span>
                    </li>
                  )}
                </React.Fragment>
              )
            })}
        </>
      ) : null

    return (
      <ul>
        {expandableRowElements}
        {responsiveExpandableRowElements}
      </ul>
    )
  }

  const [conditionalProps, setConditionalProps] = useState<{ [key: string]: any }>({})
  const setTableProps = (data?: any) => {
    const _conditionalProps: TableProps<{ [key: string]: string }> = {
      columns: columns
        .filter((x, i) => {
          const include = !expandableColumnIndices?.includes(i + 1)
          return include
        })
        .filter((x, i) => {
          return !(mobileView && responsiveColumnIndices?.includes(i + 1))
        }),
      ...otherTableProps
    }

    _conditionalProps.dataSource = otherTableProps.dataSource ? otherTableProps.dataSource : data

    if (otherTableProps.expandableRowRender) {
      _conditionalProps.expandedRowRender = (record: any) =>
        otherTableProps.expandableRowRender && otherTableProps.expandableRowRender(record, mobileView)
    } else if (
      !!(
        (expandableColumnIndices && expandableColumnIndices?.length > 0) ||
        (responsiveColumnIndices && responsiveColumnIndices?.length > 0)
      )
    ) {
      _conditionalProps.expandedRowRender = (record: any) => {
        return expandableRowRender(record, mobileView)
      }
    }
    _conditionalProps.scroll = { x: columns.length }
    _conditionalProps.rowSelection = otherTableProps.rowSelection
    _conditionalProps.rowKey = props.rowKey ? props.rowKey : "rowKey"
    _conditionalProps.pagination =
      typeof props.pagination === "boolean" && !props.pagination
        ? props.pagination
        : _conditionalProps.dataSource && _conditionalProps.dataSource?.length > 0
        ? { position: ["topLeft"], pageSize: 20, simple: true }
        : false
    setConditionalProps(_conditionalProps)
  }

  const downloadData = (fileType: string) => {
    let header = {}
    switch (fileType) {
      case RESPONSE_TYPE.EXCEL:
        header = { ResponseType: "application/vnd.ms-excel" }
        break
      case RESPONSE_TYPE.CSV:
        header = { ResponseType: "text/csv" }
        break
    }

    setDownloading(true)
    console.log("header in responsive table ", header)
    searchFunc &&
      searchFunc(searchParams, header).then((x) => {
        setDownloading(false)
      })
  }

  return (
    <div>
      {searchFunc &&
        searchParams &&
        conditionalProps &&
        !isModal &&
        conditionalProps.dataSource &&
        conditionalProps.dataSource.length > 0 && (
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item>
                  <Button type="link" onClick={() => downloadData(RESPONSE_TYPE.CSV)}>
                    CSV
                  </Button>
                </Menu.Item>
                <Menu.Item>
                  <Button type="link" onClick={() => downloadData(RESPONSE_TYPE.EXCEL)}>
                    Excel
                  </Button>
                </Menu.Item>
              </Menu>
            }
            trigger={["click"]}
          >
            <Button
              loading={downloading}
              disabled={downloading}
              style={{ position: "absolute", zIndex: 100, right: "25px", top: "15px", border: "1px solid" }}
              type="default"
              // style={{ float: "right", right: "15px", top: "15px", border: "1px solid" }}
              // type="link"
              onClick={(e) => e.preventDefault()}
              icon={<DownloadOutlined />}
            />
          </Dropdown>
        )}
      <Table {...conditionalProps} loading={otherTableProps.loading || loading} />
    </div>
  )
}
