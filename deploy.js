let HDWalletProvider = require('truffle-hdwallet-provider');
var Web3 = require('web3');
let infuraKey = '2dcdc64520ac497481d2fd701b1c9641';
let mnemonic =
  'uphold picnic age aunt sheriff embody dune gauge merit hero purse innocent';
console.log('start', ':	', 111);
let provider = new HDWalletProvider(
  mnemonic,
  'https://rinkeby.infura.io/v3/' + infuraKey
);
console.log('provider', ':	', provider);
let web3 = new Web3(provider);
// const web3 = new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8546', net, options);
let deploy = async () => {
  console.log('aaa');
  let accounts = await web3.eth.getAccounts();
  console.log('bbb');
  console.log('to deploy..', ':	', accounts[0]);
  // await new web3.eth.Contract();

  var version = await web3.version.api;
  console.log('vvv:', version); // "0.2.0"
};
deploy();
console.log('end', ':	', 000);
