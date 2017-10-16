var XREDTokenSale = artifacts.require("XREDTokenSale");
var MiniMeTokenFactory = artifacts.require("MiniMeTokenFactory");
var XREDCoinPlaceholder = artifacts.require("XREDCoinPlaceholder");
var XREDCoin = artifacts.require("XREDCoin");
var SaleWallet = artifacts.require("SaleWallet");

module.exports = function(deployer, network, accounts) {

  const initialBlock = 4336715;
  const finalBlock   = 4394315;
  const initialPrice = 396;
  const finalPrice   = 330;
  const priceStages  = 5;

  const XREDMs        = '0x753dc527f5e20b1ad871be84f1a8afe915793d9a'
  const communityMs   = '0xb775c9ddf0bddb636ac4b0e1698d09d25f0d3c03';
  const capCommitment = '0x7724218ab30f2cbc153d88e33f22e4d7e52309dd3cc597c83ad644f2efa8ff5a'; //Solidity sha3

  deployer.deploy(MiniMeTokenFactory);
  deployer.deploy(
    XREDTokenSale,
    initialBlock,
    finalBlock,
    XREDMs,
    communityMs,
    initialPrice,
    finalPrice,
    priceStages,
    capCommitment)
    .then(() => {
      return MiniMeTokenFactory.deployed()
        .then(f => {
          factory = f
          return XREDTokenSale.deployed()
        })
        .then(s => {
          sale = s
          return XREDCoin.new(factory.address)
        }).then(a => {
          XREDCoin = a
          console.log('XREDCoin:', XREDCoin.address)
          return XREDCoin.changeController(sale.address)
        })
        .then(() => {
          return XREDCoin.setCanCreateGrants(sale.address, true)
        })
        .then(() => {
          return XREDCoin.changeVestingWhitelister(XREDMs)
        })
        .then(() => {
          return XREDCoinPlaceholder.new(sale.address, XREDCoin.address)
        })
        .then(n => {
          networkPlaceholder = n
          console.log('Placeholder:', networkPlaceholder.address)
          return SaleWallet.new(XREDMs, finalBlock, sale.address)
        })
        .then(wallet => {
          console.log('Wallet:', wallet.address)
          console.log("setXREDCoin as: " + XREDCoin.address + " - " + networkPlaceholder.address + " - " + wallet.address);
          return sale.setXREDCoin(XREDCoin.address, networkPlaceholder.address, wallet.address);
        })
    })
};
