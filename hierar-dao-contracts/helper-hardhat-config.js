const networkConfig = {
    default: {
        name: "hardhat",
        governance_token: "",
        time_lock: "",
        governor: "",
        work_groups: ""
    },
    31337: {
        name: "localhost",
        governance_token: "",
        time_lock: "",
        governor: "",
        work_groups: ""  
    },
    11155111: {
        name: "sepolia",
        governance_token: "0x2E673E5d95BfdA8A2802c3551Cb5801654c71c8D",
        time_lock: "0x1143681F3647459E4B407fD0D98c60422C192A15",
        governor: "0xFbA937c0e3d302D59F26bd39a3c8678A4c2c2BF9",
        work_groups: "0x7bab5d3e304a52D629b94e9529677ac6b05157EA"
    },
    1: {
        name: "mainnet",
        governance_token: "",
        time_lock: "",
        governor: "",
        work_groups: ""   
    },
}

const developmentChains = ["hardhat", "localhost"]
const VERIFICATION_BLOCK_CONFIRMATIONS = 6
const governor_abi_location = "../hierar-dao-next-app/constants/governor.json"
const work_group_abi_location = "../hierar-dao-next-app/constants/workGroup.json"
const frontend_contracts_location = "../hierar-dao-next-app/constants/networkMapping.json"
const QUORUM_PERCENTAGE = 4 // Need 4% of voters to pass
const MIN_DELAY = 3600 // 1 hour - after a vote passes, you have 1 hour before you can enact
// export const VOTING_PERIOD = 45818 // 1 week - how long the vote lasts. This is pretty long even for local tests
const VOTING_PERIOD = 5 // blocks
const VOTING_DELAY = 1 // 1 Block - How many blocks till a proposal vote becomes active
const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000"

const FUNC = "store"
const PROPOSAL_DESCRIPTION = "Proposal #1 77 in the Box!"
module.exports = {
    networkConfig,
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
    governor_abi_location,
    work_group_abi_location,
    frontend_contracts_location,
    QUORUM_PERCENTAGE,
    MIN_DELAY,
    VOTING_PERIOD,
    VOTING_DELAY,
    ADDRESS_ZERO,
    FUNC,
    PROPOSAL_DESCRIPTION
}