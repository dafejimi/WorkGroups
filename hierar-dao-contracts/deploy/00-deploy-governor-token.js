const { network } = require("hardhat")
const { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS, networkConfig } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

const deployGovernanceToken = async ({getNamedAccounts, deployments}) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = network.config.chainId

  log("----------------------------------------------------")
  log("Deploying GovernanceToken and waiting for confirmations...")

  const governanceToken = await deploy("GovernanceToken", {
    from: deployer,
    args: [],
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: VERIFICATION_BLOCK_CONFIRMATIONS || 1,
  })

  networkConfig[chainId]["governance_token"] = governanceToken.address
  log(`GovernanceToken at ${governanceToken.address}`)
  
  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(governanceToken.address, [])
  }
  log(`Delegating to ${deployer}`)
  await delegate(governanceToken.address, deployer)
  log("Delegated!")
}

const delegate = async (governanceTokenAddress, delegatedAccount) => {
  const governanceToken = await ethers.getContractAt("GovernanceToken", governanceTokenAddress)
  const transactionResponse = await governanceToken.delegate(delegatedAccount)
  await transactionResponse.wait(1)
  console.log(`Checkpoints: ${await governanceToken.numCheckpoints(delegatedAccount)}`)
}

module.exports = deployGovernanceToken
deployGovernanceToken.tags = ["all", "governor"]
