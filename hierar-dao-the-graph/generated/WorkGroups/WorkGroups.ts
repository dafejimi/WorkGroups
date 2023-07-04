// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class DepartmentalSubordinateModified extends ethereum.Event {
  get params(): DepartmentalSubordinateModified__Params {
    return new DepartmentalSubordinateModified__Params(this);
  }
}

export class DepartmentalSubordinateModified__Params {
  _event: DepartmentalSubordinateModified;

  constructor(event: DepartmentalSubordinateModified) {
    this._event = event;
  }

  get department(): string {
    return this._event.parameters[0].value.toString();
  }

  get subordinateAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get id(): Bytes {
    return this._event.parameters[2].value.toBytes();
  }

  get modification(): string {
    return this._event.parameters[3].value.toString();
  }
}

export class DepartmentalSuperiorAssigned extends ethereum.Event {
  get params(): DepartmentalSuperiorAssigned__Params {
    return new DepartmentalSuperiorAssigned__Params(this);
  }
}

export class DepartmentalSuperiorAssigned__Params {
  _event: DepartmentalSuperiorAssigned;

  constructor(event: DepartmentalSuperiorAssigned) {
    this._event = event;
  }

  get department(): string {
    return this._event.parameters[0].value.toString();
  }

  get superiorAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get id(): Bytes {
    return this._event.parameters[2].value.toBytes();
  }
}

export class DepartmentalSuperiorModified extends ethereum.Event {
  get params(): DepartmentalSuperiorModified__Params {
    return new DepartmentalSuperiorModified__Params(this);
  }
}

export class DepartmentalSuperiorModified__Params {
  _event: DepartmentalSuperiorModified;

  constructor(event: DepartmentalSuperiorModified) {
    this._event = event;
  }

  get oldSuperior(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newSuperior(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get department(): string {
    return this._event.parameters[2].value.toString();
  }

  get newId(): Bytes {
    return this._event.parameters[3].value.toBytes();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class SubordinateAppraisal extends ethereum.Event {
  get params(): SubordinateAppraisal__Params {
    return new SubordinateAppraisal__Params(this);
  }
}

export class SubordinateAppraisal__Params {
  _event: SubordinateAppraisal;

  constructor(event: SubordinateAppraisal) {
    this._event = event;
  }

  get subordinateAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get performanceScore(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class TaskIssued extends ethereum.Event {
  get params(): TaskIssued__Params {
    return new TaskIssued__Params(this);
  }
}

export class TaskIssued__Params {
  _event: TaskIssued;

  constructor(event: TaskIssued) {
    this._event = event;
  }

  get description(): string {
    return this._event.parameters[0].value.toString();
  }

  get location(): string {
    return this._event.parameters[1].value.toString();
  }

  get taskID(): Bytes {
    return this._event.parameters[2].value.toBytes();
  }

  get taskStatus(): i32 {
    return this._event.parameters[3].value.toI32();
  }
}

export class TaskReport extends ethereum.Event {
  get params(): TaskReport__Params {
    return new TaskReport__Params(this);
  }
}

export class TaskReport__Params {
  _event: TaskReport;

  constructor(event: TaskReport) {
    this._event = event;
  }

  get taskID(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get location(): string {
    return this._event.parameters[1].value.toString();
  }

  get taskStatus(): i32 {
    return this._event.parameters[2].value.toI32();
  }
}

export class WorkGroups__departmentalSuperiorResult {
  value0: Address;
  value1: i32;

  constructor(value0: Address, value1: i32) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddress(this.value0));
    map.set(
      "value1",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(this.value1))
    );
    return map;
  }

  getSuperiorAddress(): Address {
    return this.value0;
  }

  getSuperiorRole(): i32 {
    return this.value1;
  }
}

export class WorkGroups__getSubordinateResultValue0Struct extends ethereum.Tuple {
  get subordinateAddress(): Address {
    return this[0].toAddress();
  }

  get subordinateRole(): i32 {
    return this[1].toI32();
  }

  get performanceScore(): BigInt {
    return this[2].toBigInt();
  }
}

export class WorkGroups__getSuperiorResultValue0Struct extends ethereum.Tuple {
  get superiorAddress(): Address {
    return this[0].toAddress();
  }

  get superiorRole(): i32 {
    return this[1].toI32();
  }
}

export class WorkGroups__getTaskResultValue0Struct extends ethereum.Tuple {
  get department(): string {
    return this[0].toString();
  }

  get description(): string {
    return this[1].toString();
  }

  get location(): string {
    return this[2].toString();
  }

  get deadline(): BigInt {
    return this[3].toBigInt();
  }

  get taskStatus(): i32 {
    return this[4].toI32();
  }

  get taskAssignee(): WorkGroups__getTaskResultValue0TaskAssigneeStruct {
    return changetype<WorkGroups__getTaskResultValue0TaskAssigneeStruct>(
      this[5].toTuple()
    );
  }
}

export class WorkGroups__getTaskResultValue0TaskAssigneeStruct extends ethereum.Tuple {
  get subordinateAddress(): Address {
    return this[0].toAddress();
  }

  get subordinateRole(): i32 {
    return this[1].toI32();
  }

  get performanceScore(): BigInt {
    return this[2].toBigInt();
  }
}

export class WorkGroups extends ethereum.SmartContract {
  static bind(address: Address): WorkGroups {
    return new WorkGroups("WorkGroups", address);
  }

  admin(): Address {
    let result = super.call("admin", "admin():(address)", []);

    return result[0].toAddress();
  }

  try_admin(): ethereum.CallResult<Address> {
    let result = super.tryCall("admin", "admin():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  departmentalRoles(param0: string, param1: Address): i32 {
    let result = super.call(
      "departmentalRoles",
      "departmentalRoles(string,address):(uint8)",
      [ethereum.Value.fromString(param0), ethereum.Value.fromAddress(param1)]
    );

    return result[0].toI32();
  }

  try_departmentalRoles(
    param0: string,
    param1: Address
  ): ethereum.CallResult<i32> {
    let result = super.tryCall(
      "departmentalRoles",
      "departmentalRoles(string,address):(uint8)",
      [ethereum.Value.fromString(param0), ethereum.Value.fromAddress(param1)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toI32());
  }

  departmentalSuperior(
    param0: string,
    param1: Bytes
  ): WorkGroups__departmentalSuperiorResult {
    let result = super.call(
      "departmentalSuperior",
      "departmentalSuperior(string,bytes32):(address,uint8)",
      [ethereum.Value.fromString(param0), ethereum.Value.fromFixedBytes(param1)]
    );

    return new WorkGroups__departmentalSuperiorResult(
      result[0].toAddress(),
      result[1].toI32()
    );
  }

  try_departmentalSuperior(
    param0: string,
    param1: Bytes
  ): ethereum.CallResult<WorkGroups__departmentalSuperiorResult> {
    let result = super.tryCall(
      "departmentalSuperior",
      "departmentalSuperior(string,bytes32):(address,uint8)",
      [ethereum.Value.fromString(param0), ethereum.Value.fromFixedBytes(param1)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new WorkGroups__departmentalSuperiorResult(
        value[0].toAddress(),
        value[1].toI32()
      )
    );
  }

  getSubordinate(
    department: string,
    subordinateID: Bytes
  ): WorkGroups__getSubordinateResultValue0Struct {
    let result = super.call(
      "getSubordinate",
      "getSubordinate(string,bytes32):((address,uint8,uint256))",
      [
        ethereum.Value.fromString(department),
        ethereum.Value.fromFixedBytes(subordinateID)
      ]
    );

    return changetype<WorkGroups__getSubordinateResultValue0Struct>(
      result[0].toTuple()
    );
  }

  try_getSubordinate(
    department: string,
    subordinateID: Bytes
  ): ethereum.CallResult<WorkGroups__getSubordinateResultValue0Struct> {
    let result = super.tryCall(
      "getSubordinate",
      "getSubordinate(string,bytes32):((address,uint8,uint256))",
      [
        ethereum.Value.fromString(department),
        ethereum.Value.fromFixedBytes(subordinateID)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<WorkGroups__getSubordinateResultValue0Struct>(
        value[0].toTuple()
      )
    );
  }

  getSubordinateStatus(department: string, subordinateId: Bytes): boolean {
    let result = super.call(
      "getSubordinateStatus",
      "getSubordinateStatus(string,bytes32):(bool)",
      [
        ethereum.Value.fromString(department),
        ethereum.Value.fromFixedBytes(subordinateId)
      ]
    );

    return result[0].toBoolean();
  }

  try_getSubordinateStatus(
    department: string,
    subordinateId: Bytes
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "getSubordinateStatus",
      "getSubordinateStatus(string,bytes32):(bool)",
      [
        ethereum.Value.fromString(department),
        ethereum.Value.fromFixedBytes(subordinateId)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  getSuperior(
    department: string,
    superiorID: Bytes
  ): WorkGroups__getSuperiorResultValue0Struct {
    let result = super.call(
      "getSuperior",
      "getSuperior(string,bytes32):((address,uint8))",
      [
        ethereum.Value.fromString(department),
        ethereum.Value.fromFixedBytes(superiorID)
      ]
    );

    return changetype<WorkGroups__getSuperiorResultValue0Struct>(
      result[0].toTuple()
    );
  }

  try_getSuperior(
    department: string,
    superiorID: Bytes
  ): ethereum.CallResult<WorkGroups__getSuperiorResultValue0Struct> {
    let result = super.tryCall(
      "getSuperior",
      "getSuperior(string,bytes32):((address,uint8))",
      [
        ethereum.Value.fromString(department),
        ethereum.Value.fromFixedBytes(superiorID)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<WorkGroups__getSuperiorResultValue0Struct>(value[0].toTuple())
    );
  }

  getSuperiorStatus(department: string, superiorId: Bytes): boolean {
    let result = super.call(
      "getSuperiorStatus",
      "getSuperiorStatus(string,bytes32):(bool)",
      [
        ethereum.Value.fromString(department),
        ethereum.Value.fromFixedBytes(superiorId)
      ]
    );

    return result[0].toBoolean();
  }

  try_getSuperiorStatus(
    department: string,
    superiorId: Bytes
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "getSuperiorStatus",
      "getSuperiorStatus(string,bytes32):(bool)",
      [
        ethereum.Value.fromString(department),
        ethereum.Value.fromFixedBytes(superiorId)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  getTask(
    department: string,
    taskID: Bytes
  ): WorkGroups__getTaskResultValue0Struct {
    let result = super.call(
      "getTask",
      "getTask(string,bytes32):((string,string,string,uint256,uint8,(address,uint8,uint256)))",
      [
        ethereum.Value.fromString(department),
        ethereum.Value.fromFixedBytes(taskID)
      ]
    );

    return changetype<WorkGroups__getTaskResultValue0Struct>(
      result[0].toTuple()
    );
  }

  try_getTask(
    department: string,
    taskID: Bytes
  ): ethereum.CallResult<WorkGroups__getTaskResultValue0Struct> {
    let result = super.tryCall(
      "getTask",
      "getTask(string,bytes32):((string,string,string,uint256,uint8,(address,uint8,uint256)))",
      [
        ethereum.Value.fromString(department),
        ethereum.Value.fromFixedBytes(taskID)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<WorkGroups__getTaskResultValue0Struct>(value[0].toTuple())
    );
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class AddSubordinateCall extends ethereum.Call {
  get inputs(): AddSubordinateCall__Inputs {
    return new AddSubordinateCall__Inputs(this);
  }

  get outputs(): AddSubordinateCall__Outputs {
    return new AddSubordinateCall__Outputs(this);
  }
}

export class AddSubordinateCall__Inputs {
  _call: AddSubordinateCall;

  constructor(call: AddSubordinateCall) {
    this._call = call;
  }

  get subordinateAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get department(): string {
    return this._call.inputValues[1].value.toString();
  }

  get superiorId(): Bytes {
    return this._call.inputValues[2].value.toBytes();
  }
}

export class AddSubordinateCall__Outputs {
  _call: AddSubordinateCall;

  constructor(call: AddSubordinateCall) {
    this._call = call;
  }
}

export class AppointSuperiorCall extends ethereum.Call {
  get inputs(): AppointSuperiorCall__Inputs {
    return new AppointSuperiorCall__Inputs(this);
  }

  get outputs(): AppointSuperiorCall__Outputs {
    return new AppointSuperiorCall__Outputs(this);
  }
}

export class AppointSuperiorCall__Inputs {
  _call: AppointSuperiorCall;

  constructor(call: AppointSuperiorCall) {
    this._call = call;
  }

  get department(): string {
    return this._call.inputValues[0].value.toString();
  }

  get superiorAddress(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class AppointSuperiorCall__Outputs {
  _call: AppointSuperiorCall;

  constructor(call: AppointSuperiorCall) {
    this._call = call;
  }
}

export class IssueTaskCall extends ethereum.Call {
  get inputs(): IssueTaskCall__Inputs {
    return new IssueTaskCall__Inputs(this);
  }

  get outputs(): IssueTaskCall__Outputs {
    return new IssueTaskCall__Outputs(this);
  }
}

export class IssueTaskCall__Inputs {
  _call: IssueTaskCall;

  constructor(call: IssueTaskCall) {
    this._call = call;
  }

  get superiorId(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get subordinateID(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }

  get description(): string {
    return this._call.inputValues[2].value.toString();
  }

  get location(): string {
    return this._call.inputValues[3].value.toString();
  }

  get department(): string {
    return this._call.inputValues[4].value.toString();
  }

  get numberOfDays(): BigInt {
    return this._call.inputValues[5].value.toBigInt();
  }
}

export class IssueTaskCall__Outputs {
  _call: IssueTaskCall;

  constructor(call: IssueTaskCall) {
    this._call = call;
  }
}

export class PerformTaskAppraisalCall extends ethereum.Call {
  get inputs(): PerformTaskAppraisalCall__Inputs {
    return new PerformTaskAppraisalCall__Inputs(this);
  }

  get outputs(): PerformTaskAppraisalCall__Outputs {
    return new PerformTaskAppraisalCall__Outputs(this);
  }
}

export class PerformTaskAppraisalCall__Inputs {
  _call: PerformTaskAppraisalCall;

  constructor(call: PerformTaskAppraisalCall) {
    this._call = call;
  }

  get taskId(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get superiorId(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }

  get subordinateId(): Bytes {
    return this._call.inputValues[2].value.toBytes();
  }

  get department(): string {
    return this._call.inputValues[3].value.toString();
  }
}

export class PerformTaskAppraisalCall__Outputs {
  _call: PerformTaskAppraisalCall;

  constructor(call: PerformTaskAppraisalCall) {
    this._call = call;
  }
}

export class RemoveSubordinateCall extends ethereum.Call {
  get inputs(): RemoveSubordinateCall__Inputs {
    return new RemoveSubordinateCall__Inputs(this);
  }

  get outputs(): RemoveSubordinateCall__Outputs {
    return new RemoveSubordinateCall__Outputs(this);
  }
}

export class RemoveSubordinateCall__Inputs {
  _call: RemoveSubordinateCall;

  constructor(call: RemoveSubordinateCall) {
    this._call = call;
  }

  get superiorId(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get subordinateId(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }

  get department(): string {
    return this._call.inputValues[2].value.toString();
  }
}

export class RemoveSubordinateCall__Outputs {
  _call: RemoveSubordinateCall;

  constructor(call: RemoveSubordinateCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class ReportTaskCall extends ethereum.Call {
  get inputs(): ReportTaskCall__Inputs {
    return new ReportTaskCall__Inputs(this);
  }

  get outputs(): ReportTaskCall__Outputs {
    return new ReportTaskCall__Outputs(this);
  }
}

export class ReportTaskCall__Inputs {
  _call: ReportTaskCall;

  constructor(call: ReportTaskCall) {
    this._call = call;
  }

  get taskID(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get subordinateId(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }

  get location(): string {
    return this._call.inputValues[2].value.toString();
  }

  get department(): string {
    return this._call.inputValues[3].value.toString();
  }

  get statusNumber(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }
}

export class ReportTaskCall__Outputs {
  _call: ReportTaskCall;

  constructor(call: ReportTaskCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

export class UpgradeSubordinateCall extends ethereum.Call {
  get inputs(): UpgradeSubordinateCall__Inputs {
    return new UpgradeSubordinateCall__Inputs(this);
  }

  get outputs(): UpgradeSubordinateCall__Outputs {
    return new UpgradeSubordinateCall__Outputs(this);
  }
}

export class UpgradeSubordinateCall__Inputs {
  _call: UpgradeSubordinateCall;

  constructor(call: UpgradeSubordinateCall) {
    this._call = call;
  }

  get department(): string {
    return this._call.inputValues[0].value.toString();
  }

  get oldSuperior(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get newSuperior(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get subordinateID(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }
}

export class UpgradeSubordinateCall__Outputs {
  _call: UpgradeSubordinateCall;

  constructor(call: UpgradeSubordinateCall) {
    this._call = call;
  }
}
