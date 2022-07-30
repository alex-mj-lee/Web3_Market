const hre = require("hardhat");

const main = async () => {
  const Transactions = await hre.ethers.getContractFactory("Transactions");
  const transactions = await Transactions.deploy();

  const NFTMarket = await hre.ethers.getContractFactory("NFTMarket");
  const nftMarket = await NFTMarket.deploy();

  await transactions.deployed();
  await nftMarket.deployed();

  console.log("Transactions deployed to:", transactions.address);
  console.log("NFTmarket deployed to:", nftMarket.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

runMain();
