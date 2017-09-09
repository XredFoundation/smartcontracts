require('babel-register');
require('babel-polyfill');

var HDWalletProvider = require('truffle-hdwallet-provider');

const mnemonic = process.env.TEST_MNETONIC || 'wallet wallet wallet wallet wallet wallet wallet wallet wallet wallet wallet wallet';// 'e0da2c91e59d50d6abec95f8518e8ccaf471c6ad3bac9efc0bf9b9a3ec65d260';
const kovanProvider = new HDWalletProvider(mnemonic, 'https://kovan.infura.io');

module.exports = {
  networks: {
    development: {
      network_id: "*",
      host: 'localhost',
      port: 8545,
      gas: 6000000,
      from: '0x25f5cabf186a4a05d66adab5b8214b8b5e5a5cb7',
    },
    private: {
      network_id: "*",
      host: 'localhost',
      port: 8545,
      gas: 4999999,
      from: '0x89d0a9ad9658b487f3a7948bea5443dbe858fb51',
    },
    test: {
      provider: require('ethereumjs-testrpc').provider({ gasLimit: 100000000000 }),
      gas: 10000000000,
      from: '0x89d0a9ad9658b487f3a7948bea5443dbe858fb51',
      network_id: "*"
    },
    mainnet: {
      network_id: 1,
      from: '0x572EC0D3b3c3c1DE50340F6F811C1F6408Dc3195',
      host: 'localhost',
      port: 8545,
      gas: 4999999,
    },
    kovan: {
      network_id: 42,
      provider: kovanProvider,
      gas: 4999999,
      from: '0x572EC0D3b3c3c1DE50340F6F811C1F6408Dc3195',
    },
  },
  build: {}
}
