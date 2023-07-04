import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, Bytes, BigInt } from "@graphprotocol/graph-ts"
import { DepartmentalSubordinateModified } from "../generated/schema"
import { DepartmentalSubordinateModified as DepartmentalSubordinateModifiedEvent } from "../generated/WorkGroups/WorkGroups"
import { handleDepartmentalSubordinateModified } from "../src/work-groups"
import { createDepartmentalSubordinateModifiedEvent } from "./work-groups-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let department = "Example string value"
    let subordinateAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let id = Bytes.fromI32(1234567890)
    let modification = "Example string value"
    let newDepartmentalSubordinateModifiedEvent = createDepartmentalSubordinateModifiedEvent(
      department,
      subordinateAddress,
      id,
      modification
    )
    handleDepartmentalSubordinateModified(
      newDepartmentalSubordinateModifiedEvent
    )
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("DepartmentalSubordinateModified created and stored", () => {
    assert.entityCount("DepartmentalSubordinateModified", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "DepartmentalSubordinateModified",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "department",
      "Example string value"
    )
    assert.fieldEquals(
      "DepartmentalSubordinateModified",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "subordinateAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "DepartmentalSubordinateModified",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "modification",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
