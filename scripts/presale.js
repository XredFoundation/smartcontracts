var XREDTokenSale = artifacts.require("XREDTokenSale");
var MultiSigWallet = artifacts.require("MultiSigWallet");
var moment = require('moment')
var async = require('async')

const contributors = [
  { address: '0xBC96c4188072fcb667eaad13Cc28D611d3c2C60F', usd: 1800 },
  { address: '0x2Ff6FeD4624513937Caff669e7F354B9dc40ECc9', usd: 10000 }
]

const DevMultisig = '0x753dc527f5e20b1ad871be84f1a8afe915793d9a'
const saleAddress = '0xdeb92871b374ea477a6de45fbbc8db3181db7a55'

const now = +new Date() / 1000
const month = 30 * 24 * 3600

const cliff = now + 3 * month
const vesting = now + 6 * month

const calculateXREDCoin = usd => 1.4 * usd // 40% bonus
const formatDate = x => moment(1000 * x).format('MMMM Do YYYY, h:mm:ss a')

module.exports = function (callback) {
  const sale = XREDTokenSale.at(saleAddress);

  async.eachSeries(contributors, ({ address, usd }, cb) => {
    const XREDCoinAmount = calculateXREDCoin(usd);
    const wXREDCoinAmount = web3.toWei(XREDCoinAmount);

    const tx = sale.allocatePresaleTokens.request(
      address,
      wXREDCoinAmount,
      cliff,
      vesting
    )

    const data = tx.params[0].data;

    console.log(`Assigning ${address} ${XREDCoinAmount} XREDCoin (${wXREDCoinAmount} Weys). Cliff ${formatDate(cliff)} (${cliff}) Vesting ${formatDate(vesting)} (${vesting})\n${data}`);

    return MultiSigWallet
          .at(DevMultisig)
          .submitTransaction(saleAddress, 0, data, { gas: 9e5 })
          .then(() => { console.log('tx submitted yay'); cb() })
          .catch(e => { console.log('stopping operation'); callback() })
  }, callback);
}
