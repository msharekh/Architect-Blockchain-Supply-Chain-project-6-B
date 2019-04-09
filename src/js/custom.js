// import Web3 from 'web3';
// import Web3 from '/Users/msharekh/Google Drive/Blockchain Developer Nanodegree/Term 2/Project 6 B/nd1309-Project-6b-Example-Template/project-6/node_modules/web3';
var Web3 = require('web3');

// const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8546');
// let web3 = new Web3();
// web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

web3.eth.getAccounts(console.log);

// Code here runs first.
let acc1 = '0x27d8d15cbc94527cadf5ec14b69519ae23288b95';
let acc2 = '0x018c2dabef4904ecbd7118350a0c54dbeae3549a';
let acc3 = '0xce5144391b4ab80668965f2cc4f2cc102380ef0a';
web3.eth.getBalance(acc1).then(function(b) {
  console.log('1:', b);
});
web3.eth.getBalance(acc2).then(function(b) {
  console.log('2:', b);
});
web3.eth.getBalance(acc3).then(function(b) {
  console.log('3:', b);
});

// Code here runs second.
console.log('Here!');
