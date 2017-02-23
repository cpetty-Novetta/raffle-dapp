var address = '0xa096aff0C7463af7262b0ad39E895701F4d1A423'

web3.eth.sendTransaction({
    from: web3.eth.coinbase,
    to: address,
    value: web3.toWei(1,'ether')
});

// web3.eth.getBalance(address, function(err, balance) {
//     console.log(balance);
// });
