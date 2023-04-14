const { expect } = require("chai")
const { network, getNamedAccounts, deployments, ethers } = require("hardhat")
const { developmentChains, DAI, DAI_WHALE } = require("../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Flash Loan Tests", function () {
          let flashloancontract, deployer

          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              await deployments.fixture(["all"])
              flashloancontract = await ethers.getContract("FlashLoanExample", deployer)
          })

          describe("constructor", function () {
              it("Should take a flash loan and be able to return it", async function () {
                  const token = await ethers.getContractAt("IERC20", DAI)
                  const BALANCE_AMOUNT_DAI = ethers.utils.parseEther("2000")

                  await network.provider.request({
                      method: "hardhat_impersonateAccount",
                      params: [DAI_WHALE],
                  })
                  const signer = await ethers.getSigner(DAI_WHALE)
                  await token
                      .connect(signer)
                      .transfer(flashloancontract.address, BALANCE_AMOUNT_DAI)

                  const txn = await flashloancontract.createFlashLoan(DAI, 10000)
                  await txn.wait()

                  const remainingBalance = await token.balanceOf(flashloancontract.address)
                  expect(remainingBalance.lt(BALANCE_AMOUNT_DAI)).to.equal(true)
              })
          })
      })
