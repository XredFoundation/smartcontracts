/**
 * Use this file to generate wallet on kovan (or another) INFURA infrastructure
 **/

/*
var bip39 = require("bip39");
var hdkey = require('ethereumjs-wallet/hdkey');
var ProviderEngine = require("web3-provider-engine");
var WalletSubprovider = require('web3-provider-engine/subproviders/wallet.js');
var Web3Subprovider = require("web3-provider-engine/subproviders/web3.js");
var Web3 = require("web3");

// Get our mnemonic and create an hdwallet
const mnemonic = process.env.TEST_MNETONIC || 'wallet wallet wallet wallet wallet wallet wallet wallet wallet wallet wallet wallet';
var hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));

// Get the first account using the standard hd path.
var wallet_hdpath = "m/44'/60'/0'/0/";
var wallet = hdwallet.derivePath(wallet_hdpath + "0").getWallet();
var address = "0x" + wallet.getAddress().toString("hex");

var providerUrl = "https://kovan.infura.io";
var ropstenProvider = new ProviderEngine();
ropstenProvider.addProvider(new WalletSubprovider(wallet, {}));
ropstenProvider.addProvider(new Web3Subprovider(new Web3.providers.HttpProvider(providerUrl)));
ropstenProvider.start(); // Required by the provider engine.

console.log(address);
*/
