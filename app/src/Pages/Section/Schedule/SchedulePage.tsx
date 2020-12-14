import React, { useState } from "react"
import { Row, Col, Typography } from "antd"
import styles from "~/Pages/Section/Schedule/Schedule.module.scss"
import { ResponsiveTable } from "~/Component/Common/ResponsiveTable"
import ScheduleCreateModal from "~/Component/Section/Schedule/ScheduleCreateModal"
import ScheduleUpdateMenu from "~/Component/Section/Schedule/ScheduleUpdateMenu"
import ScheduleRemoveMenu from "~/Component/Section/Schedule/ScheduleRemoveMenu"
import { getSectionScheduleTableColumns } from "~/FormMeta/SectionSchedule/ScheduleTableColumns"
import { REFRESH_SECTION_SCHEDULE_PAGE } from "~/utils/EventBus"

const { Title } = Typography

export default function SectionSchedulePage(props: { sectionID: number; title?: string }) {
  const [loading, setLoading] = useState<boolean>(false)
  const [schedueIDs, setScheduleIDs] = useState<Array<any>>([])

  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      const rowData = [...selectedRows]
      const rowIDs: number[] = []
      rowData.forEach((key) => {
        rowIDs.push(key.ScheduleID)
      })
      setScheduleIDs(rowIDs)
    }
  }

  return (
    <div className="site-layout-content">
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {props.title && (
          <Col className="gutter-row" xs={24} sm={24} md={12}>
            <Title level={3}>{props.title}</Title>
          </Col>
        )}
        <Col className={`gutter-row ${styles.textAlignRight}`} xs={24} sm={24} md={props.title ? 12 : 24}>
          <ScheduleCreateModal sectionId={props.sectionID} />
          <ScheduleUpdateMenu sectionId={props.sectionID} scheduleIds={schedueIDs} style={{ marginLeft: "5px" }} />
          <ScheduleRemoveMenu
            sectionId={props.sectionID}
            scheduleIds={schedueIDs}
            style={{ marginLeft: "5px" }}
            setLoading={setLoading}
          />
        </Col>
      </Row>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={"padding-top-10"}>
        <Col className="gutter-row" xs={24} sm={24} md={{ span: 24, offset: 0 }}>
          <ResponsiveTable
            refreshEventName={REFRESH_SECTION_SCHEDULE_PAGE}
            loading={loading}
            searchParams={{ SectionID: props.sectionID }}
            {...getSectionScheduleTableColumns(props.sectionID)}
            rowKey="ScheduleID"
            rowSelection={rowSelection}
          />
        </Col>
      </Row>
    </div>
  )
}
