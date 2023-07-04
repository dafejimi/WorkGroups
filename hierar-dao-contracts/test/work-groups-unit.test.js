const { assert, expect } = require("chai")
const { getNamedAccounts, ethers, network } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")


developmentChains.includes(network.name)
    ? describe.skip
    : describe("WorkGroups Staging Tests", function () {
        let workGroups, workGroupsContract // , deployer

          beforeEach(async () => {
              accounts = await ethers.getSigners() // could also do with getNamedAccounts
              //   deployer = getNamedAccounts()
              deployer = accounts[0]
              superior = accounts[1]
              subordinate = accounts[2]
              fail_tests = accounts[3]
              await deployments.fixture(["all"]) // Deploys modules with the tags "mocks" and "raffle"
              workGroupsContract = await ethers.getContractFactory("WorkGroups", deployer) // Returns a new connection to the Raffle contract
              workGroups = workGroupsContract.connect(deployer) // Returns a new instance of the Raffle contract connected to player
          })

          describe("Appoint Superior", function () {
            it("Reverts If Not Admin", async function () {
                
            })

            it("Emits Superior Assigned Event", async function () {
                
            })
          })

          describe("Add Subordinate", function () {
            it("Reverts If Not Superior", async function () {
                
            })

            it("Emits Subordinate Modified Event", async function () {
                
            })
          })

          describe("Remove Subordinate", function () {
            it("Reverts If Not Superior", async function () {
                
            })

            it("Emits Superior Modified Event", async function () {
                
            })
          })

          describe("Appoint Superior", function () {
            it("Reverts if Not Admin", async function () {
                
            })

            it("Emits Superior Modified Event", async function () {
                
            })
          })

          describe("Issue Task", function () {
            it("Reverts if Not Superior", async function () {
                
            })

            it("Emits Task Issued Event", async function () {
                
            })
          })

          describe("Report Task", function () {
            it("Reverts if Not Subordinate", async function () {
                
            })

            it("Emits Task Report Event", async function () {
                
            })
          })

          describe("Performance Appraisal", function () {
            it("Reverts if Not Superior", async function () {
                
            })

            it("Emits Subordinate Appraisal Event", async function () {
                
            })
          })

          describe("Superior Status", function () {
            it("Returns True Superior Check Passes", async function () {
                
            })

            it("Returns False Superior Check Fails", async function () {
                
            })
          })

          describe("Subordinate Status", function () {
            it("Returns True If Subordinate Check Passes", async function () {
                
            })

            it("Returns False If Subordinate Check Fails", async function () {
                
            })
          })
    })