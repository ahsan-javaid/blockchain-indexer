const { ethers } = require("ethers");
const provider = new ethers.providers.JsonRpcProvider('https://eth-goerli.public.blastapi.io');

const main = async () => {
  let n = await provider.getBlockNumber();

  provider.getBlockWithTransactions(n).then(function (data) {
    console.log(data.transactions[0].gasPrice.toBigInt());
  });
}

main();
