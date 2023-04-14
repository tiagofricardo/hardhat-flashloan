const { ethers } = require("hardhat")

const networkConfig = {
    default: {
        name: "hardhat",
        keepersUpdateInterval: "30",
    },

    5: {
        name: "goerli",
        vrfCoordinatorV2: "0x2ca8e0c643bde4c2e08ab1fa0da3401adad7734d",
        entranceFee: ethers.utils.parseEther("0.01"),
        gasLane: "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
        subscriptionId: "6879",
        callbackGasLimit: "500000",
        interval: "10",
    },
    31337: {
        name: "localhost",
        entranceFee: ethers.utils.parseEther("0.01"),
        gasLane: "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
        callbackGasLimit: "500000",
        interval: "20",
    },
    80001: {
        name: "mumbai",
        vrfCoordinatorV2: "0x7a1bac17ccc5b313516c5e16fb24f7659aa5ebed",
        gasLane: "0x4b09e658ed251bcafeebbc69400383d49f344ace09b9576fe248bb02c003fe9f",
        subscriptionId: "4234",
        callbackGasLimit: "500000",
        interval: "10",
    },
}

const DAI = "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063"
const DAI_WHALE = "0xdfD74E3752c187c4BA899756238C76cbEEfa954B"
const POOL_ADDRESS_PROVIDER = "0xa97684ead0e402dc232d5a977953df7ecbab3cdb"

const developmentChains = ["hardhat", "localhost"]

module.exports = {
    networkConfig,
    developmentChains,
    DAI,
    DAI_WHALE,
    POOL_ADDRESS_PROVIDER,
}
