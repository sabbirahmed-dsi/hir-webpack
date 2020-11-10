import React, { useEffect, useState } from "react"
import { Form, Button, Input, Select, Switch, DatePicker, Spin } from "antd"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import FormError from "~/Component/Common/FormError"
import { DATE_TIME_FORMAT, REQUEST_DATE_TIME_FORMAT } from "~/utils/Constants"
import { getGradeScaleType, getCreditType } from "~/ApiServices/Service/RefLookupService"
import { editRegistration } from "~/ApiServices/Service/RegistrationService"
import { IRegistrationFieldNames } from "~/Component/Registration/Interfaces"
import "~/Sass/utils.scss"
import moment from "moment"

interface IRegistrationUpdateFormProps {
  initialFormValue: { [key: string]: any }
  fieldNames: IRegistrationFieldNames
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 6 }
}

const btnLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 }
}

export default function RegistrationUpdateForm(props: IRegistrationUpdateFormProps) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const [gradeScaleItems, setGradeScaleItems] = useState<Array<any>>([])
  const [transcriptItems, setTranscriptItems] = useState<Array<any>>([])
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])

  const creationTime = props.initialFormValue.CreationTime
  const terminationTime = props.initialFormValue.TerminationTime
  const completionDate = props.initialFormValue.CompletionDate

  useEffect(() => {
    ;(async function () {
      const result = await getGradeScaleType()
      if (result && result.success) {
        setGradeScaleItems(result.data)
      }
    })()
    ;(async function () {
      const result = await getCreditType()
      if (result && result.success) {
        setTranscriptItems(result.data)
      }
    })()
  }, [form])

  const onFormSubmission = async () => {
    await form.validateFields()
    const params = form.getFieldsValue()
    console.log("Params: ", params)

    setLoading(true)
    setErrorMessages([])
    const response = await editRegistration(params)
    if (response && response.success) {
      form.resetFields()
      console.log("Successfully updated......")
      window.location.reload()
    } else {
      setErrorMessages(response.error)
      console.log(response.error)
      console.log(errorMessages)
    }
    setLoading(false)
  }

  const onCreationTimeChange = (date: any, dateString: string) => {
    form.setFieldsValue({ [props.fieldNames.CreationTime]: date })
  }

  const onTerminationTimeChange = (date: any, dateString: string) => {
    form.setFieldsValue({ [props.fieldNames.TerminationTime]: date })
  }

  const onEffectiveDateChange = (date: any, dateString: string) => {
    form.setFieldsValue({ [props.fieldNames.StatusDate]: date })
  }

  return (
    <Spin size="large" spinning={loading}>
      <Form form={form} initialValues={props.initialFormValue}>
        <FormError errorMessages={errorMessages} />

        <Form.Item className="hidden" name={props.fieldNames.StudentID}>
          <Input aria-label="Student ID" />
        </Form.Item>
        <Form.Item className="hidden" name={props.fieldNames.SectionID}>
          <Input aria-label="Section ID" />
        </Form.Item>
        <Form.Item className="hidden" name={props.fieldNames.SeatGroupID}>
          <Input aria-label="SeatGroup ID" />
        </Form.Item>

        <Form.Item
          label="Grade Scale"
          rules={[{ required: true, message: "Please select your answer!" }]}
          {...layout}
          name={props.fieldNames.GradeScaleTypeID}
        >
          <Select aria-label="Grade Scale">
            {gradeScaleItems.map((x) => {
              return (
                <Select.Option key={x.ID} value={x.ID}>
                  {x.Name}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>

        <Form.Item
          label="Transcript"
          rules={[{ required: true, message: "Please select your answer!" }]}
          {...layout}
          name={props.fieldNames.TranscriptCreditTypeID}
        >
          <Select aria-label="Transcript">
            {transcriptItems.map((x) => {
              return (
                <Select.Option key={x.ID} value={x.ID}>
                  {x.Name}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>

        <Form.Item className="hidden" name={props.fieldNames.CreationTime}>
          <Input aria-label="Creation time" />
        </Form.Item>

        <Form.Item label="Creation Time" rules={[{ required: true, message: "Please pick the date!" }]} {...layout}>
          <DatePicker
            aria-label="Pick Creation Date"
            placeholder={DATE_TIME_FORMAT}
            format={DATE_TIME_FORMAT}
            onChange={onCreationTimeChange}
            defaultValue={creationTime ? moment(creationTime, REQUEST_DATE_TIME_FORMAT) : undefined}
          />
        </Form.Item>

        <Form.Item className="hidden" name={props.fieldNames.TerminationTime}>
          <Input aria-label="Termination time" />
        </Form.Item>

        <Form.Item label="Termination Time" rules={[{ required: true, message: "Please pick the date!" }]} {...layout}>
          <DatePicker
            aria-label="Pick Termination Date"
            placeholder={DATE_TIME_FORMAT}
            format={DATE_TIME_FORMAT}
            onChange={onTerminationTimeChange}
            defaultValue={terminationTime ? moment(terminationTime, REQUEST_DATE_TIME_FORMAT) : undefined}
          />
        </Form.Item>

        <Form.Item className="hidden" name={props.fieldNames.StatusDate}>
          <Input aria-label="Completion date" />
        </Form.Item>

        <Form.Item label="Effective Date" rules={[{ required: true, message: "Please pick the date!" }]} {...layout}>
          <DatePicker
            aria-label="Pick Effective Date"
            placeholder={DATE_TIME_FORMAT}
            format={DATE_TIME_FORMAT}
            onChange={onEffectiveDateChange}
            defaultValue={completionDate ? moment(completionDate, REQUEST_DATE_TIME_FORMAT) : undefined}
          />
        </Form.Item>

        <Form.Item label="Repeat/Retake" {...layout} valuePropName="checked" name={props.fieldNames.IsRepeat}>
          <Switch aria-label="Repeat/Retake" />
        </Form.Item>

        <Form.Item
          label="Complete status on termination"
          {...layout}
          valuePropName="checked"
          name={props.fieldNames.IsCompleteOnTermination}
        >
          <Switch aria-label="Complete status on termination" />
        </Form.Item>

        <Form.Item
          label="Expected Attendance"
          rules={[{ required: true, message: "Please input your answer!" }]}
          {...layout}
          name={props.fieldNames.AttendanceExpected}
        >
          <Input aria-label="Expected Attendance" />
        </Form.Item>

        <Form.Item {...btnLayout}>
          <Button type="primary" style={{ float: "right" }} onClick={onFormSubmission}>
            Update
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  )
}
