const {
    governor_abi_location,
    work_group_abi_location,
    frontend_contracts_location,
    networkConfig
} = require("../helper-hardhat-config")
require("dotenv").config()
const fs = require("fs")
const { network, ethers } = require("hardhat")

module.exports = async () => {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Writing to front end...")
        await updateContractAddresses()
        await updateAbi()
        console.log("Front end written!")
    }
}


async function updateAbi() {
    const chainId = network.config.chainId

    const governorAddress = networkConfig[chainId]["governor"]
    const workGroupAddress = networkConfig[chainId]["work_group"]

    const governor = await ethers.getContractAt("GovernorContract", governorAddress)
    const workGroup = await ethers.getContractAt("WorkGroups", workGroupAddress)

    fs.writeFileSync(governor_abi_location, governor.interface.format(ethers.utils.FormatTypes.json))

    fs.writeFileSync(work_group_abi_location, workGroup.interface.format(ethers.utils.FormatTypes.json))
}

async function updateContractAddresses() {
    const chainId = network.config.chainId

    const governorAddress = networkConfig[chainId]["governor"]
    const workGroupAddress = networkConfig[chainId]["work_group"]

    const governor = await ethers.getContractAt("GovernorContract", governorAddress)
    const workGroup = await ethers.getContractAt("WorkGroups", workGroupAddress)
    
    const contractAddresses = JSON.parse(fs.readFileSync(frontend_contracts_location, "utf8"))
    if (chainId.toString() in contractAddresses) {
        if (!contractAddresses[chainId.toString()]["governor"].includes(governor.address)) {
            contractAddresses[chainId.toString()]["governor"].push(governor.address)
        }

        if (!contractAddresses[chainId.toString()]["work_group"].includes(workGroup.address)) {
            contractAddresses[chainId.toString()]["work_group"].push(workGroup.address)
        }
    } else {
        contractAddresses[chainId.toString()]["governor"] = [governor.address]
        contractAddresses[chainId.toString()]["work_group"] = [workGroup.address]

    }
    fs.writeFileSync(frontend_contracts_location, JSON.stringify(contractAddresses))
}