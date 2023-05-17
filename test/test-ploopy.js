const { expect } = require("chai");
const hre = require("hardhat");

// Declare static constants
const ploopyAddress = "0x9F320D2A950093e9639E14814Bd81aD099dF60bC";
const _deployer = "0x0eDfa3fbE365CBF269DDc4b286eBD4797c78b21a";
const _miscUser = "0x45ad22B2Ad15D4Cc3717A544d1e2D317E88A3B27";
const _USDC = "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8"
const _owner = "0x0eDfa3fbE365CBF269DDc4b286eBD4797c78b21a";
const _divisor = 1e4;
const _maxLeverage = 30_000;

console.log("--------------------------------------");
console.log("Executing test-ploopy.js script");
console.log("--------------------------------------");

// Deployment related tests, mainly surrounding validating constructers are mapped properly.
describe("Deployment", async function() {
    let ploopy;

    beforeEach(async function () {
        // Deploy Mock ERC20 tokens and router for testing
        const mockERC20 = await ethers.getContractFactory("MockERC20");
        const mockUSDC = await mockERC20.deploy();

        // console.log("mockUSDC address:", mockUSDC.address);

        // Deploy the Ploopy contract
        const mockPloopy = await ethers.getContractFactory("Ploopy");
        ploopy = await mockPloopy.deploy();

        // console.log("mockPloopy address:", ploopy.address);

        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    });

    describe("Deployment", function () {
        it("Should fail if owner is not set properly", async function () {
            // console.log("Ploopy owner:", await ploopy.owner());
            // console.log("Expected owner:", owner.address.toString());
            expect((await ploopy.owner()).toString().toLowerCase()).to.equal(owner.address.toLowerCase());
        })
        it("Should fail if divisor is not set properly", async function () {
            try {
                const divisor = await ploopy.DIVISOR();
                // console.log("Ploopy divisor:", divisor.toString());
                // console.log("Expected divisor:", _divisor.toString());
                expect(divisor).to.equal(_divisor);
            } catch (error) {
                console.log(error);
            }
        })
        it("Should fail if max leverage is not set properly", async function () {
            try {
                const maxLeverage = await ploopy.MAX_LEVERAGE();
                // console.log("Ploopy max leverage:", maxLeverage.toString());
                // console.log("Expected max leverage:", _maxLeverage.toString());
                expect(maxLeverage).to.equal(_maxLeverage);
            } catch (error) {
                console.log(error);
            }
        })
    });

    describe("Permission and Access Control", function () {
        it("Should fail if non-owner tries to call an owner-only function", async function () {
            expect(ploopy.connect(_miscUser).transferOwnership(_owner)).to.be.reverted;
        });
        it("Should allow owner to call an owner-only function", async function () {
            await expect(ploopy.transferOwnership(_owner)).to.not.be.reverted;
        });
    });

    describe("Looping", async function() {
        it("Should fail if _leverage < DIVISOR or _leverage > MAX_LEVERAGE", async function () {
            expect(ploopy.loop(100, 999)).to.be.reverted;
        });
        // it("Should succeed", async function () {
        //     expect(ploopy.loop(1, 2000000)).to.not.be.reverted;
        // });
        // it("Should fail if called by non EOA", async function () {
        //     const ploopy = await hre.ethers.getContractAt("Ploopy", ploopyAddress);
        //     expect(ploopy.loop(100, 10000)).to.be.reverted;
        // });
    });

    // describe("receiveFlashLoan", function () {
    //     it("Should fail if called by other than the BALANCER_VAULT", async function () {
    //         const ploopy = await hre.ethers.getContractAt("Ploopy", ploopyAddress);
    //         console.log("Ploopy contract address:", ploopy.address.toString());
    //         expect(ploopy.receiveFlashLoan([], [], [], "0x")).to.be.reverted;
    //     });

    //     it("Should fail if feeAmounts[0] > 0", async function () {
    //         const ploopy = await hre.ethers.getContractAt("Ploopy", ploopyAddress);
    //         console.log("Ploopy contract address:", ploopy.address.toString());
    //         expect(ploopy.receiveFlashLoan([_USDC], [1000], [1], "0x")).to.be.reverted;
    //     });

    //     it("Should fail if data.borrowedAmount != amounts[0] or data.borrowedToken != tokens[0]", async function () {
    //         const ploopy = await hre.ethers.getContractAt("Ploopy", ploopyAddress);
    //         console.log("Ploopy contract address:", ploopy.address.toString());
    //         expect(ploopy.receiveFlashLoan([_USDC], [1000], [0], "0x")).to.be.reverted;
    //     });

    //     it("Should fail if glpAmount == 0", async function () {
    //         const ploopy = await hre.ethers.getContractAt("Ploopy", ploopyAddress);
    //         console.log("Ploopy contract address:", ploopy.address.toString());
    //         expect(ploopy.receiveFlashLoan([_USDC], [1000], [0], "0x")).to.be.reverted;
    //     });
    // });

});


