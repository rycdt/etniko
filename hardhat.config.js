require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    rinkeby: {
      url: process.env.VUE_APP_RINKEBY_RPC_URL,
      accounts: [process.env.VUE_APP_PRIVATE_KEY]
    },
    hardhat: {
      chainId: 31337
    },
    // matic:{
    //   url: "https://polygon-mumbai.g.alchemy.com/v2/19sOxlGlPtBqR_wLiEZct-hvaFJv7u0x",
    //   accounts:["fa7572a6c4751c9359b16f0b30d3ad2cf7a6e5a56090bf85f20e0748facb6238"]
    // },
    // ropsten: {
    //   url: process.env.ROPSTEN_URL || "",
    //   accounts:
    //     process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    // },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.VUE_APP_ETHERSCAN_KEY,
  },
};
