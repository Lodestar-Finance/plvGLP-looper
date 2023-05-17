// import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import {HardhatUserConfig} from 'hardhat/types';
import * as dotenv from "dotenv";

// Need some extra pathing guidance for hardhat to find our .env file
dotenv.config({ path: __dirname+'/.env' });

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: `0.8.17`,
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000
          }
        }
      },
      {
        version: `0.7.0`,
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000
          }
        }
      }
    ]
  },
  networks: {
    hardhat: {
      forking: {
        url: 'https://api.avax.network/ext/bc/C/rpc'
      },
      gas: "auto"
    },
    arbitrum: {
      url: process.env.ARB_RPC,
      accounts: [process.env.ARB_PK ?? '']
    }
  }
};

export default config;
