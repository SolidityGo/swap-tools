import {UniswapV2Router02} from "../../typechain-types";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import {formatEther} from "ethers/lib/utils";
import {BigNumber, ContractReceipt, ContractTransaction} from "ethers";
const { ethers } = require('hardhat')
const { sleep } = require('../utils/util')
const log = console.log.bind(console)
const unit: BigNumber = ethers.constants.WeiPerEther

// BSC
// pancake
const PancakeRouterAddress = '0x10ed43c718714eb63d5aa57b78b54704e256024e'
const WBNBAddress = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'

// config
const IntervalSeconds = 10
// example
// TODO !!!! modify buyBNBAmount to the amount you want to pay for buying targetToken
const buyBNBAmount = unit.mul(1).div(100)   // example. use 0.01 BNB
// TODO !!!! modify acceptedReceivedTargetAmount to the target token amount you want to buy
const acceptedReceivedTargetAmount = unit.mul(3)   // example.  !! only accept bought target token amount >= 3, otherwise failed tx
// TODO !!!! modify targetTokenAddress to the address you want to buy
const targetTokenAddress = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56'  // example.  this is BUSD

let router: UniswapV2Router02, operator: SignerWithAddress

// should approve before swap
const buyToken = async (amountIn: BigNumber, amountOutMin: BigNumber) => {
    const path = [WBNBAddress, targetTokenAddress]
    const receiver = operator.address
    log(`--------BUY TARGET by paying BNB`, receiver)
    log(toHuman(amountIn), toHuman(amountOutMin), path, receiver)
    await waitTx(router.swapExactETHForTokens(
        amountOutMin,
        path,
        receiver,
        deadline(),
        {
          value: amountIn,
          gasPrice: 10 * 1e9,
          gasLimit: 1000000,
        }
    ))
    log('SWAP SUCCESS !')
}

const init = async () => {
    let signers = await ethers.getSigners()
    operator = signers[0]
    router = await ethers.getContractAt('UniswapV2Router02', PancakeRouterAddress) as UniswapV2Router02
}

const main = async () => {
    await init()
    while (true) {
        try {
            await buyToken(buyBNBAmount, acceptedReceivedTargetAmount)
            break
        } catch (e) {
            const msg = `----error: ${e}, restart after ${IntervalSeconds}s`
            // await sendToTg(msg)
            log(msg)
            await sleep(IntervalSeconds)
        }
    }
}

function deadline() {
    // 30 minutes
    return Math.floor(new Date().getTime() / 1000) + 1800;
}

export const toHuman = (x: BigNumber, fractionDigits = 2) => {
  return formatEther(x)
}

export async function waitTx(txRequest: Promise<ContractTransaction>): Promise<ContractReceipt> {
  const txResponse = await txRequest
  return await txResponse.wait(1)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
