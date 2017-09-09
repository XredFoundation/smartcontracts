var XREDTokenSale = artifacts.require("XREDTokenSale");
var MultiSigWallet = artifacts.require("MultiSigWallet");
var moment = require('moment')
var async = require('async')

const contributors = [
  { address: '0x89d0a9ad9658b487f3a7948bea5443dbe858fb51', usd: 10000 },
  { address: '0x060dee6c0141830e2874ca216a362a3a90dcec3e', usd: 40000 },
  { address: '0xbe6b7c55576ed40ac93213a49979ccefacf07bd6', usd: 40000 },
  { address: '0x24d7991cb37cdf6178fe6970347a2789a2e22b47', usd: 10000 },
  { address: '0x0bfe3facfdb1cf548fd6d43c1c9e21488a508608', usd: 10000 },
]

const ethPrice = 300
const DevMultisig = '0x89d0a9ad9658b487f3a7948bea5443dbe858fb51'
const saleAddress = '0x1320c5b40f32121cc2411f96af0009f35c373437'
const multisigAddress = '0xbe6b7c55576ed40ac93213a49979ccefacf07bd6'

const now = +new Date() / 1000
const month = 30 * 24 * 3600

const cliff = now + 3 * month
const vesting = now + 6 * month

const calculateXREDCoin = usd => 1.4 * usd / ethPrice // 40% bonus
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
      .at(multisigAddress)
      .submitTransaction(saleAddress, 0, data, { gas: 3e5, from: DevMultisig })
      .then(() => { console.log('tx submitted yay'); cb() })
      .catch(e => { console.log('stopping operation'); callback() })
  }, callback);
}
