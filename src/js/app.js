App = {
  web3Provider: null,
  contracts: {},
  emptyAddress: '0x0000000000000000000000000000000000000000',
  sku: 0,
  upc: 0,
  metamaskAccountID: '0x0000000000000000000000000000000000000000',
  ownerID: '0x0000000000000000000000000000000000000000',
  originFarmerID: '0x0000000000000000000000000000000000000000',
  originFarmName: null,
  originFarmInformation: null,
  originFarmLatitude: null,
  originFarmLongitude: null,
  productNotes: null,
  productPrice: 0,
  distributorID: '0x0000000000000000000000000000000000000000',
  retailerID: '0x0000000000000000000000000000000000000000',
  consumerID: '0x0000000000000000000000000000000000000000',
  newFarmerID: '0x0000000000000000000000000000000000000000',

  init: async function() {
    App.readForm();
    /// Setup access to blockchain
    return await App.initWeb3();
  },

  readForm: function() {
    App.sku = $('#sku').val();
    App.upc = $('#upc').val();
    App.ownerID = $('#ownerID').val();
    App.originFarmerID = $('#originFarmerID').val();
    App.originFarmName = $('#originFarmName').val();
    App.originFarmInformation = $('#originFarmInformation').val();
    App.originFarmLatitude = $('#originFarmLatitude').val();
    App.originFarmLongitude = $('#originFarmLongitude').val();
    App.productNotes = $('#productNotes').val();
    App.productPrice = $('#productPrice').val();
    App.distributorID = $('#distributorID').val();
    App.retailerID = $('#retailerID').val();
    App.consumerID = $('#consumerID').val();

    //new role
    App.newFarmerID = $('#newFarmerID').val();
    App.newDistributorID = $('#newDistributorID').val();
    App.newRetailerID = $('#newRetailerID').val();
    App.newConsumerID = $('#newConsumerID').val();

    /* 
      console.log(
        App.sku,
        App.upc,
        App.ownerID,
        App.originFarmerID,
        App.originFarmName,
        App.originFarmInformation,
        App.originFarmLatitude,
        App.originFarmLongitude,
        App.productNotes,
        App.productPrice,
        App.distributorID,
        App.retailerID,
        App.consumerID
      ); 
    */
  },

  initWeb3: async function() {
    /// Find or Inject Web3 Provider
    /// Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error('User denied account access');
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider(
        'http://localhost:7545'
      );
    }

    App.getMetaskAccountID();

    return App.initSupplyChain();
  },

  getMetaskAccountID: function() {
    web3 = new Web3(App.web3Provider);

    // Retrieving accounts
    web3.eth.getAccounts(function(err, res) {
      if (err) {
        console.log('Error:', err);
        return;
      }
      console.log('getMetaskID:', res);
      App.metamaskAccountID = res[0];
    });
  },

  initSupplyChain: function() {
    /// Source the truffle compiled smart contracts
    var jsonSupplyChain = '../../build/contracts/SupplyChain.json';

    /// JSONfy the smart contracts
    $.getJSON(jsonSupplyChain, function(data) {
      console.log('data', data);
      var SupplyChainArtifact = data;
      App.contracts.SupplyChain = TruffleContract(SupplyChainArtifact);
      App.contracts.SupplyChain.setProvider(App.web3Provider);

      App.fetchItemBufferOne();
      App.fetchItemBufferTwo();
      App.fetchEvents();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', App.handleButtonClick);
  },

  handleButtonClick: async function(event) {
    event.preventDefault();

    //get current Metask Account ID
    App.getMetaskAccountID();

    var processId = parseInt($(event.target).data('id'));
    console.log('processId:', processId);

    switch (processId) {
      case 1:
        return await App.harvestItem(event);
        break;
      case 2:
        return await App.processItem(event);
        break;
      case 3:
        return await App.packItem(event);
        break;
      case 4:
        return await App.sellItem(event);
        break;
      case 5:
        return await App.buyItem(event);
        break;
      case 6:
        return await App.shipItem(event);
        break;
      case 7:
        return await App.receiveItem(event);
        break;
      case 8:
        return await App.purchaseItem(event);
        break;
      case 9:
        return await App.fetchItemBufferOne(event);
        break;
      case 10:
        return await App.fetchItemBufferTwo(event);
        break;
      case 11:
        return await App.addFarmer(event);
        break;
      case 12:
        return await App.addDistributor(event);
        break;
      case 13:
        return await App.addRetailer(event);
        break;
      case 14:
        return await App.addConsumer(event);
        break;
    }
  },

  harvestItem: function(event) {
    event.preventDefault();
    // var processId = parseInt($(event.target).data('id'));

    App.contracts.SupplyChain.deployed()
      .then(function(instance) {
        return instance.harvestItem(
          App.upc,
          App.metamaskAccountID,
          App.originFarmName,
          App.originFarmInformation,
          App.originFarmLatitude,
          App.originFarmLongitude,
          App.productNotes
        );
      })
      .then(function(result) {
        $('#ftc-item').text(result);
        console.log('harvestItem', result);
      })
      .catch(function(err) {
        console.log(err.message);
      });
  },

  processItem: function(event) {
    event.preventDefault();
    // var processId = parseInt($(event.target).data('id'));

    App.contracts.SupplyChain.deployed()
      .then(function(instance) {
        return instance.processItem(App.upc, { from: App.metamaskAccountID });
      })
      .then(function(result) {
        $('#ftc-item').text(result);
        console.log('processItem', result);
      })
      .catch(function(err) {
        console.log(err.message);
      });
  },

  packItem: function(event) {
    event.preventDefault();
    // var processId = parseInt($(event.target).data('id'));

    App.contracts.SupplyChain.deployed()
      .then(function(instance) {
        return instance.packItem(App.upc, { from: App.metamaskAccountID });
      })
      .then(function(result) {
        $('#ftc-item').text(result);
        console.log('packItem', result);
      })
      .catch(function(err) {
        console.log(err.message);
      });
  },

  sellItem: function(event) {
    event.preventDefault();
    // var processId = parseInt($(event.target).data('id'));

    App.contracts.SupplyChain.deployed()
      .then(function(instance) {
        const productPrice = web3.toWei(1, 'ether');
        console.log('productPrice', productPrice);
        return instance.sellItem(App.upc, App.productPrice, {
          from: App.metamaskAccountID
        });
      })
      .then(function(result) {
        $('#ftc-item').text(result);
        console.log('sellItem', result);
      })
      .catch(function(err) {
        console.log(err.message);
      });
  },

  buyItem: function(event) {
    event.preventDefault();
    // var processId = parseInt($(event.target).data('id'));
    let paidvalue = $('#productPrice').val();
    App.contracts.SupplyChain.deployed()
      .then(function(instance) {
        const walletValue = web3.toWei(paidvalue, 'ether');
        return instance.buyItem(App.upc, App.productPrice, {
          from: App.metamaskAccountID,
          value: walletValue
        });
      })
      .then(function(result) {
        $('#ftc-item').text(result);
        console.log('buyItem', result);
      })
      .catch(function(err) {
        console.log(err.message);
      });
  },

  shipItem: function(event) {
    event.preventDefault();
    // var processId = parseInt($(event.target).data('id'));

    App.contracts.SupplyChain.deployed()
      .then(function(instance) {
        return instance.shipItem(App.upc, { from: App.metamaskAccountID });
      })
      .then(function(result) {
        $('#ftc-item').text(result);
        console.log('shipItem', result);
      })
      .catch(function(err) {
        console.log(err.message);
      });
  },

  receiveItem: function(event) {
    event.preventDefault();
    // var processId = parseInt($(event.target).data('id'));

    App.contracts.SupplyChain.deployed()
      .then(function(instance) {
        return instance.receiveItem(App.upc, { from: App.metamaskAccountID });
      })
      .then(function(result) {
        $('#ftc-item').text(result);
        console.log('receiveItem', result);
      })
      .catch(function(err) {
        console.log(err.message);
      });
  },

  purchaseItem: function(event) {
    event.preventDefault();
    // var processId = parseInt($(event.target).data('id'));

    App.contracts.SupplyChain.deployed()
      .then(function(instance) {
        return instance.purchaseItem(App.upc, { from: App.metamaskAccountID });
      })
      .then(function(result) {
        $('#ftc-item').text(result);
        console.log('purchaseItem', result);
      })
      .catch(function(err) {
        console.log(err.message);
      });
  },

  fetchItemBufferOne: function() {
    ///   event.preventDefault();
    ///    var processId = parseInt($(event.target).data('id'));
    App.upc = $('#upc').val();
    console.log('upc', App.upc);

    App.contracts.SupplyChain.deployed()
      .then(function(instance) {
        $('#ftc-logs').append(
          '<li>-------------FETCH ITEM BUFFER ONE-------------------</li>'
        );
        return instance.fetchItemBufferOne(App.upc);
      })
      .then(function(result) {
        $('#ftc-item').text(result);
        console.log('sku', ':	', result[0].toNumber());
        console.log('upc', ':	', result[1].toNumber());
        console.log('originFarmerID', ':	', result[3]);
        console.log('originFarmName', ':	', result[4]);
        console.log('originFarmInformation', ':	', result[5]);
        console.log('originFarmLatitude', ':	', result[6]);
        console.log('originFarmLongitude', ':	', result[7]);

        $('#ftc-logs').append('<li>sku:	' + result[0].toNumber() + '</li>');
        $('#ftc-logs').append('<li>upc:	' + result[1].toNumber() + '</li>');
        $('#ftc-logs').append('<li>originFarmerID:	' + result[3] + '</li>');
        $('#ftc-logs').append('<li>originFarmName:	' + result[4] + '</li>');
        $('#ftc-logs').append(
          '<li>originFarmInformation:	' + result[5] + '</li>'
        );
        $('#ftc-logs').append('<li>originFarmLatitude:	' + result[6] + '</li>');
        $('#ftc-logs').append('<li>originFarmLongitude:	' + result[7] + '</li>');

        console.log('fetchItemBufferOne', result);
      })
      .catch(function(err) {
        console.log(err.message);
      });
  },

  fetchItemBufferTwo: function() {
    ///    event.preventDefault();
    ///    var processId = parseInt($(event.target).data('id'));
    App.contracts.SupplyChain.deployed()
      .then(function(instance) {
        $('#ftc-logs').html(
          '<li>------------- FETCH ITEM BUFFER TWO -------------</li>'
        );

        // var events = instance.allEvents(function(err, log) {
        //   if (!err)
        //     $('#ftc-logs').append(
        //       '<li>' + log.event + ' - ' + log.transactionHash + '</li>'
        //     );
        // });

        return instance;
      })
      .then(function(instance) {
        return instance.fetchItemBufferTwo.call(App.upc);
      })
      .then(function(result) {
        $('#ftc-item').text(result);
        console.log('productID ', ':	', result[2].toNumber());
        console.log('productNotes ', ':	', result[3]);
        console.log('productPrice ', ':	', result[4].toNumber());
        console.log('state', ': ', result[5].toNumber());
        console.log('distributorID ', ':	', result[6]);
        console.log('retailerID ', ':	', result[7]);
        console.log('consumerID ', ':	', result[8]);

        $('#ftc-logs').append(
          '<li>productID :	' + result[2].toNumber() + '</li>'
        );

        $('#ftc-logs').append('<li>productNotes :	' + result[3] + '</li>');
        $('#ftc-logs').append(
          '<li>productPrice :	' + result[4].toNumber() + '</li>'
        );
        $('#ftc-logs').append(
          '<li>state',
          ': ',
          result[5].toNumber() + '</li>'
        );
        $('#ftc-logs').append('<li>distributorID :	' + result[6] + '</li>');
        $('#ftc-logs').append('<li>retailerID :	' + result[7] + '</li>');
        $('#ftc-logs').append('<li>consumerID :	' + result[8] + '</li>');
        console.log('fetchItemBufferTwo', result);
      })
      .catch(function(err) {
        console.log(err.message);
      });
  },

  fetchEvents: function() {
    if (
      typeof App.contracts.SupplyChain.currentProvider.sendAsync !== 'function'
    ) {
      App.contracts.SupplyChain.currentProvider.sendAsync = function() {
        return App.contracts.SupplyChain.currentProvider.send.apply(
          App.contracts.SupplyChain.currentProvider,
          arguments
        );
      };
    }

    App.contracts.SupplyChain.deployed()
      .then(function(instance) {
        var events = instance.allEvents(function(err, log) {
          if (!err)
            $('#ftc-events').append(
              '<li>' + log.event + ' - ' + log.transactionHash + '</li>'
            );
        });
      })
      .catch(function(err) {
        console.log(err.message);
      });
  },

  addFarmer: function(event) {
    event.preventDefault();
    // var processId = parseInt($(event.target).data('id'));
    App.newFarmerID = $('#newFarmerID').val();
    console.log('new Farmer ID:', App.newFarmerID);

    App.contracts.SupplyChain.deployed()
      .then(function(instance) {
        return instance.addFarmer(App.newFarmerID, {
          from: App.metamaskAccountID
        });
      })
      .then(function(result) {
        $('#ftc-item').text(result);
        console.log('add Farmer', result);
      })
      .catch(function(err) {
        console.log(err.message);
      });
  },

  addDistributor: function(event) {
    event.preventDefault();
    // var processId = parseInt($(event.target).data('id'));
    App.newDistributorID = $('#newDistributorID').val();
    console.log('new Distributor ID:', App.newDistributorID);

    App.contracts.SupplyChain.deployed()
      .then(function(instance) {
        return instance.addDistributor(App.newDistributorID, {
          from: App.metamaskAccountID
        });
      })
      .then(function(result) {
        $('#ftc-item').text(result);
        console.log('add Distributor', result);
      })
      .catch(function(err) {
        console.log(err.message);
      });
  },

  addRetailer: function(event) {
    event.preventDefault();
    // var processId = parseInt($(event.target).data('id'));
    App.newRetailerID = $('#newRetailerID').val();

    console.log('new Retailer ID:', App.newRetailerID);

    App.contracts.SupplyChain.deployed()
      .then(function(instance) {
        return instance.addRetailer(App.newRetailerID, {
          from: App.metamaskAccountID
        });
      })
      .then(function(result) {
        $('#ftc-item').text(result);
        console.log('add Retailer', result);
      })
      .catch(function(err) {
        console.log(err.message);
      });
  },
  addConsumer: function(event) {
    event.preventDefault();
    // var processId = parseInt($(event.target).data('id'));
    App.newConsumerID = $('#newConsumerID').val();
    console.log('new Consumer ID:', App.newConsumerID);

    App.contracts.SupplyChain.deployed()
      .then(function(instance) {
        return instance.addConsumer(App.newConsumerID, {
          from: App.metamaskAccountID
        });
      })
      .then(function(result) {
        $('#ftc-item').text(result);
        console.log('add Consumer', result);
      })
      .catch(function(err) {
        console.log(err.message);
      });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
