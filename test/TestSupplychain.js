// This script is designed to test the solidity smart contract - SuppyChain.sol -- and the various functions within
// Declare a variable and assign the compiled smart contract artifact
var SupplyChain = artifacts.require('SupplyChain');

contract('SupplyChain', function(accounts) {
  // Declare few constants and assign a few sample accounts generated by ganache-cli
  var sku = 1;
  var upc = 1;
  const ownerID = accounts[0];
  const originFarmerID = accounts[1];
  const originFarmName = 'John Doe';
  const originFarmInformation = 'Yarray Valley';
  const originFarmLatitude = '-38.239770';
  const originFarmLongitude = '144.341490';
  var productID = sku + upc;
  const productNotes = 'Best beans for Espresso';
  const productPrice = web3.toWei(1, 'ether');
  var itemState = 0;
  const distributorID = accounts[2];
  const retailerID = accounts[3];
  const consumerID = accounts[4];
  const emptyAddress = '0x00000000000000000000000000000000000000';

  ///Available Accounts
  ///==================
  ///(0) 0x27d8d15cbc94527cadf5ec14b69519ae23288b95
  ///(1) 0x018c2dabef4904ecbd7118350a0c54dbeae3549a
  ///(2) 0xce5144391b4ab80668965f2cc4f2cc102380ef0a
  ///(3) 0x460c31107dd048e34971e57da2f99f659add4f02
  ///(4) 0xd37b7b8c62be2fdde8daa9816483aebdbd356088
  ///(5) 0x27f184bdc0e7a931b507ddd689d76dba10514bcb
  ///(6) 0xfe0df793060c49edca5ac9c104dd8e3375349978
  ///(7) 0xbd58a85c96cc6727859d853086fe8560bc137632
  ///(8) 0xe07b5ee5f738b2f87f88b99aac9c64ff1e0c7917
  ///(9) 0xbd3ff2e3aded055244d66544c9c059fa0851da44

  /**
   * * Logs
   */
  console.log('ganache-cli accounts used here...');
  console.log('Owner: accounts[0] ', accounts[0]);
  console.log('Owner: accounts[1] ', accounts[1]);
  console.log('Owner: accounts[2] ', accounts[2]);
  console.log('Owner: accounts[3] ', accounts[3]);
  console.log('Owner: accounts[4] ', accounts[4]);

  /*  console.log('Owner: accounts[0] ', accounts[0]);
  console.log('Farmer: accounts[1] ', accounts[1]);
  console.log('Distributor: accounts[2] ', accounts[2]);
  console.log('Retailer: accounts[3] ', accounts[3]);
  console.log('Consumer: accounts[4] ', accounts[4]);

  console.log('ProductPrice: ', productPrice);
  console.log('itemState: ', itemState); */

  // 1st Test --- HARVEST ITEM

  it('Testing smart contract function harvestItem() that allows a farmer to harvest coffee', async () => {
    const supplyChain = await SupplyChain.deployed();

    // Declare and Initialize a variable for event
    var eventEmitted = false;

    // Watch the emitted event Harvested()
    var event = supplyChain.Harvested();
    await event.watch((err, res) => {
      eventEmitted = true;
    });

    ///*
    // Mark an item as Harvested by calling function harvestItem()
    await supplyChain.harvestItem(
      upc,
      originFarmerID,
      originFarmName,
      originFarmInformation,
      originFarmLatitude,
      originFarmLongitude,
      productNotes
    );
    // */
    // /*

    // Retrieve the just now saved item from blockchain by calling function fetchItem()
    const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
    const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);
    // */
    /**
     * !  AssertionError
     */
    // /*
    // Verify the result set
    console.log('sku', ':	', resultBufferOne[0].toNumber());
    assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU'); //SKU

    console.log('upc', ':	', resultBufferOne[1].toNumber());
    assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC'); //UPC

    // assert.equal(resultBufferOne[5], 0, 'Error: Invalid item State'); //itemState
    console.log('ownerID', ':	', resultBufferOne[2]);
    assert.equal(
      resultBufferOne[2],
      originFarmerID, //ownerID
      'Error: Missing or Invalid ownerID'
    );
    // */
    // /*
    console.log('originFarmerID', ':	', resultBufferOne[3]);
    assert.equal(
      resultBufferOne[3],
      originFarmerID,
      'Error: Missing or Invalid originFarmerID'
    );
    // */
    // /*
    console.log('originFarmName', ':	', resultBufferOne[4]);
    assert.equal(
      resultBufferOne[4],
      originFarmName,
      'Error: Missing or Invalid originFarmName'
    );
    // */
    // /*
    console.log('originFarmInformation', ':	', resultBufferOne[5]);
    assert.equal(
      resultBufferOne[5],
      originFarmInformation,
      'Error: Missing or Invalid originFarmInformation'
    );
    // */
    // /*
    console.log('originFarmLatitude', ':	', resultBufferOne[6]);
    assert.equal(
      resultBufferOne[6],
      originFarmLatitude,
      'Error: Missing or Invalid originFarmLatitude'
    );
    // */
    // /*
    console.log('originFarmLongitude', ':	', resultBufferOne[7]);
    assert.equal(
      resultBufferOne[7],
      originFarmLongitude,
      'Error: Missing or Invalid originFarmLongitude'
    );
    // */
    // /*
    console.log('State', ':	HARVEST ITEM ', resultBufferTwo[5].toNumber());
    assert.equal(resultBufferTwo[5], 0, 'Error: Invalid item State');
    console.log('emitted', ':	', eventEmitted);
    assert.equal(eventEmitted, true, 'Invalid event emitted');
    // */
  });

  // 2nd Test  ----- PROCESS ITEM
  // /*
  it('Testing smart contract function processItem() that allows a farmer to process coffee', async () => {
    // Declare and Initialize a variable for event
    const supplyChain = await SupplyChain.deployed();

    // Watch the emitted event Processed()
    var event = supplyChain.Processed();
    await event.watch((err, res) => {
      eventEmitted = true;
    });
    // Mark an item as Processed by calling function processtItem()
    await supplyChain.processItem(upc);
    // Retrieve the just now saved item from blockchain by calling function fetchItem()
    const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);
    // Verify the result set
    console.log('State', ':	PROCESS ITEM ', resultBufferTwo[5].toNumber());
    assert.equal(resultBufferTwo[5].toNumber(), 1, 'Error: Invalid item State');
    console.log('emitted', ':	', eventEmitted);
    assert.equal(eventEmitted, true, 'Invalid event emitted');
  });
  // */

  // 3rd Test ---- PACK ITEM
  // /*
  it('Testing smart contract function packItem() that allows a farmer to pack coffee', async () => {
    // Declare and Initialize a variable for event
    const supplyChain = await SupplyChain.deployed();

    // Watch the emitted event Packed()
    var event = supplyChain.Packed();
    await event.watch((err, res) => {
      eventEmitted = true;
    });
    // Mark an item as Packed by calling function packItem()
    await supplyChain.packItem(upc);

    // Retrieve the just now saved item from blockchain by calling function fetchItem()
    const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

    // Verify the result set
    console.log('State', ':	PACK ITEM ', resultBufferTwo[5].toNumber());
    assert.equal(resultBufferTwo[5].toNumber(), 2, 'Error: Invalid item State');
    console.log('emitted', ':	', eventEmitted);
    assert.equal(eventEmitted, true, 'Invalid event emitted');
  });
  // */

  // 4th Test SELL ITEM
  // /*
  it('Testing smart contract function sellItem() that allows a farmer to sell coffee', async () => {
    // Declare and Initialize a variable for event
    const supplyChain = await SupplyChain.deployed();

    // Watch the emitted event ForSale()
    var event = supplyChain.ForSale();
    await event.watch((err, res) => {
      eventEmitted = true;
    });

    // Mark an item as ForSale by calling function sellItem()
    await supplyChain.sellItem(upc, productPrice);

    // Retrieve the just now saved item from blockchain by calling function fetchItem()
    const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

    // Verify the result set
    console.log('State', ':	SELL ITEM ', resultBufferTwo[5].toNumber());
    assert.equal(resultBufferTwo[5].toNumber(), 3, 'Error: Invalid item State');

    console.log('product Price', ':	', resultBufferTwo[4].toNumber());
    assert.equal(
      resultBufferTwo[4].toNumber(),
      productPrice,
      'Error: Invalid item productPrice'
    );

    console.log('emitted', ':	', eventEmitted);
    assert.equal(eventEmitted, true, 'Invalid event emitted');
  });
  // */

  // 5th Test BUY ITEM
  // /*
  it('Testing smart contract function buyItem() that allows a distributor to buy coffee', async () => {
    // Declare and Initialize a variable for event
    const supplyChain = await SupplyChain.deployed();

    // Watch the emitted event Sold()
    var event = supplyChain.Sold();
    await event.watch((err, res) => {
      eventEmitted = true;
    });

    // Mark an item as Sold by calling function buyItem()
    await supplyChain.buyItem(upc, productPrice, {
      from: distributorID,
      value: productPrice
    });

    // Retrieve the just now saved item from blockchain by calling function fetchItem()
    const fetchMsg = await supplyChain.fetchMsg.call(upc);
    const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
    const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

    console.log('msg.sender', ':	', fetchMsg[0]);
    console.log('msg.value', ':	', fetchMsg[1].toNumber());

    // console.log('paidValue ', ':	', resultBufferTwo[9].toNumber());

    // Verify the result set

    console.log('State', ':	BUY ITEM ', resultBufferTwo[5].toNumber());
    assert.equal(resultBufferTwo[5].toNumber(), 4, 'Error: Invalid item State');

    console.log('ownerID ', ':	', resultBufferOne[2]);
    assert.equal(
      resultBufferOne[2],
      distributorID,
      'Error: Invalid item ownerID'
    );

    console.log('distributorID ', ':	', resultBufferTwo[6]);
    assert.equal(
      resultBufferTwo[6],
      distributorID,
      'Error: Invalid item distributorID'
    );

    console.log('emitted', ':	', eventEmitted);
    assert.equal(eventEmitted, true, 'Invalid event emitted');
  });
  // */

  // 6th Test
  /*  it("Testing smart contract function shipItem() that allows a distributor to ship coffee", async() => {
        const supplyChain = await SupplyChain.deployed()
        
        // Declare and Initialize a variable for event
        
        
        // Watch the emitted event Shipped()
        

        // Mark an item as Sold by calling function buyItem()
        

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        

        // Verify the result set
              
    })    */

  // 7th Test
  /*  it("Testing smart contract function receiveItem() that allows a retailer to mark coffee received", async() => {
        const supplyChain = await SupplyChain.deployed()
        
        // Declare and Initialize a variable for event
        
        
        // Watch the emitted event Received()
        

        // Mark an item as Sold by calling function buyItem()
        

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        

        // Verify the result set
             
    }) */

  // 8th Test
  /* it("Testing smart contract function purchaseItem() that allows a consumer to purchase coffee", async() => {
        const supplyChain = await SupplyChain.deployed()
        
        // Declare and Initialize a variable for event
        
        
        // Watch the emitted event Purchased()
        

        // Mark an item as Sold by calling function buyItem()
        

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        

        // Verify the result set
        
    })  */

  // 9th Test
  /* it("Testing smart contract function fetchItemBufferOne() that allows anyone to fetch item details from blockchain", async() => {
        const supplyChain = await SupplyChain.deployed()

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        
        
        // Verify the result set:
        
    }) */

  // 10th Test
  /*  it("Testing smart contract function fetchItemBufferTwo() that allows anyone to fetch item details from blockchain", async() => {
        const supplyChain = await SupplyChain.deployed()

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        
        
        // Verify the result set:
        
    }) */
});
