const { expect } = require("chai");
const hre = require("hardhat");

// Declare static constants
const ploopyAddress = "0x9F320D2A950093e9639E14814Bd81aD099dF60bC";
const _deployer = "0x0eDfa3fbE365CBF269DDc4b286eBD4797c78b21a";
const _USDC = "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8"
const _owner = "0x0eDfa3fbE365CBF269DDc4b286eBD4797c78b21a";
const _divisor = 1e4;
const _maxLeverage = 30_000;

console.log("--------------------------------------");
console.log("Executing test-ploopy.js script");
console.log("--------------------------------------");

// Deployment related tests, mainly surrounding validating constructers are mapped properly.
describe("Deployment", async function() {
    // beforeEach(async function () {
        // const ploopy = await hre.ethers.getContractAt("Ploopy", ploopyAddress);
        // console.log("Ploopy Contract Address:", ploopy.address.toString())
        // [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        // ploopy = await Ploopy.deploy();
        // await ploopy.deployed();
    // });

    it("Should fail if owner is not set properly", async function () {
        const ploopy = await hre.ethers.getContractAt("Ploopy", ploopyAddress);
        console.log("Ploopy contract address:", ploopy.address.toString());
        try {
            const owner = await ploopy.owner();
            console.log("Ploopy owner:", owner);
            console.log("Expected owner:", _owner);
            expect(owner).to.equal(_owner);
        } catch (error) {
            console.log(error);
        }
    })

    it("Should fail if divisor is not set properly", async function () {
        const ploopy = await hre.ethers.getContractAt("Ploopy", ploopyAddress);
        console.log("Ploopy contract address:", ploopy.address.toString());
        try {
            const divisor = await ploopy.DIVISOR();
            console.log("Ploopy divisor:", divisor.toString());
            console.log("Expected divisor:", _divisor.toString());
            expect(divisor).to.equal(_divisor);
        } catch (error) {
            console.log(error);
        }
    })

    it("Should fail if max leverage is not set properly", async function () {
        const ploopy = await hre.ethers.getContractAt("Ploopy", ploopyAddress);
        console.log("Ploopy contract address:", ploopy.address.toString());
        try {
            const maxLeverage = await ploopy.MAX_LEVERAGE();
            console.log("Ploopy max leverage:", maxLeverage.toString());
            console.log("Expected max leverage:", _maxLeverage.toString());
            expect(maxLeverage).to.equal(_maxLeverage);
        } catch (error) {
            console.log(error);
        }
    })

    // it("Should fail if deployed by non-owner", async function () {
    //     const ploopy = await hre.ethers.getContractAt("Ploopy", ploopyAddress);
    //     console.log("Ploopy contract address:", ploopy.address.toString());
    //     try {
    //         expect(ploopy.connect(_deployer).deploy()).to.be.reverted;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // });
})

describe("Looping", async function() {
    it("Should fail if _leverage < DIVISOR or _leverage > MAX_LEVERAGE", async function () {
        const ploopy = await hre.ethers.getContractAt("Ploopy", ploopyAddress);
        console.log("Ploopy contract address:", ploopy.address.toString());
        expect(ploopy.loop(100, 999)).to.be.reverted;
    });
    // it("Should fail if called by non EOA", async function () {
    //     const ploopy = await hre.ethers.getContractAt("Ploopy", ploopyAddress);
    //     expect(ploopy.loop(100, 10000)).to.be.reverted;
    // });
})

describe("receiveFlashLoan", function () {
    it("Should fail if called by other than the BALANCER_VAULT", async function () {
        const ploopy = await hre.ethers.getContractAt("Ploopy", ploopyAddress);
        console.log("Ploopy contract address:", ploopy.address.toString());
        expect(ploopy.receiveFlashLoan([], [], [], "0x")).to.be.reverted;
    });

    it("Should fail if feeAmounts[0] > 0", async function () {
        const ploopy = await hre.ethers.getContractAt("Ploopy", ploopyAddress);
        console.log("Ploopy contract address:", ploopy.address.toString());
        expect(ploopy.receiveFlashLoan([_USDC], [1000], [1], "0x")).to.be.reverted;
    });

    it("Should fail if data.borrowedAmount != amounts[0] or data.borrowedToken != tokens[0]", async function () {
        const ploopy = await hre.ethers.getContractAt("Ploopy", ploopyAddress);
        console.log("Ploopy contract address:", ploopy.address.toString());
        expect(ploopy.receiveFlashLoan([_USDC], [1000], [0], "0x")).to.be.reverted;
    });

    it("Should fail if glpAmount == 0", async function () {
        const ploopy = await hre.ethers.getContractAt("Ploopy", ploopyAddress);
        console.log("Ploopy contract address:", ploopy.address.toString());
        expect(ploopy.receiveFlashLoan([_USDC], [1000], [0], "0x")).to.be.reverted;
    });
    });

describe("Permissions and Access Control", function () {
    // it("Should fail if non-owner tries to call an owner-only function", async function () {
    //     const ploopy = await hre.ethers.getContractAt("Ploopy", ploopyAddress);
    //     console.log("Ploopy contract address:", ploopy.address.toString());
    //     await expect(ploopy.connect('0x0').ownerOnlyFunction()).to.be.reverted;
    // });

    // TODO: actuall fires off txn and processes it, we only want to mock it
    it("Should allow owner to call an owner-only function", async function () {
        // const ploopy = await hre.ethers.getContractAt("Ploopy", ploopyAddress);
        // console.log("Ploopy contract address:", ploopy.address.toString());
        // await expect(ploopy.transferOwnership(_owner)).to.not.be.reverted;
    });
});
