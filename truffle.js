// var HDWalletProvider = require('truffle-hdwallet-provider');
// const infuraKey = '<Infura PROJECT ID>';
// var mnemonic =
//   'spirit supply whale amount human item harsh scare congress discover talent hamster';

// module.exports = {
//   networks: {
//     development: {
//       host: '127.0.0.1',
//       port: 8545,
//       network_id: '*' // Match any network id
//     },
//     rinkeby: {
//       provider: function() {
//         return new HDWalletProvider(
//           mnemonic,
//           'mainnet.infura.io/v3/2dcdc64520ac497481d2fd701b1c9641'
//         );
//       },
//       from: '0x66178bd1f010b4bF530203f90f889b599874fF84',
//       network_id: 4,
//       gas: 4500000,
//       gasPrice: 10000000000
//     }
//   }
// };

const HDWalletProvider = require('truffle-hdwallet-provider');
module.exports = {
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*' // Match any network id
    },
    rinkeby: {
      provider: () => {
        //replace string parameters
        return new HDWalletProvider(
          'spirit supply whale amount human item harsh scare congress discover talent hamster',
          'mainnet.infura.io/v3/2dcdc64520ac497481d2fd701b1c9641'
        );
      },
      network_id: 4,
      gas: 6700000,
      gasPrice: 10000000000
    }
  }
};
