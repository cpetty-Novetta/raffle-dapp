# raffle-dapp
Tech Talk Raffle Dapp

# The ethereum truffle environment is in the `/imports/smart-contracts/` directory. 
If you're running the ethereumjs-testrpc, then you need to cd into that directory and `truffle migrate --reset` to deploy the contracts and create the new artifacts so that truffle-contract can find them.  If you're using a private node on geth/parity/etc then the contracts will persist, as well as ropsten or the main net.  

# The Raffle contract instantiated through truffle-contract on the client side
It is made globally available in the `/imports/startup/ethereum-contract-startup.js`, for some reason truffle-contract doesn't work on the server side, only the client side, so web3 is instantiated on the server side and used. 

# TODO 
- work on including Redux to deal with global state
- figure out how to properly deal with async ethereum calls
- figure out how to pass around the user info as props instead of pulling from Meteor.users
