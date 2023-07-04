import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  ProposalCanceled as ProposalCanceledEvent,
  ProposalCreated as ProposalCreatedEvent,
  ProposalExecuted as ProposalExecutedEvent,
  ProposalQueued as ProposalQueuedEvent,
  ProposalThresholdSet as ProposalThresholdSetEvent,
  QuorumNumeratorUpdated as QuorumNumeratorUpdatedEvent,
  TimelockChange as TimelockChangeEvent,
  VoteCast as VoteCastEvent,
  VoteCastWithParams as VoteCastWithParamsEvent,
  VotingDelaySet as VotingDelaySetEvent,
  VotingPeriodSet as VotingPeriodSetEvent
} from "../generated/GovernorContract/GovernorContract"
import {
  ProposalCanceled,
  ProposalCreated,
  ProposalExecuted,
  ProposalQueued,
  ProposalThresholdSet,
  QuorumNumeratorUpdated,
  TimelockChange,
  VoteCast,
  VoteCastWithParams,
  VotingDelaySet,
  VotingPeriodSet
} from "../generated/schema"

export function handleProposalCanceled(event: ProposalCanceledEvent): void {
  let proposalCanceled = ProposalCanceled.load(
    getIdFromProposalEventParams(event.params.proposalId)
  )

  if(!proposalCanceled) {
    proposalCanceled = new ProposalCanceled(
      getIdFromProposalEventParams(event.params.proposalId))
  }

  proposalCanceled.proposalId = event.params.proposalId

  proposalCanceled.save()
}

export function handleProposalCreated(event: ProposalCreatedEvent): void {
  let proposalCreated = ProposalCreated.load(
    getIdFromProposalCreatedEvent(event.params.proposer, event.params.proposalId)
  )

  if(!proposalCreated) {
    proposalCreated = new ProposalCreated(
      getIdFromProposalCreatedEvent(event.params.proposer, event.params.proposalId)
    )
  }

  proposalCreated.proposalId = event.params.proposalId
  proposalCreated.proposer = event.params.proposer
  proposalCreated.targets = event.params.targets
  proposalCreated.values = event.params.values
  proposalCreated.signatures = event.params.signatures
  proposalCreated.calldatas = event.params.calldatas
  proposalCreated.startBlock = event.params.startBlock
  proposalCreated.endBlock = event.params.endBlock
  proposalCreated.description = event.params.description

  proposalCreated.save()
}

export function handleProposalExecuted(event: ProposalExecutedEvent): void {
  let proposalExecuted = ProposalExecuted.load(
    getIdFromProposalEventParams(event.params.proposalId)
  )

  if(!proposalExecuted) {
    proposalExecuted = new ProposalExecuted(
      getIdFromProposalEventParams(event.params.proposalId))
  }

  proposalExecuted.proposalId = event.params.proposalId

  proposalExecuted.save()
}

export function handleVoteCast(event: VoteCastEvent): void {
  let voteCast = VoteCast.load(
    getIdFromVoteEventParams(event.params.voter, event.params.proposalId, event.params.weight)
  )

  if(!voteCast) {
    voteCast = new VoteCast(
      getIdFromVoteEventParams(event.params.voter, event.params.proposalId, event.params.weight)
    )
  }

  voteCast.voter = event.params.voter
  voteCast.proposalId = event.params.proposalId
  voteCast.support = event.params.support
  voteCast.weight = event.params.weight
  voteCast.reason= event.params.reason

  voteCast.save()
}

export function handleVoteCastWithParams(event: VoteCastWithParamsEvent): void {
  let voteCastWithParams = VoteCastWithParams.load(
    getIdFromVoteEventParams(event.params.voter, event.params.proposalId, event.params.weight)
  )

  if(!voteCastWithParams) {
    voteCastWithParams = new VoteCastWithParams(
      getIdFromVoteEventParams(event.params.voter, event.params.proposalId, event.params.weight)
    )
  }

  /*
  voter: Bytes! # address
  proposalId: BigInt! # uint256
  support: Int! # uint8
  weight: BigInt! # uint256
  reason: String! # string*/

  voteCastWithParams.voter = event.params.voter
  voteCastWithParams.proposalId = event.params.proposalId
  voteCastWithParams.support = event.params.support
  voteCastWithParams.weight = event.params.weight
  voteCastWithParams.reason = event.params.reason
  voteCastWithParams.params = event.params.params

  voteCastWithParams.save()
}


function getIdFromProposalEventParams(proposalId: BigInt): Bytes {
  return changetype<Bytes>(proposalId.toHexString())
}

function getIdFromProposalCreatedEvent(proposer: Address, proposalId: BigInt): Bytes {
  return changetype<Bytes>(proposer.toHexString() + proposalId.toHexString())
}

function getIdFromVoteEventParams(voter: Address, proposalId: BigInt, weight: BigInt): Bytes {
  return changetype<Bytes>(voter.toHexString() + proposalId.toHexString() + weight.toHexString)
}