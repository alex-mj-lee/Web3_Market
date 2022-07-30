// https://eth-goerli.g.alchemy.com/v2/EhglQ6CV3GBYZdaf0vjvq9NwAOJ9b4Ij

require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
  solidity: "0.8.1",
  networks: {
    goerli: {
      url: process.env.APP_ALCHEMY_API_URL,
      accounts: [process.env.APP_PRIVATE_KEY],
    },
  },
};
