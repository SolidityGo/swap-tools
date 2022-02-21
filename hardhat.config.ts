import '@typechain/hardhat';
import 'hardhat-watcher'
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import '@openzeppelin/hardhat-upgrades';
import 'dotenv/config';
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
export default {
  solidity: {
    compilers: [
      {
        version: "0.5.16",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.8.9",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },

    ]
  },
  networks: {
    'bsc': {
      url: "https://bsc-dataseed1.ninicoin.io",
      accounts: [
        process.env.BSC_TEST_SK ? process.env.BSC_TEST_SK : '0x1000000000000000000000000000000000000000000000000000000000000000',
      ]
    },
  },
  watcher: {
    compilation: {
      tasks: ["compile"],
      files: ["./contracts"],
      verbose: true,
    }
  },
  mocha: {
    timeout: 2000000
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
};

