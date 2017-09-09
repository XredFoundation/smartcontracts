# XRED Contracts

## Dependencies
We use Truffle in order to compile and test the contracts.

It can be installed:
`npm install -g truffle`

For more information visit https://truffle.readthedocs.io/en/latest/

Also running node with active json-rpc is required. For testing puproses we suggest using https://github.com/ethereumjs/testrpc
## Usage

`parity account new --chain ./test/privatenet/Parity.json --keys-path ./test/privatenet/keys` - add new account

`truffle compile` - compile all contracts

`truffle test` - run tests
