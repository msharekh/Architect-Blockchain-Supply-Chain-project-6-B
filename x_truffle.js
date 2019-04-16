let HDWalletProvider = require('truffle-hdwallet-provider');
let infuraKey = '2dcdc64520ac497481d2fd701b1c9641';
let mnemonic =
  'uphold picnic age aunt sheriff embody dune gauge merit hero purse innocent';

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*' // Match any network id
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, 'rinkeby.infura.io/' + infuraKey);
      },
      // from: '0x66178bd1f010b4bF530203f90f889b599874fF84',
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000
    }
  }
};

// const HDWalletProvider = require('truffle-hdwallet-provider');
// module.exports = {
//   compilers: {
//     solc: {
//       optimizer: {
//         enabled: true,
//         runs: 200
//       }
//     }
//   },
//   networks: {
//     development: {
//       host: '127.0.0.1',
//       port: 8545,
//       network_id: '*' // Match any network id
//     },
//     rinkeby: {
//       provider: () => {
//         //replace string parameters
//         return new HDWalletProvider(
//           'vacuum stuff swap chaos bulb design suit mask ticket october note private',
//           'rinkeby.infura.io/v3/5f756d9eb86749e1ad58bd0a563e4b9b'
//         );
//       },
//       network_id: 4,
//       gas: 6700000,
//       gasPrice: 10000000000
//     }
//   }
// };
