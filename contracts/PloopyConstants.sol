// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import './interfaces/IVault.sol';
import { IPloopy, ICERC20, IGlpDepositor, IRewardRouterV2, IPriceOracleProxyETH } from './interfaces/Interfaces.sol';

contract PloopyConstants {
  IVault internal constant BALANCER_VAULT = IVault(0xBA12222222228d8Ba445958a75a0704d566BF2C8);
  IERC20 internal constant USDC = IERC20(0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8);
  IERC20 internal constant PLVGLP = IERC20(0x5326E71Ff593Ecc2CF7AcaE5Fe57582D6e74CFF1);

  // GMX
  IERC20 internal constant sGLP = IERC20(0x2F546AD4eDD93B956C8999Be404cdCAFde3E89AE);
  IRewardRouterV2 internal constant REWARD_ROUTER_V2 =
    IRewardRouterV2(0xB95DB5B167D75e6d04227CfFFA61069348d271F5);

  // PLUTUS
  IGlpDepositor internal constant GLP_DEPOSITOR =
    IGlpDepositor(0x13F0D29b5B83654A200E4540066713d50547606E);

  // LODESTAR
  ICERC20 internal constant lUSDC = ICERC20(0xeF25968ECC2f13b6272a37312a409D429DEF70AB);
  ICERC20 internal constant lPLVGLP = ICERC20(0xDFD276A2460eDb150DE2622f2D947EEa21C3EE48);
  IPriceOracleProxyETH internal constant PRICE_ORACLE =
    IPriceOracleProxyETH(0xcC3D0d211dF6157cb94b5AaCfD55D41acd3a9A7A);

  uint256 public constant DIVISOR = 1e4;
  uint16 public constant MAX_LEVERAGE = 30_000; // in {DIVISOR} terms. E.g. 30_000 = 3.0;
}
