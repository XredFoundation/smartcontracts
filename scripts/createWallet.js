require('babel-register');
require('babel-polyfill');

var bip39 = require("bip39");
var hdkey = require('ethereumjs-wallet/hdkey');

const mnemonic = process.env.MNEMONIC || 'wallet wallet wallet wallet wallet wallet wallet wallet wallet wallet wallet wallet';
const hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));
const address_index = process.env.INDEX || 0;
const wallet_hdpath = "m/44'/60'/0'/0/";
const wallet = hdwallet.derivePath(wallet_hdpath + address_index).getWallet();
const address = "0x" + wallet.getAddress().toString("hex");
const privateKey = wallet.getPrivateKey().toString("hex");
const publicKey = wallet.getPublicKey().toString("hex");

console.log("mnemonic: " + mnemonic, "address: " + address, "privateKey: " + privateKey, "publicKey:" + publicKey);
