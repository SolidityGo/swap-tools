const { ethers } = require("hardhat")
const BSC_TOKENS = {
  busd: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
  usdt: "0x55d398326f99059fF775485246999027B3197955",
  wrappedNative: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  stableCoin: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
  eth: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
  wbnb: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  cake: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
}
const unit = ethers.constants.WeiPerEther

module.exports = {
  BSC_TOKENS,
  unit,
}
