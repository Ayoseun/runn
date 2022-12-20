const { Alchemy, Network, Wallet, Utils } = require( "alchemy-sdk");
//import dotenv from "dotenv";

//dotenv.config();
//const { APIKEY, PRIVATE_KEY } 
//process.env;

const settings = {
  apiKey: 'u2BAYrPLhxkHb7O9AE2mqr3snCXhDB63',
  network: Network.MATIC_MAINNET, // Replace with your network.
};
const alchemy = new Alchemy(settings);

let wallet = new Wallet('0xf112b7528e80ee1f1dac12893254997c8f597649ba229969f3a2002f227fb369');

const nonce = await alchemy.core.getTransactionCount(wallet.address, "latest");

let exampleTx = {
  to: "0xd16BC1503ae58dF0FA52e544d83d4962B502Fe95",
  value: 0.006,
  gasLimit: "21000",
  maxFeePerGas: Utils.parseUnits('150', 'gwei'),
  nonce: nonce,
  type: 2,
  chainId: 137,
};

let rawTransaction = await wallet.signTransaction(exampleTx);

const signedTx = await alchemy.transact.sendPrivateTransaction(
  rawTransaction,
  (await alchemy.core.getBlockNumber()) + 1
);

console.log(signedTx);
