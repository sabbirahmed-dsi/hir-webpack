import React, { useState } from "react"
import { Button, Menu } from "antd"
import { FormModal } from "~/Component/Common/Form/FormModal2"
import { StudentHoldFormMeta } from "./StudentHoldFormMeta"
import { createUpdateStudentHold, releaseStudentHold } from "~/ApiServices/Service/StudentService"
import { StudentReleaseFormMeta } from "./StudentReleaseFormMeta"

interface IStudentHoldMenu {
  initialData: { [key: string]: any }
}

export default function StudentHoldMenu(props: IStudentHoldMenu) {
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showReleaseModal, setShowReleaseModal] = useState(false)

  return (
    <Menu>
      <Menu.Item key="0">
        <Button
          type="link"
          onClick={() => {
            setShowUpdateModal(true)
          }}
        >
          Edit
        </Button>
        {showUpdateModal && (
          <FormModal
            meta={StudentHoldFormMeta}
            title={"Edit Hold"}
            initialFormValue={props.initialData}
            defaultFormValue={props.initialData}
            formSubmitApi={createUpdateStudentHold}
            refreshEventAfterFormSubmission={"REFRESH_HOLD_TAB"}
            closeModal={() => setShowUpdateModal(false)}
          />
        )}
      </Menu.Item>
      <Menu.Item key="1">
        <Button
          type="link"
          danger
          onClick={() => {
            setShowReleaseModal(true)
          }}
        >
          Release
        </Button>
        {showReleaseModal && (
          <FormModal
            meta={StudentReleaseFormMeta}
            title={"Release Hold"}
            initialFormValue={props.initialData}
            defaultFormValue={props.initialData}
            formSubmitApi={releaseStudentHold}
            refreshEventAfterFormSubmission={"REFRESH_HOLD_TAB"}
            closeModal={() => setShowReleaseModal(false)}
          />
        )}
      </Menu.Item>
    </Menu>
  )
}