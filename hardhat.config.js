// // hardhat.config.js

// require("@nomiclabs/hardhat-ethers");
// require("@nomiclabs/hardhat-waffle");
// require("dotenv").config({ path: ".env" })

// // You need to export an object to set up your config
// // Go to https://hardhat.org/config/ to learn more

// //const GOERLI_URL = process.env.GOERLI_URL;
// const PRIVATE_KEY = process.env.PRIVATE_KEY;

// /**
//  * @type import('hardhat/config').HardhatUserConfig
//  */
// module.exports = {
//   solidity: "0.8.9",
//   networks: {
//     "optimism-kovan": {
//       url: "https://kovan.optimism.io",
//       accounts: [PRIVATE_KEY]
//     }
//   }
// };

require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("@nomicfoundation/hardhat-chai-matchers");
require("dotenv").config({ path: ".env" });

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.10",
//   networks: {
//     mumbai: {
//       url: process.env.TESTNET_RPC,
//       accounts: [process.env.PRIVATE_KEY]
//     },
//   },
//   etherscan: {
//     apiKey: process.env.POLYGONSCAN_API_KEY
//   }
// };

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.10",
  networks: {
    optimism: {
      url: "https://goerli.optimism.io",
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 15000000,
      gasLimit: 8000000
    }
  },
};
