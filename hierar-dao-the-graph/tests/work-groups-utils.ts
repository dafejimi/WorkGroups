import { newMockEvent } from "matchstick-as"
import { ethereum, Address, Bytes, BigInt } from "@graphprotocol/graph-ts"
import {
  DepartmentalSubordinateModified,
  DepartmentalSuperiorAssigned,
  DepartmentalSuperiorModified,
  OwnershipTransferred,
  SubordinateAppraisal,
  TaskIssued,
  TaskReport
} from "../generated/WorkGroups/WorkGroups"

export function createDepartmentalSubordinateModifiedEvent(
  department: string,
  subordinateAddress: Address,
  id: Bytes,
  modification: string
): DepartmentalSubordinateModified {
  let departmentalSubordinateModifiedEvent = changetype<
    DepartmentalSubordinateModified
  >(newMockEvent())

  departmentalSubordinateModifiedEvent.parameters = new Array()

  departmentalSubordinateModifiedEvent.parameters.push(
    new ethereum.EventParam("department", ethereum.Value.fromString(department))
  )
  departmentalSubordinateModifiedEvent.parameters.push(
    new ethereum.EventParam(
      "subordinateAddress",
      ethereum.Value.fromAddress(subordinateAddress)
    )
  )
  departmentalSubordinateModifiedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromFixedBytes(id))
  )
  departmentalSubordinateModifiedEvent.parameters.push(
    new ethereum.EventParam(
      "modification",
      ethereum.Value.fromString(modification)
    )
  )

  return departmentalSubordinateModifiedEvent
}

export function createDepartmentalSuperiorAssignedEvent(
  department: string,
  superiorAddress: Address,
  id: Bytes
): DepartmentalSuperiorAssigned {
  let departmentalSuperiorAssignedEvent = changetype<
    DepartmentalSuperiorAssigned
  >(newMockEvent())

  departmentalSuperiorAssignedEvent.parameters = new Array()

  departmentalSuperiorAssignedEvent.parameters.push(
    new ethereum.EventParam("department", ethereum.Value.fromString(department))
  )
  departmentalSuperiorAssignedEvent.parameters.push(
    new ethereum.EventParam(
      "superiorAddress",
      ethereum.Value.fromAddress(superiorAddress)
    )
  )
  departmentalSuperiorAssignedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromFixedBytes(id))
  )

  return departmentalSuperiorAssignedEvent
}

export function createDepartmentalSuperiorModifiedEvent(
  oldSuperior: Address,
  newSuperior: Address,
  department: string,
  newId: Bytes
): DepartmentalSuperiorModified {
  let departmentalSuperiorModifiedEvent = changetype<
    DepartmentalSuperiorModified
  >(newMockEvent())

  departmentalSuperiorModifiedEvent.parameters = new Array()

  departmentalSuperiorModifiedEvent.parameters.push(
    new ethereum.EventParam(
      "oldSuperior",
      ethereum.Value.fromAddress(oldSuperior)
    )
  )
  departmentalSuperiorModifiedEvent.parameters.push(
    new ethereum.EventParam(
      "newSuperior",
      ethereum.Value.fromAddress(newSuperior)
    )
  )
  departmentalSuperiorModifiedEvent.parameters.push(
    new ethereum.EventParam("department", ethereum.Value.fromString(department))
  )
  departmentalSuperiorModifiedEvent.parameters.push(
    new ethereum.EventParam("newId", ethereum.Value.fromFixedBytes(newId))
  )

  return departmentalSuperiorModifiedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createSubordinateAppraisalEvent(
  subordinateAddress: Address,
  performanceScore: BigInt
): SubordinateAppraisal {
  let subordinateAppraisalEvent = changetype<SubordinateAppraisal>(
    newMockEvent()
  )

  subordinateAppraisalEvent.parameters = new Array()

  subordinateAppraisalEvent.parameters.push(
    new ethereum.EventParam(
      "subordinateAddress",
      ethereum.Value.fromAddress(subordinateAddress)
    )
  )
  subordinateAppraisalEvent.parameters.push(
    new ethereum.EventParam(
      "performanceScore",
      ethereum.Value.fromUnsignedBigInt(performanceScore)
    )
  )

  return subordinateAppraisalEvent
}

export function createTaskIssuedEvent(
  description: string,
  location: string,
  taskID: Bytes,
  taskStatus: i32
): TaskIssued {
  let taskIssuedEvent = changetype<TaskIssued>(newMockEvent())

  taskIssuedEvent.parameters = new Array()

  taskIssuedEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )
  taskIssuedEvent.parameters.push(
    new ethereum.EventParam("location", ethereum.Value.fromString(location))
  )
  taskIssuedEvent.parameters.push(
    new ethereum.EventParam("taskID", ethereum.Value.fromFixedBytes(taskID))
  )
  taskIssuedEvent.parameters.push(
    new ethereum.EventParam(
      "taskStatus",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(taskStatus))
    )
  )

  return taskIssuedEvent
}

export function createTaskReportEvent(
  taskID: Bytes,
  location: string,
  taskStatus: i32
): TaskReport {
  let taskReportEvent = changetype<TaskReport>(newMockEvent())

  taskReportEvent.parameters = new Array()

  taskReportEvent.parameters.push(
    new ethereum.EventParam("taskID", ethereum.Value.fromFixedBytes(taskID))
  )
  taskReportEvent.parameters.push(
    new ethereum.EventParam("location", ethereum.Value.fromString(location))
  )
  taskReportEvent.parameters.push(
    new ethereum.EventParam(
      "taskStatus",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(taskStatus))
    )
  )

  return taskReportEvent
}
