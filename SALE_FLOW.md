# XREDCoin Initial Sale flow

#### 1. Deploy sale – 1 847 106 gas
XRED token sale will be deployed 1 week prior to the beginning of the sale with the following parameters:

- Initial block: TBC
- Final block: Initial block + 120 960 (6 weeks) - 30 sec each new block, then 24hrs = 2 880 blocks, 1 week = 20 160, 6 weeks = 120 960 blocks
- XRED Dev Multisig: TBC (2/3 confirms multisig with CEO, CTO, Security key that can only be reconstructed by CTO and CEO).
- Community Multisig: TBC (2/3 confirms with XRED Dev Multisig + 2 trusted members of community)
- Initial price: 375
- Final price: 300
- Price stages: 5
- Cap commitment: sealed commitment for the soft hidden cap.

#### 2. sale.setXREDCoin() – 154 214 gas
Set XREDCoin needs to be called from the XRED Multisig. Its parameters are:

- XREDCoin token address: An empty deployed instance of XREDCoin.
- XREDCoinPlaceholder: A network placeholder with references to the Sale and XREDCoin.
- Sale wallet: A contract that holds sale funds until final block.

XRED Dev will perform setXREDCoin inmediately after deploying the sale so it is instantiated as soon as possible.

After deployXREDCoin has been called, the sale contract will have two public addresses available:

- token: The address of the official MiniMe ERC20 compatible XRED Network Token.
- networkPlaceholder: The placeholder for the XRED Network until its deployment.

The sale will be the token controller during the sale. After the sale it will be the network placeholder.

XRED Dev will at this point prove the source code of the contracts in blockchain explorers.

### Presale

The presale is the period between full sale instantiation to the initialBlock of the sale.

During the presale it is required that the sale is activated, failing to activate the sale during this period, will cause the sale to never start.

#### 3. sale.allocatePresaleTokens() – 319 458 gas

XRED dev will be able to allocate at its own discretion as many presale tokens as needed before the sale is activated.

XRED dev will only issue presale tokens to presale partners that took part in a private sale done for gathering the funds needed for the sale.

Presale tokens have cliff and vesting for avoiding market dumps.

#### 4. sale.activateSale() – 2 * 95 702 gas

Both XRED Dev and the Community Multisig must call activateSale in order to consider the sale activated.

When both multisigs have called this function, the sale will be activated and no more presale allocations will be allowed.

### Sale

If the presale is successful in activating the sale, the sale will start on the initial block.

#### 5. Buy tokens sale.fallback || token.fallback – 000 000 gas || 000 000 gas

After the sale is started, sending an ether amount greater than the dust value (1 finney) will result in tokens getting minted and assigned to the sender of the payment.

All the funds collected will be instantly sent to the XRED Dev multisig for security.

Disclaimer: Please do not send from exchanges.

#### 6. sale.revealCap()

During the sale, XRED can reveal the hidden cap and cap secret resulting in the hard cap of the contract being modified by this new cap.

In case the cap is revealed and the sale contract has already raised an amount higher than the cap, the sale is automatically finalized.

#### 7. sale.emergencyStopSale() – 43 864 gas

After the sale is activated, XRED Dev will be able to stop the sale for an emergency.

#### 8. sale.restartSale() – 43 864 gas

After the sale has been stopped for an emergency and the sale is still ongoing, XRED Dev will be able to restart it.

After the sale has ended, it cannot be restarted. The sale can end in a stopped state without any problem.

### After sale

The after sale period is considered from the final block (inclusive) until the sale contract is destroyed.

#### 9. sale.finalizeSale() – 164 393 gas

This method will mint an additional 7/43 of tokens so at the end of the sale XRED Dev will own 14% of all the XREDCoin supply. 12% purchased by owners, 2% on bounty program.

In the process of doing so, it will make the XREDCoinPlaceholder the controller of the token contract. Which will make the token supply be constant until the network is deployed and it implements a new minting policy.

#### 10. sale.deployNetwork() – 22 338 gas

After the sale is finalized, the community multisig will be able to provide the address of new XRED controller.

The XREDCoinPlaceholder will transfer its Token Controller power and it will be able to mint further tokens if the network governance decides so.

### Dividends

#### 11. xredcoins.enableTransfers() – 80 977 gas (in one direction)

To prevent repeated claiming of dividends the transfer period of claiming will be suspended.
After the period of claiming dividends has ended, the availability of token transferring will be enabled.

#### 12. xredcoins.depositDividend() – 160 099 gas

XRED Network controller can send amount ETH as dividends on account XREDCoin with an aim of distributing.

#### 13. xredcoins.claimDividendAll() – 136 956 gas

Each token holder can claim a portion of dividends in accordance with an amount of holding.

### Token operations

#### transfer – 143 023 gas

### Example

Example of a successful testnet sale:

Initial parameters for Kovan network

https://kovan.etherscan.io/address/0x753dc527f5e20b1ad871be84f1a8afe915793d9a - XREDMs
https://kovan.etherscan.io/address/0xb775c9ddf0bddb636ac4b0e1698d09d25f0d3c03 - communityMs
https://kovan.etherscan.io/address/0xdeb92871b374ea477a6de45fbbc8db3181db7a55 - TokenSale
https://kovan.etherscan.io/address/0x35a703c21310cdc73600e835dce285b9badbadee - XREDCoin
https://kovan.etherscan.io/address/0x75b687e4a62c975bf2de1c40e515eeb112f79513 - SafeWallet
https://kovan.etherscan.io/address/0x6ec099f6cda14752b5a8bf613c9eed35801025f7 - Placeholder

Start from 17.10.17 5AM (UTC) the end 19.10.17 APM (UTC)

## Kovan deployed log

```
Using network 'kovan'.

Running migration: 1_initial_migration.js
  Deploying Migrations...
  ... 0x842950d3be9ece9894fae48ea9277444dea77bfcc3534c930eae3f9bacda4b19
  Migrations: 0x86284987a7330952be23b843215e9c4d11e1072f
Saving successful migration to network...
  ... 0x12b6f2649abe20ce66279cb45e5aef4ef7cf7ebdf91a5044b38ed865e5a732e6
Saving artifacts...
Running migration: 2_deploy_sale.js
  Deploying MiniMeTokenFactory...
  ... 0xb90a68a4a8d4e84c789ae6b5d76b5c368a92c5401ef6dbb4abf908b763fb8ccf
  MiniMeTokenFactory: 0x4181c2413c10a4ed6a449a23b5c4ea8258963c77
  Deploying XREDTokenSale...
  ... 0x97a2d886621cd541233ff7662560e9c82422eab4040b7b7f90325df2242ed9c3
  XREDTokenSale: 0xdeb92871b374ea477a6de45fbbc8db3181db7a55
  ... 0x49eae95856525e6925022d7762c8ab5802002527cb705a44c0b31fd17a9a41da
XREDCoin: 0x35a703c21310cdc73600e835dce285b9badbadee
  ... 0x9d545d1c54f7e2c799b6f67e8b9004a0b3034434eeb5b07050623d0cc04e8014
  ... 0x16c1b0ebfb1e1c9609d1b006750f0c4c2f3f2a33488b84d9a10abe15e4f23ee4
  ... 0xce59b232575aa37c59219f57e0f058136b53cf5a2ac251120dd9bf098c6ec7de
  ... 0x458a9e3382a583cf017def738e628cd4e907082315c575d374c61ea1edebc16c
Placeholder: 0x6ec099f6cda14752b5a8bf613c9eed35801025f7
  ... 0xcb3bbc180e0ca498442426abc5293aedf288f09f5d2a81ee8bd68fdadcb21f8c
Wallet: 0x75b687e4a62c975bf2de1c40e515eeb112f79513
setXREDCoin as: 0x35a703c21310cdc73600e835dce285b9badbadee - 0x6ec099f6cda14752b5a8bf613c9eed35801025f7 - 0x75b687e4a62c975bf2de1c40e515eeb112f79513
  ... 0xa5ef16c1a20fec179877b7e5f48c29650b55da6089d3bc7d213a37a9e3ab4c06
Saving successful migration to network...
  ... 0x5fcd30371c48d926f8ae614213b5f1ffb08880cbe74eeb279b0fc6b5e88f97f7
Saving artifacts...
```
