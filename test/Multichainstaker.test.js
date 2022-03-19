const { expect } = require("chai");

const startTime = 1647198000;

describe("Furystaker after start time", function () {
  let Furystaker;
  let hardhatContract;
  let owner;
  let addr1;
  let addr2;
  let addr3;
  let addrs;

  beforeEach(async function () {
    Furystaker = await ethers.getContractFactory("Furystaker");
    [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();

    hardhatContract = await Furystaker.deploy(
      addr1.address,
      addr2.address,
      1646750514
    );
  });

  it("users should not able to invest less than 0.1", async function () {
    await expect(
      hardhatContract.invest("0x0000000000000000000000000000000000000000", 0, {
        value: 1,
      })
    ).to.be.revertedWith("Minimum investment is 0.1");
  });

  it("users should not able to invest more than 1000", async function () {
    await expect(
      hardhatContract.invest("0x0000000000000000000000000000000000000000", 0, {
        value: ethers.utils.parseEther("1001"),
      })
    ).to.be.revertedWith("You can not invest more than 10000 at once");
  });

  it("users should able to invest 10 avax", async function () {
    const provider = waffle.provider;
    const refAddress = addr3.address;
    const txOwner = await hardhatContract
      .connect(addr3)
      .invest("0x0000000000000000000000000000000000000000", 0, {
        value: ethers.utils.parseEther("1"),
      });
    const receipttxOwner = await txOwner.wait();
    const tx = await hardhatContract.connect(addrs[4]).invest(refAddress, 0, {
      value: ethers.utils.parseEther("100"),
    });
    const receipt = await tx.wait();
    const referenaceBalance = await hardhatContract.getUserReferralTotalBonus(
      refAddress
    );
    const addr2BalanceFormatted =
      Math.round(ethers.utils.formatEther(referenaceBalance) * 1e4) / 1e4;
    const txAddrs5 = await hardhatContract.connect(addrs[5]).invest(refAddress, 0, {
      value: ethers.utils.parseEther("100"),
    });
    const receipt5 = await tx.wait();
    const referenaceAfter5Balance = await hardhatContract.getUserReferralTotalBonus(
      refAddress
    );
    const addr2BalanceAfter5Formatted =
      Math.round(ethers.utils.formatEther(referenaceAfter5Balance) * 1e4) / 1e4;

      const referenace2Balance = await provider.getBalance(addr2.address);
      const referenace2BalanceFormatted =
        Math.round(ethers.utils.formatEther(referenace2Balance) * 1e4) / 1e4;

        const referenace1Balance = await provider.getBalance(addr1.address);
        const referenace1BalanceFormatted =
          Math.round(ethers.utils.formatEther(referenace1Balance) * 1e4) / 1e4;
    console.log(
      referenace2BalanceFormatted,
      referenace1BalanceFormatted
    );
    expect(addr2BalanceAfter5Formatted).to.equal(10);
  });
});
