import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  DepartmentalSubordinateModified as DepartmentalSubordinateModifiedEvent,
  DepartmentalSuperiorAssigned as DepartmentalSuperiorAssignedEvent,
  DepartmentalSuperiorModified as DepartmentalSuperiorModifiedEvent,
  SubordinateAppraisal as SubordinateAppraisalEvent,
  TaskIssued as TaskIssuedEvent,
  TaskReport as TaskReportEvent
} from "../generated/WorkGroups/WorkGroups"
import {
  DepartmentalSubordinateModified,
  DepartmentalSuperiorAssigned,
  DepartmentalSuperiorModified,
  SubordinateAppraisal,
  TaskIssued,
  TaskReport
} from "../generated/schema"

export function handleDepartmentalSubordinateModified(
  event: DepartmentalSubordinateModifiedEvent
): void {
  let departmentalSubordinateModified = DepartmentalSubordinateModified.load(
    getIdFromDepartmentalEventParams(event.params.subordinateAddress, event.params.id))

  if(!departmentalSubordinateModified) {
    departmentalSubordinateModified = 
      new DepartmentalSubordinateModified(
        getIdFromDepartmentalEventParams(event.params.subordinateAddress, event.params.id))
  }

  departmentalSubordinateModified.department = event.params.department
  departmentalSubordinateModified.subordinateAddress = event.params.subordinateAddress
  departmentalSubordinateModified.id = event.params.id
  departmentalSubordinateModified.modification = event.params.modification
  
  departmentalSubordinateModified.save()
}

export function handleDepartmentalSuperiorAssigned(
  event: DepartmentalSuperiorAssignedEvent
): void {
  let departmentalSuperiorAssigned = DepartmentalSuperiorAssigned.load(
    getIdFromDepartmentalEventParams(event.params.superiorAddress, event.params.id))
  
  if(!departmentalSuperiorAssigned) {
    departmentalSuperiorAssigned = new DepartmentalSuperiorAssigned(
      getIdFromDepartmentalEventParams(event.params.superiorAddress, event.params.id))
  }

  departmentalSuperiorAssigned.department = event.params.department
  departmentalSuperiorAssigned.superiorAddress = event.params.superiorAddress
  departmentalSuperiorAssigned.id = event.params.id

  departmentalSuperiorAssigned.save()
}

export function handleDepartmentalSuperiorModified(
  event: DepartmentalSuperiorModifiedEvent
): void {
  let departmentalSuperiorModified = DepartmentalSuperiorModified.load(
    getIdFromDepartmentalEventParams(event.params.newSuperior, event.params.newId))
  
  if(!departmentalSuperiorModified) {
    departmentalSuperiorModified = new DepartmentalSuperiorModified(
      getIdFromDepartmentalEventParams(event.params.newSuperior, event.params.newId))
  }

  departmentalSuperiorModified.oldSuperior = event.params.oldSuperior
  departmentalSuperiorModified.newSuperior = event.params.newSuperior
  departmentalSuperiorModified.department = event.params.department
  departmentalSuperiorModified.newId = event.params.newId

  departmentalSuperiorModified.save()
}

export function handleSubordinateAppraisal(
  event: SubordinateAppraisalEvent
): void {
  let subordinateAppraisal = SubordinateAppraisal.load(
    getIdFromSubordinateEventParams(event.params.subordinateAddress, event.params.performanceScore))
  
  if(!subordinateAppraisal) {
    subordinateAppraisal = new SubordinateAppraisal(
      getIdFromSubordinateEventParams(event.params.subordinateAddress, event.params.performanceScore))
  }

  subordinateAppraisal.subordinateAddress = event.params.subordinateAddress
  subordinateAppraisal.performanceScore = event.params.performanceScore
}

export function handleTaskIssued(event: TaskIssuedEvent): void {
  let taskIssued = TaskIssued.load(
    getIdFromTaskEventParams(changetype<BigInt>(event.params.taskStatus), event.params.taskID))
  
  if(!taskIssued) {
    taskIssued = new TaskIssued(
      getIdFromTaskEventParams(changetype<BigInt>(event.params.taskStatus), event.params.taskID))
  }

  taskIssued.description = event.params.description
  taskIssued.location = event.params.location
  taskIssued.taskID = event.params.taskID
  taskIssued.taskStatus = event.params.taskStatus

  taskIssued.save()
}

export function handleTaskReport(event: TaskReportEvent): void {
  let taskReport = TaskReport.load(
    getIdFromTaskEventParams(changetype<BigInt>(event.params.taskStatus), event.params.taskID))
  
  if(!taskReport) {
    taskReport = new TaskIssued(
      getIdFromTaskEventParams(changetype<BigInt>(event.params.taskStatus), event.params.taskID))
  }
  
  
  taskReport.taskID = event.params.taskID
  taskReport.location = event.params.location
  taskReport.taskStatus = event.params.taskStatus

  taskReport.save()
  
}

function getIdFromDepartmentalEventParams(memberAddress: Address, memberId: Bytes): Bytes {
  return changetype<Bytes>(memberAddress.toHexString() + memberId.toHexString())
}

function getIdFromTaskEventParams(status: BigInt, taskId: Bytes): Bytes {
  return changetype<Bytes>(status.toHexString() + taskId.toHexString())
}

function getIdFromSubordinateEventParams(memberAddress: Address, score: BigInt): Bytes {
  return changetype<Bytes>(memberAddress.toHexString() + score.toHexString())
}