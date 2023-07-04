const { network } = require("hardhat")
const { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS, networkConfig, MIN_DELAY } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

const deployTimeLock= async ({getNamedAccounts, deployments}) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = network.config.chainId

  log("----------------------------------------------------")
  log("Deploying TimeLock and waiting for confirmations...")

  const timeLock = await deploy("TimeLock", {
    from: deployer,
    /**
     * Here we can set any address in admin role also zero address.
     * previously In tutorial deployer has given admin role then
     * renounced as well. in later section so we are doing the same by giving admin role to
     * deployer and then renounced to keep the tutorial same.
     */
    args: [MIN_DELAY, [], [], deployer],
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: VERIFICATION_BLOCK_CONFIRMATIONS || 1,
  })

  networkConfig[chainId]["time_lock"] = timeLock.address
  log(`TimeLock at ${timeLock.address}`)
  
  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(timeLock.address, [])
  }
}

module.exports = deployTimeLock
deployTimeLock.tags = ["all", "timelock"]
