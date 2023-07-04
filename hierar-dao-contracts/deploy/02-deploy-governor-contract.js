const { network, ethers } = require("hardhat")
const { verify } = require("../utils/verify")
const {
  networkConfig,
  developmentChains,
  VERIFICATION_BLOCK_CONFIRMATIONS,
  QUORUM_PERCENTAGE,
  VOTING_PERIOD,
  VOTING_DELAY,
} = require("../helper-hardhat-config")

const deployGovernorContract = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = network.config.chainId

  const governanceTokenAddress = networkConfig[chainId]["governance_token"]
  const timeLockAddress = networkConfig[chainId]["time_lock"]

  const args = [
      governanceTokenAddress,
      timeLockAddress,
      QUORUM_PERCENTAGE,
      VOTING_PERIOD,
      VOTING_DELAY,
  ]
  
  log("----------------------------------------------------")
  log("Deploying GovernorContract and waiting for confirmations...")

  const governorContract = await deploy("GovernorContract", {
    from: deployer,
    args: args, 
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: VERIFICATION_BLOCK_CONFIRMATIONS || 1,
  })

  networkConfig[chainId]["governor"] = governorContract.address
  log(`GovernorContract at ${governorContract.address}`)

  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(governorContract.address, args)
  }
}

module.exports = deployGovernorContract
deployGovernorContract.tags = ["all", "governor"]
