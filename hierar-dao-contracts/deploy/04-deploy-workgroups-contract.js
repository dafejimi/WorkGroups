const { network, ethers } = require("hardhat")
const { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS, networkConfig } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

const deployWorkGroups = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
  
    log("----------------------------------------------------")
    log("Deploying Box and waiting for confirmations...")

    const workGroups = await deploy("WorkGroups", {
      from: deployer,
      args: [],
      log: true,
      // we need to wait if on a live network so we can verify properly
      waitConfirmations: VERIFICATION_BLOCK_CONFIRMATIONS || 1,
    })

    networkConfig[chainId]["work_group"] = workGroups.address
    log(`Box at ${workGroups.address}`)

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
      await verify(workGroups.address, [])
    }
    const timeLockAddress = networkConfig[chainId]["time_lock"]
    const workGroupsContract = await ethers.getContractAt("WorkGroups", workGroups.address)
    // const timeLock = await ethers.getContractAt("TimeLock", timeLockAddress)
    const transferTx = await workGroupsContract.transferOwnership(timeLockAddress)
    await transferTx.wait(1)
  }
  
module.exports = deployWorkGroups
deployWorkGroups.tags = ["all", "work_groups"]
  