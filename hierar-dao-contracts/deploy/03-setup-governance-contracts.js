const { ethers } = require("hardhat")
const { networkConfig, ADDRESS_ZERO } = require("../helper-hardhat-config")


const setupContracts = async function ({ getNamedAccounts, deployments }) {
    const { log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
 
    const governanceToken = networkConfig[chainId]["governance_token"]
    const timeLockAddress = networkConfig[chainId]["time_lock"]
    const governorAddress = networkConfig[chainId]["governor"]

    const timeLock = await ethers.getContractAt("TimeLock", timeLockAddress)
    const governor = await ethers.getContractAt("GovernorContract", governorAddress)

  
    log("----------------------------------------------------")
    log("Setting up contracts for roles...")
    // would be great to use multicall here...
    const proposerRole = await timeLock.PROPOSER_ROLE()
    const executorRole = await timeLock.EXECUTOR_ROLE()
    const adminRole = await timeLock.TIMELOCK_ADMIN_ROLE()
  
    const proposerTx = await timeLock.grantRole(proposerRole, governor.address)
    await proposerTx.wait(1)
    const executorTx = await timeLock.grantRole(executorRole, ADDRESS_ZERO)
    await executorTx.wait(1)
    const revokeTx = await timeLock.revokeRole(adminRole, deployer)
    await revokeTx.wait(1)
    // Guess what? Now, anything the timelock wants to do has to go through the governance process!
  }
  
module.exports = setupContracts
setupContracts.tags = ["all", "setup"]
  