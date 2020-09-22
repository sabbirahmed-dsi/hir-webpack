import React from "react"
import { Menu } from "antd"
import { Link } from "react-router-dom"

interface ISectionMenu {
  section: { [key: string]: any }
}
export default function SectionMenu(props: ISectionMenu) {
  return (
    <Menu>
      <Menu.Item key="0">
        <Link to={`/section/${props.section.SectionID}/seatgroup`}>Seatgroup</Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to={`/section/${props.section.SectionID}/budget`}>Budget</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to={`/section/${props.section.SectionID}/schedule`}>Schedule</Link>
      </Menu.Item>
    </Menu>
  )
}
