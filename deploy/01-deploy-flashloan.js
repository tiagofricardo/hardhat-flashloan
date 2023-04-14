const { network } = require("hardhat")
const { verify } = require("../utils/verify")
const { developmentChains, POOL_ADDRESS_PROVIDER } = require("../helper-hardhat-config")

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const args = [POOL_ADDRESS_PROVIDER]

    const flashLoanExample = await deploy("FlashLoanExample", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    log("------------------------------------------------")
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(flashLoanExample.address, args)
    }
}

module.exports.tags = ["all", "flashLoanExample", "main"]
