# Loopy Description

## As a user:

- deposit USDC, USDT, DAI, ARB, WBTC, FRAX or plvGLP
- 1 click loop using the underlying (or USDC in the case of plvGLP) up to 1 < desired leverage amount < 3

## Contract description

1. start with `x` token, with desired leverage amount `y` where `10000 < y <= 30000`
2. flashloan `z` token, where `z = (y - 10000) * x` from balancerV2 vault
3a. if using plvGLP, mint plvGLP using USDC
3b. mint lToken using borrowed token through lodestar
5. transfer lToken to user
6. call `lToken.borrowFor` to borrow `z` token
7. transfer `z` token from user to balancer vault, paying back flashloan

## Contract inputs

- IERC20 `_token`: The token you wish to loop
- uint256 `_amount`: The amount you wish to leverage
- uint16 `_leverage`: The amount at which you wish to leverage up to (10000, 20000, 30000 = 1, 2, 3)
- uint16 `_useWalletBalance`: A flag used to indicate whether the user wishes to use their wallet balance (1) or not (0)

### Approvals

User needs to action approvals:

1. Approve Loopy to spend at least `_amount` plvGLP, for looping
2. Approve Loopy to spend at least `z` USDC, to repay flash loan
3. Approve Loopy to spend at least the lToken amount they with to leverage to.
