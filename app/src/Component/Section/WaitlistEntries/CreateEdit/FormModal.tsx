import { Button, Card, Col, DatePicker, Form, Input, Radio, Row, Switch } from "antd"
import React, { useEffect, useState } from "react"
import Modal from "~/Component/Common/Modal/index2"
import DropDown from "~/Component/Common/Form/DropDown"
import { getSeatGroups } from "~/ApiServices/Service/SeatGroupService"
import { DATE_FORMAT, DEFAULT_HIR_ADMIN_SOURCE_ID, WAITLIST_ENTRIES_LOOKUP_TYPES } from "~/utils/Constants"
import PersonLookupModal from "~/Component/Section/WaitlistEntries/CreateEdit/PersonLookupModal"
import { eventBus, EVENT_PERSON_SELECTED_FOR_WAITLIST_ENTRY_CREATION, REFRESH_PAGE } from "~/utils/EventBus"
import { saveWaitListEntry } from "~/ApiServices/Service/WaitlistEntryService"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import FormError from "~/Component/Common/FormError"
import { findAccount } from "~/ApiServices/BizApi/account/accountIF"
import { getAllUsers } from "~/ApiServices/Service/HRUserService"
import { getSourceModule } from "~/ApiServices/Service/RefLookupService"

interface IWaitlistEntryCreateEditFormModal {
  WaitListEntry?: { [key: string]: any }
  SectionID: number
  setShowCreateModal: (flag: boolean) => void
}

interface IFormFields {
  SeatGroupID: string
  AccountID: string
  RequesterPersonID: string
  RecipientPersonID: string
  AdministratedByUID: string
  RequestExpirationTime: string
  SourceID: string
  ConfirmationEmailToRequester: string
  InvitationEmailToRequester: string
  InvitationEmailToRecipient: string
  Priority: string
  IsActive: string
}

const fieldNames: IFormFields = {
  SeatGroupID: "SeatGroupID",
  AccountID: "AccountID",
  RequesterPersonID: "RequesterPersonID",
  RecipientPersonID: "RecipientPersonID",
  AdministratedByUID: "AdministratedByUID",
  RequestExpirationTime: "RequestExpirationTime",
  SourceID: "SourceID",
  ConfirmationEmailToRequester: "ConfirmationEmailToRequester",
  InvitationEmailToRequester: "InvitationEmailToRequester",
  InvitationEmailToRecipient: "InvitationEmailToRecipient",
  Priority: "Priority",
  IsActive: "IsActive"
}

interface IParamsToBeDispatched {
  NameToDisplay: string
  Params: { [key: string]: string }
}

export default function WaitlistEntryCreateEditFormModal(props: IWaitlistEntryCreateEditFormModal) {
  const [formInstance] = Form.useForm()
  const [showPersonLookupModal, setShowPersonLookupModal] = useState(false)
  const [showAdministrators, setShowAdministrators] = useState(false)
  const [personNameToDisplay, setPersonNameToDisplay] = useState("")
  const [errorMessages, setErrorMessages] = useState<ISimplifiedApiErrorMessage[]>([])
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  useEffect(() => {
    if (props.WaitListEntry) {
      formInstance.setFieldsValue({ [fieldNames.SeatGroupID]: props.WaitListEntry.SeatGroupID })
      setPersonNameToDisplay(props.WaitListEntry.AccountName)
      formInstance.setFieldsValue({ [fieldNames.SourceID]: props.WaitListEntry.SourceID })
      formInstance.setFieldsValue({ [fieldNames.AdministratedByUID]: props.WaitListEntry.AdministratedByUID })
      formInstance.setFieldsValue({
        [fieldNames.ConfirmationEmailToRequester]: props.WaitListEntry.ConfirmationEmailToRequester
      })
      formInstance.setFieldsValue({
        [fieldNames.InvitationEmailToRequester]: props.WaitListEntry.InvitationEmailToRequester
      })
      formInstance.setFieldsValue({ [fieldNames.RequestExpirationTime]: props.WaitListEntry.RequestExpirationTime })
      formInstance.setFieldsValue({ [fieldNames.IsActive]: props.WaitListEntry.IsActive })
      formInstance.setFieldsValue({ [fieldNames.Priority]: props.WaitListEntry.Priority })
    } else {
      formInstance.setFieldsValue({ [fieldNames.SourceID]: DEFAULT_HIR_ADMIN_SOURCE_ID })
    }
  }, [formInstance, props.WaitListEntry])

  useEffect(() => {
    eventBus.subscribe(EVENT_PERSON_SELECTED_FOR_WAITLIST_ENTRY_CREATION, (person: IParamsToBeDispatched) => {
      findAccount([person.Params.RequesterPersonID]).then((x) => {
        if (x.success) {
          formInstance.setFieldsValue({ [fieldNames.RequesterPersonID]: person.Params.RequesterPersonID })
          formInstance.setFieldsValue({ [fieldNames.RecipientPersonID]: person.Params.RequesterPersonID })
          formInstance.setFieldsValue({ [fieldNames.AccountID]: x.data.AccountID })
          setPersonNameToDisplay(person.NameToDisplay)
        } else {
          setErrorMessages([{ message: "Selected Purchaser doesn't have an account, please select another one" }])
        }
      })
    })
    return () => {
      eventBus.unsubscribe(EVENT_PERSON_SELECTED_FOR_WAITLIST_ENTRY_CREATION)
    }
  }, [props, formInstance])

  return (
    <Modal
      width="800px"
      apiCallInProgress={apiCallInProgress}
      children={
        <Card
          title={props.WaitListEntry ? "Edit Waitlist Enntry" : "Create New Waitlist Entry"}
          actions={[
            <Button onClick={() => props.setShowCreateModal(false)}>Cancel</Button>,
            <Button
              onClick={() => {
                setApiCallInProgress(true)
                const Params = formInstance.getFieldsValue()
                if (!!props.WaitListEntry) {
                  Params.WaitListEntryID = props.WaitListEntry.WaitListEntryID
                  console.log(Params)
                }
                saveWaitListEntry(Params).then((x) => {
                  setApiCallInProgress(false)
                  if (x.success) {
                    eventBus.publish(REFRESH_PAGE)
                    props.setShowCreateModal(false)
                  } else setErrorMessages(x.error)
                })
              }}
            >
              Submit
            </Button>
          ]}
        >
          <Form form={formInstance} className="modal-form">
            <FormError
              errorMessages={errorMessages}
              genericInstructions={
                <ul>
                  <li>
                    All fields marked with an asterisk (<span style={{ color: "red" }}>*</span>) are required.
                  </li>
                </ul>
              }
            ></FormError>
            <DropDown
              label="Seat Group"
              fieldName={fieldNames.SeatGroupID}
              searchFunc={() => getSeatGroups(props.SectionID)}
              displayField="Name"
              valueField="SeatGroupID"
              labelColumn={{ span: 6 }}
              disabled={!!props.WaitListEntry}
            ></DropDown>
            <Form.Item label="Managed By" labelCol={{ span: 6 }}>
              <Radio.Group
                disabled={!!props.WaitListEntry}
                onChange={(value) => {
                  if (value.target.value === "admin") setShowAdministrators(true)
                  else setShowAdministrators(false)
                }}
              >
                <Radio value="self">Self Service</Radio>
                <Radio value="admin">By Admin</Radio>
              </Radio.Group>
            </Form.Item>
            {showAdministrators && (
              <DropDown
                disabled={!!props.WaitListEntry}
                label="Select Admin"
                fieldName={fieldNames.AdministratedByUID}
                searchFunc={getAllUsers}
                displayField="FormattedName"
                valueField="UserID"
                labelColumn={{ span: 6 }}
              ></DropDown>
            )}
            <Form.Item className="hidden" name={fieldNames.RequesterPersonID}>
              <Input />
            </Form.Item>
            <Form.Item className="hidden" name={fieldNames.RecipientPersonID}>
              <Input />
            </Form.Item>
            <Form.Item className="hidden" name={fieldNames.AccountID}>
              <Input />
            </Form.Item>
            <Form.Item label="Purchaser" labelCol={{ span: 6 }}>
              <Row>
                <Col span={18}>
                  <Input readOnly value={personNameToDisplay} />
                </Col>
                <Col span={6}>
                  <Button
                    onClick={() => {
                      setShowPersonLookupModal(true)
                    }}
                    disabled={!!props.WaitListEntry}
                  >
                    Select
                  </Button>
                  {showPersonLookupModal && (
                    <PersonLookupModal
                      type={WAITLIST_ENTRIES_LOOKUP_TYPES.PURCHASER}
                      closePersonLookupModal={setShowPersonLookupModal}
                    />
                  )}
                </Col>
              </Row>
            </Form.Item>
            <Form.Item label="Student" labelCol={{ span: 6 }}>
              <Input readOnly value={personNameToDisplay} />
            </Form.Item>
            <Form.Item label="Account" labelCol={{ span: 6 }}>
              <Input readOnly value={personNameToDisplay} />
            </Form.Item>
            <Form.Item
              name={fieldNames.ConfirmationEmailToRequester}
              label="Send Waitlist Confirmation"
              valuePropName="checked"
              labelCol={{ span: 6 }}
            >
              <Switch
                disabled={!!props.WaitListEntry}
                aria-label="Send Waitlist Confirmation"
                defaultChecked={formInstance.getFieldValue(fieldNames.ConfirmationEmailToRequester)}
              />
            </Form.Item>
            <Form.Item
              name={fieldNames.InvitationEmailToRecipient}
              label="Send Registration Invitation"
              valuePropName="checked"
              labelCol={{ span: 6 }}
            >
              <Switch
                disabled={!!props.WaitListEntry}
                aria-label="Send Registration Invitation"
                defaultChecked={formInstance.getFieldValue(fieldNames.InvitationEmailToRecipient)}
              />
            </Form.Item>
            <Form.Item>
              <DropDown
                label="Select Priority"
                fieldName={fieldNames.Priority}
                searchFunc={() =>
                  Promise.resolve({
                    success: true,
                    data: [
                      { id: 1 },
                      { id: 2 },
                      { id: 3 },
                      { id: 4 },
                      { id: 5 },
                      { id: 6 },
                      { id: 7 },
                      { id: 8 },
                      { id: 9 },
                      { id: 10 }
                    ],
                    error: undefined,
                    code: 200
                  })
                }
                displayField="id"
                valueField="id"
                labelColumn={{ span: 6 }}
              ></DropDown>
            </Form.Item>
            <Form.Item className="hidden" name={fieldNames.RequestExpirationTime}>
              <Input />
            </Form.Item>
            <Form.Item label="Expiration" labelCol={{ span: 6 }}>
              <DatePicker
                format={DATE_FORMAT}
                onChange={(value, dateString) => {
                  formInstance.setFieldsValue({ [fieldNames.RequestExpirationTime]: dateString })
                }}
              ></DatePicker>
            </Form.Item>
            <Form.Item name={fieldNames.IsActive} label="Is Active" valuePropName="checked" labelCol={{ span: 6 }}>
              <Switch aria-label="Is Active" defaultChecked={formInstance.getFieldValue(fieldNames.IsActive)} />
            </Form.Item>
            <DropDown
              label="Source"
              fieldName={fieldNames.SourceID}
              searchFunc={getSourceModule}
              displayField="Name"
              valueField="ID"
              labelColumn={{ span: 6 }}
              disabled={true}
            ></DropDown>
          </Form>
        </Card>
      }
    ></Modal>
  )
}