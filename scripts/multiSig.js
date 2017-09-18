var MultiSigWallet = artifacts.require("MultiSigWallet");
var moment = require('moment')
var async = require('async')

const owners = [
  { address: '0xBC96c4188072fcb667eaad13Cc28D611d3c2C60F'}
]

const multisigAddress = '0x022301D3D1b4Fce73353fD0bA0aD6d7E3205A111'
const mainOwner       = '0x0bFe3FAcFdb1cF548fD6d43C1C9E21488a508608';

module.exports = function (callback) {

  async.eachSeries(owners, ({ address }, cb) => {
    const tx = MultiSigWallet.at(multisigAddress).addOwner.request(address);

    const data = tx.params[0].data;

    console.log(`Add as owner ${address}\n${data}`);

    return MultiSigWallet.at(multisigAddress)
           .submitTransaction(multisigAddress, 0, data, { gas: 3e5, from: mainOwner })
           .then(() => { console.log('tx submitted yay'); cb() })
           .catch(e => { console.log('stopping operation'); callback() })
  }, callback);
}
