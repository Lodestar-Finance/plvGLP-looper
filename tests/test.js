const { expect } = require('chai');
const { ethers } = require('hardhat');
// import 'chai'
// import 'hardhat'

describe("Token contract", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const [owner] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Ploopy");

    const hardhatToken = await Token.deploy();

    const ownerBalance = await hardhatToken.balanceOf(owner.address);
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });
});

// describe('Ploopy', function () {
//   let Ploopy;
//   let ploopy;
//   let owner;
//   let addr1;
//   let addr2;
//   let addrs;

//   beforeEach(async function () {
//     Ploopy = await ethers.getContractFactory("Ploopy");
//     [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
//     ploopy = await Ploopy.deploy();
//     await ploopy.deployed();
//   });

//   describe('Deployment', function () {
//     it('Should set the right owner', async function () {
//       expect(await ploopy.owner()).to.equal(owner.address);
//     });

//     it('Should fail if deployed by non-owner', async function () {
//       expect(Ploopy.connect(addr1).deploy()).to.be.reverted;
//     });
//   });

//   describe('loop', function () {
//     it('Should fail if _leverage < DIVISOR or _leverage > MAX_LEVERAGE', async function () {
//       expect(ploopy.loop(100, 999)).to.be.reverted;
//     });

//     it('Should fail if called by non EOA', async function () {
//       const contract = await ethers.getContractFactory("Contract");
//       const instance = await contract.deploy();
//       await instance.deployed();
//       expect(ploopy.loop(100, 10000)).to.be.reverted;
//     });
//   });

//   describe('receiveFlashLoan', function () {
//     it('Should fail if called by other than the BALANCER_VAULT', async function () {
//       expect(ploopy.receiveFlashLoan([], [], [], "0x")).to.be.reverted;
//     });

//     it('Should fail if feeAmounts[0] > 0', async function () {
//       expect(ploopy.receiveFlashLoan([USDC], [1000], [1], "0x")).to.be.reverted;
//     });

//     it('Should fail if data.borrowedAmount != amounts[0] or data.borrowedToken != tokens[0]', async function () {
//       expect(ploopy.receiveFlashLoan([USDC], [1000], [0], "0x")).to.be.reverted;
//     });

//     it('Should fail if glpAmount == 0', async function () {
//       expect(ploopy.receiveFlashLoan([USDC], [1000], [0], "0x")).to.be.reverted;
//     });
//   });

//   describe('Permissions and Access Control', function () {
//     it('Should fail if non-owner tries to call an owner-only function', async function () {
//       await expect(ploopy.connect(addr1).ownerOnlyFunction()).to.be.reverted;
//     });

//     it('Should allow owner to call an owner-only function', async function () {
//       await expect(ploopy.connect(owner).ownerOnlyFunction()).to.not.be.reverted;
//     });
//   });
// });