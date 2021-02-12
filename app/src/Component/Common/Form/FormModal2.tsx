import React, { useState } from "react"
import Modal from "~/Component/Common/Modal/index2"
import zIndex from "~/utils/zIndex"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { IField } from "~/Component/Common/Form/common"
import { Form } from "antd"
import { eventBus } from "~/utils/EventBus"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { CustomForm } from "~/Component/Common/Form/index2"

export const FormModal = (props: {
  title: string
  meta: IField[]
  initialFormValue?: { [key: string]: any }
  defaultFormValue?: { [key: string]: any }
  isHorizontal?: boolean
  formSubmitApi: (Params: any) => Promise<IApiResponse>
  closeModal: () => void
  refreshEventAfterFormSubmission?: string
}) => {
  const [formInstance] = Form.useForm()
  const [clearTrigger, setClearTrigger] = useState(false)
  const [error, setError] = useState<Array<ISimplifiedApiErrorMessage>>()
  const [loading, setLoading] = useState(false)
  const clearParams = () => {
    Object.keys(formInstance.getFieldsValue()).forEach((key) => formInstance.setFieldsValue({ [key]: undefined }))
    setClearTrigger(!clearTrigger)
  }

  const submit = (newValues: { [key: string]: any }) => {
    setError([])
    setLoading(true)
    props.formSubmitApi(newValues).then((x) => {
      if (x.success) {
        props.refreshEventAfterFormSubmission && eventBus.publish(props.refreshEventAfterFormSubmission)
        setLoading(false)
        closeModal()
      } else {
        setError(x.error)
        setLoading(false)
      }
    })
  }

  const closeModal = () => {
    clearParams()
    props.closeModal()
  }

  return (
    <Modal width="1000px" zIndex={zIndex.defaultModal}>
      <CustomForm
        meta={props.meta}
        title={props.title}
        loading={loading}
        isHorizontal={props.isHorizontal}
        closeModal={props.closeModal}
        initialFormValue={props.initialFormValue}
        defaultFormValue={props.defaultFormValue}
        applyButtonLabel="Submit"
        stopProducingQueryParams={true}
        errorMessages={error}
        onApplyChanges={(newValues: { [key: string]: any }) => {
          console.log("calling onApplyChanges ", newValues)
          submit(newValues)
        }}
      />
    </Modal>
  )
}
