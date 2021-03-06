import React, { useState } from "react"
import { Form, Card, Button, Input } from "antd"
import { addApplicationComment, addProgramAdmReqComment } from "~/ApiServices/BizApi/program/programApplicationIF"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { OldFormError } from "~/Component/Common/OldForm/OldFormError"
import "~/Sass/utils.scss"

interface IApplicationNoteFormProps {
  ProgramAppID: number
  ProgramAdmReqID?: number
  handleCancel: () => void
  setApiCallInProgress: (flag: boolean) => void
  formInstance: any
  fieldNames: { [key: string]: any }
}

const layout = {
  labelCol: { span: 6 }
}

export default function ProgramApplicationNoteForm(props: IApplicationNoteFormProps) {
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])

  const onFormSubmission = async () => {
    await props.formInstance.validateFields()
    const params = props.formInstance.getFieldsValue()

    type serviceMethodType = (params: { [key: string]: any }) => Promise<IApiResponse>

    const param: { [key: string]: any } = {}
    let serviceMethoToCall: serviceMethodType
    if (props.ProgramAdmReqID) {
      param["ProgramAppID"] = props.ProgramAppID
      param["ProgramAdmReqID"] = props.ProgramAdmReqID
      param["Comment"] = params["CommentText"]
      serviceMethoToCall = addProgramAdmReqComment
    } else {
      param["ProgramAppID"] = props.ProgramAppID
      param["Comment"] = params["CommentText"]
      serviceMethoToCall = addApplicationComment
    }

    props.setApiCallInProgress(true)
    setErrorMessages([])
    const response = await serviceMethoToCall(param)
    props.setApiCallInProgress(false)

    if (response && response.success) {
      eventBus.publish(REFRESH_PAGE)
      props.handleCancel()
    } else {
      setErrorMessages(response.error)
      console.log(response.error)
      console.log(errorMessages)
    }
  }

  const actions = []
  actions.push(<Button onClick={props.handleCancel}>Cancel</Button>)
  actions.push(<Button onClick={onFormSubmission}>Submit</Button>)

  return (
    <Card title={`Add Note`} actions={actions}>
      <Form form={props.formInstance} className="modal-form">
        <OldFormError errorMessages={errorMessages} />
        <Form.Item className="hidden" name={props.fieldNames.ProgramAppID}>
          <Input aria-label="Program Application ID" value={props.ProgramAppID ? props.ProgramAppID : undefined} />
        </Form.Item>

        <Form.Item className="hidden" name={props.fieldNames.ProgramAdmReqID}>
          <Input
            aria-label="Program Admission Requirement ID"
            value={props.ProgramAdmReqID ? props.ProgramAdmReqID : undefined}
          />
        </Form.Item>

        <Form.Item
          label="Comment"
          {...layout}
          name={props.fieldNames.CommentText}
          rules={[{ required: true, message: "Please enter comment!" }]}
        >
          <Input.TextArea rows={4} aria-label="Comment" />
        </Form.Item>
      </Form>
    </Card>
  )
}
