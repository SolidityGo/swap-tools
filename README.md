# swap-tools

0. yarn install
1. mv .env.example .env
2. input your secret key on .env for `BSC_TEST_SK`
3. make sure the address corresponding to `BSC_TEST_SK` have some BNB(>= 0.02)
4. set swap config in './scripts/QuickSwap/1-buy-target-use-bnb-on-pancake.ts'
```javascript
    // TODO !!!! modify buyBNBAmount to the amount you want to pay for buying targetToken
    buyBNBAmount = unit.mul(1).div(100)   // example. use 0.01 BNB

    // TODO !!!! modify acceptedReceivedTargetAmount to the target token amount you want to buy
    const acceptedReceivedTargetAmount = unit.mul(3)   // example.  !! only accept bought target token amount >= 3, otherwise failed tx
    
    // TODO !!!! modify targetTokenAddress to the address you want to buy
    const targetTokenAddress = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56'  // example.  this is BUSD
```

5. npx hardhat run scripts/QuickSwap/1-buy-target-use-bnb-on-pancake.ts --network bsc
