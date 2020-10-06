import React from "react"
import { AppState } from "~/Store"
import OfflineAlert from "~/Component/Alerts/Offline"
import LoginModal from "~/Component/Login/LoginModal"
import CreateNewOfferingModal from "~/Component/Offering/CreateEdit/OfferingFormModal"
import OfferingFinancialFormModal from "~/Component/Offering/Financial/OfferingFinancialFormModal"
import OfferingApprovalFormModal from "~/Component/Offering/Approval/OfferingApprovalFormModal"
import OfferingRequisiteGroupFormModal from "~/Component/Offering/Requisite/RequisiteFormModal"
import AddOfferingFromRequisiteGroupModal from "~/Component/Offering/Requisite/AddOfferingFromRequisiteGroupModal"
import AddInstructorFromInstructorModal from "~/Component/Offering/QualifiedInstructor/AddInstructorFromInstructorModal"
import SectionFormModal from "~/Component/Section/CreateEdit/SectionFormModal"
import SectionCopyModal from "~/Component/Section/Copy/SectionCopyModal"
import SectionSeatGroupFormModal from "~/Component/Section/SeatGroup/SectionSeatGroupFormModal"
import SeatGroupAffiliatedOrganization from "~/Component/Section/SeatGroup/SeatGroupAffiliatedOrganizationModal"
import ScheduleFormModal from "~/Component/Section/Schedule/ScheduleFormModal"
import ScheduleLocationFromModal from "~/Component/Section/Schedule/ScheduleLocationFormModal"
// import CreateNewBudgetModal from "~/Component/Section/Budget/BudgetFormModal"
import { IModalState } from "~/Store/ModalState"
import { connect } from "react-redux"
import AddProgramModal from "~/Component/Program/AddProgramModal"
import RoomFinderModal from "./Section/RoomFinder/RoomFinderModal"
import BudgetFormModal from "~/Component/Section/Budget/BudgetFormModal"
import BudgetEditFormModal from "~/Component/Section/Budget/BudgetEditFormModal"
import DiscountFomrModal from "~/Component/Section/Discount/DiscountFormModal"
import DiscountEditFormModal from "~/Component/Section/Discount/DiscountEditFormModal"
import QuestionCreateModal from "~/Component/Question/Create/QuestionCreateModal"
import QuestionFindModal from "~/Component/Question/Search/QuestionFindModal"

function ModalContainer(modalState: IModalState) {
  return (
    <>
      <OfflineAlert />
      {modalState.loginModal.value && <LoginModal />}
      {modalState.createOfferingModal.value && (
        <CreateNewOfferingModal offeringId={modalState.createOfferingModal.config.OfferingId} />
      )}
      {modalState.createOfferingFinancialModal.value && (
        <OfferingFinancialFormModal
          offeringFinancialId={modalState.createOfferingFinancialModal.config.financialId}
          offeringID={modalState.createOfferingFinancialModal.config.offeringId}
        />
      )}
      {modalState.offeringApprovalModal.value && (
        <OfferingApprovalFormModal offeringID={modalState.offeringApprovalModal.config.offeringId} />
      )}
      {modalState.offeringPrerequisiteGroupModal.value && (
        <OfferingRequisiteGroupFormModal
          offeringID={modalState.offeringPrerequisiteGroupModal.config.offeringId}
          requisiteGroupID={modalState.offeringPrerequisiteGroupModal.config.requisiteGroupId}
        />
      )}
      {modalState.addOfferingFromRequisiteGroupModal.value && (
        <AddOfferingFromRequisiteGroupModal
          offeringID={modalState.addOfferingFromRequisiteGroupModal.config.offeringId}
          requisiteGroupID={modalState.addOfferingFromRequisiteGroupModal.config.requisiteGroupId}
        />
      )}
      {modalState.addInstructorFromInstructorModal.value && (
        <AddInstructorFromInstructorModal
          offeringID={modalState.addInstructorFromInstructorModal.config.offeringId}
          rowData={modalState.addInstructorFromInstructorModal.config.rowData}
        />
      )}
      {modalState.createSectionModal.value && <SectionFormModal />}
      {modalState.copySectionModal.value && <SectionCopyModal />}
      {modalState.createSectionSeatGroupModal.value && (
        <SectionSeatGroupFormModal
          sectionId={modalState.createSectionSeatGroupModal.config.sectionId}
          seatgroupId={modalState.createSectionSeatGroupModal.config.seatgroupId}
        />
      )}
      {modalState.addSeatGroupAffiliateOrganization.value && (
        <SeatGroupAffiliatedOrganization
          seatgroupId={modalState.addSeatGroupAffiliateOrganization.config.seatgroupId}
        />
      )}
      {modalState.createSectionScheduleModal.value && (
        <ScheduleFormModal
          sectionId={modalState.createSectionScheduleModal.config.sectionId}
          scheduleIds={modalState.createSectionScheduleModal.config.scheduleIds}
        />
      )}
      {modalState.updateSectionScheduleLocationModal.value && (
        <ScheduleLocationFromModal scheduleIds={modalState.updateSectionScheduleLocationModal.config.scheduleIds} />
      )}
      {modalState.addProgramModal.value && <AddProgramModal />}
      {modalState.createBudgetModal.value && (
        <BudgetFormModal sectionId={modalState.createBudgetModal.config.sectionId} />
      )}
      {modalState.updateBudgetModal.value && (
        <BudgetEditFormModal
          sectionId={modalState.updateBudgetModal.config.sectionId}
          financialId={modalState.updateBudgetModal.config.financialId}
          seatGroups={modalState.updateBudgetModal.config.seatGroups}
        />
      )}
      {modalState.createDiscountModal.value && (
        <DiscountFomrModal sectionId={modalState.createDiscountModal.config.sectionId} />
      )}
      {modalState.updateDiscountModal.value && (
        <DiscountEditFormModal
          sectionDiscountId={modalState.updateDiscountModal.config.sectionDiscountId}
          sectionId={modalState.updateDiscountModal.config.sectionId}
        />
      )}
      {modalState.questionCreateModal.value && <QuestionCreateModal />}
      {modalState.questionFindModal.value && <QuestionFindModal />}
      {modalState.roomFinderModal.value && (
        <RoomFinderModal onSelectRoom={modalState.roomFinderModal.config.onSelectRoomCallback} />
      )}
    </>
  )
}

const mapStateToProps = (state: AppState) => {
  return state.modalState
}

export default connect(mapStateToProps)(ModalContainer)
