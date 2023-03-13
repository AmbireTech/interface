/* eslint-disable import/no-unused-modules */
import { FACTORY_ADDRESS as V2_FACTORY_ADDRESS } from '@uniswap/v2-sdk'
import { FACTORY_ADDRESS as V3_FACTORY_ADDRESS } from '@uniswap/v3-sdk'
import { SupportedChainId } from 'constants/chains'

import { constructSameAddressMap } from '../utils/constructSameAddressMap'

type AddressMap = { [chainId: number]: string }

export const UNI_ADDRESS: AddressMap = constructSameAddressMap('0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984')

// other addresses
const BINANCE_ROUTER_ADDRESS = '0x10ED43C718714eb63d5aA57B78B54704E256024E'
const MOONBEAM_ROUTER_ADDRESS = '0x96b244391D98B62D19aE89b1A4dCcf0fc56970C7'
const ANDROMEDA_ROUTER_ADDRESS = '0x1E876cCe41B7b844FDe09E38Fa1cf00f213bFf56'
const SUSHI_ROUTER_ADDRESS = '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506'
const KUCOIN_ROUTER_ADDRESS = '0xA58350d6dEE8441aa42754346860E3545cc83cdA'

export const V2_FACTORY_ADDRESSES: AddressMap = {
  ...constructSameAddressMap(V2_FACTORY_ADDRESS),
  [SupportedChainId.AVALANCHE]: '0x9Ad6C38BE94206cA50bb0d90783181662f0Cfa10', // JoeFactory (https://docs.traderjoexyz.com/en/security-and-contracts/contracts)
  [SupportedChainId.BINANCE]: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73', // PancakeFactory (https://docs.pancakeswap.finance/code/smart-contracts/pancakeswap-exchange/router-v2)
  [SupportedChainId.MOONBEAM]: '0x985BcA32293A7A496300a48081947321177a86FD', // BeamSwapFactory (https://docs.beamswap.io/contracts/beamswap-contracts
  [SupportedChainId.MOONRIVER]: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4', // SushiSwapFactory (https://docs.sushi.com/docs/Developers/Deployment%20Addresses)
  [SupportedChainId.FANTOM]: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4', // SushiSwapFactory (https://docs.sushi.com/docs/Developers/Deployment%20Addresses)
  [SupportedChainId.ANDROMEDA]: '0x70f51d68D16e8f9e418441280342BD43AC9Dff9f', // NetSwapFactory (https://docs.netswap.io/developer/smart-contracts)
  [SupportedChainId.GNOSIS]: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4', // SushiSwapFactory (https://docs.sushi.com/docs/Developers/Deployment%20Addresses)
  [SupportedChainId.KUCOIN]: '0xAE46cBBCDFBa3bE0F02F463Ec5486eBB4e2e65Ae', // KuCoinFinanceFactory (https://docs.kuswap.finance/protocol/building-on-kuswap)
}

export const V2_ROUTER_ADDRESS: AddressMap = {
  ...constructSameAddressMap('0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'),
  [SupportedChainId.AVALANCHE]: '0x60aE616a2155Ee3d9A68541Ba4544862310933d4', // JoeRouter (https://docs.traderjoexyz.com/en/security-and-contracts/contracts)
  [SupportedChainId.BINANCE]: BINANCE_ROUTER_ADDRESS, // PancakeRouter (https://docs.pancakeswap.finance/code/smart-contracts/pancakeswap-exchange/router-v2)
  [SupportedChainId.MOONRIVER]: SUSHI_ROUTER_ADDRESS, // SushiSwapRouter (https://docs.sushi.com/docs/Developers/Deployment%20Addresses)
  [SupportedChainId.MOONBEAM]: MOONBEAM_ROUTER_ADDRESS, // BeamSwapRouter (https://docs.beamswap.io/contracts/beamswap-contracts
  [SupportedChainId.FANTOM]: SUSHI_ROUTER_ADDRESS, // SushiSwapRouter (https://docs.sushi.com/docs/Developers/Deployment%20Addresses)
  [SupportedChainId.ANDROMEDA]: ANDROMEDA_ROUTER_ADDRESS, // NetSwapRouter (https://docs.netswap.io/developer/smart-contracts)
  [SupportedChainId.KUCOIN]: KUCOIN_ROUTER_ADDRESS, // KuCoinFinanceRouter (https://docs.kuswap.finance/protocol/building-on-kuswap)
  [SupportedChainId.GNOSIS]: SUSHI_ROUTER_ADDRESS, // SushiSwapFactory (https://docs.sushi.com/docs/Developers/Deployment%20Addresses)
}
export const UNISWAP_NFT_AIRDROP_CLAIM_ADDRESS = '0x8B799381ac40b838BBA4131ffB26197C432AFe78'

// export const V2_FACTORY_ADDRESSES: AddressMap = constructSameAddressMap(V2_FACTORY_ADDRESS)
// export const V2_ROUTER_ADDRESS: AddressMap = constructSameAddressMap('0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D')

// celo v3 addresses
const CELO_V3_CORE_FACTORY_ADDRESSES = '0xAfE208a311B21f13EF87E33A90049fC17A7acDEc'
const CELO_V3_MIGRATOR_ADDRESSES = '0x3cFd4d48EDfDCC53D3f173F596f621064614C582'
const CELO_MULTICALL_ADDRESS = '0x633987602DE5C4F337e3DbF265303A1080324204'
const CUSTOM_CHAINS_MULTICALL_ADDRESS = '0xCAE1F94F6fCF3777A73aBC6850BaE16d0DBBCc3c'
const CELO_QUOTER_ADDRESSES = '0x82825d0554fA07f7FC52Ab63c961F330fdEFa8E8'
const CELO_NONFUNGIBLE_POSITION_MANAGER_ADDRESSES = '0x3d79EdAaBC0EaB6F08ED885C05Fc0B014290D95A'
const CELO_TICK_LENS_ADDRESSES = '0x5f115D9113F88e0a0Db1b5033D90D4a9690AcD3D'

// optimism goerli addresses
const OPTIMISM_GOERLI_V3_CORE_FACTORY_ADDRESSES = '0xB656dA17129e7EB733A557f4EBc57B76CFbB5d10'
const OPTIMISM_GOERLI_V3_MIGRATOR_ADDRESSES = '0xf6c55fBe84B1C8c3283533c53F51bC32F5C7Aba8'
const OPTIMISM_GOERLI_MULTICALL_ADDRESS = '0x07F2D8a2a02251B62af965f22fC4744A5f96BCCd'
const OPTIMISM_GOERLI_QUOTER_ADDRESSES = '0x9569CbA925c8ca2248772A9A4976A516743A246F'
const OPTIMISM_GOERLI_NONFUNGIBLE_POSITION_MANAGER_ADDRESSES = '0x39Ca85Af2F383190cBf7d7c41ED9202D27426EF6'
const OPTIMISM_GOERLI_TICK_LENS_ADDRESSES = '0xe6140Bd164b63E8BfCfc40D5dF952f83e171758e'

// arbitrum goerli v3 addresses
const ARBITRUM_GOERLI_V3_CORE_FACTORY_ADDRESSES = '0x4893376342d5D7b3e31d4184c08b265e5aB2A3f6'
const ARBITRUM_GOERLI_V3_MIGRATOR_ADDRESSES = '0xA815919D2584Ac3F76ea9CB62E6Fd40a43BCe0C3'
const ARBITRUM_GOERLI_MULTICALL_ADDRESS = '0x8260CB40247290317a4c062F3542622367F206Ee'
const ARBITRUM_GOERLI_QUOTER_ADDRESSES = '0x1dd92b83591781D0C6d98d07391eea4b9a6008FA'
const ARBITRUM_GOERLI_NONFUNGIBLE_POSITION_MANAGER_ADDRESSES = '0x622e4726a167799826d1E1D150b076A7725f5D81'
const ARBITRUM_GOERLI_TICK_LENS_ADDRESSES = '0xb52429333da969a0C79a60930a4Bf0020E5D1DE8'

/* V3 Contract Addresses */
export const V3_CORE_FACTORY_ADDRESSES: AddressMap = {
  ...constructSameAddressMap(V3_FACTORY_ADDRESS, [
    SupportedChainId.OPTIMISM,
    SupportedChainId.ARBITRUM_ONE,
    SupportedChainId.POLYGON_MUMBAI,
    SupportedChainId.POLYGON,
  ]),
  [SupportedChainId.CELO]: CELO_V3_CORE_FACTORY_ADDRESSES,
  [SupportedChainId.CELO_ALFAJORES]: CELO_V3_CORE_FACTORY_ADDRESSES,
  [SupportedChainId.OPTIMISM_GOERLI]: OPTIMISM_GOERLI_V3_CORE_FACTORY_ADDRESSES,
  [SupportedChainId.ARBITRUM_GOERLI]: ARBITRUM_GOERLI_V3_CORE_FACTORY_ADDRESSES,
}

export const V3_MIGRATOR_ADDRESSES: AddressMap = {
  ...constructSameAddressMap('0xA5644E29708357803b5A882D272c41cC0dF92B34', [
    SupportedChainId.ARBITRUM_ONE,
    SupportedChainId.POLYGON_MUMBAI,
    SupportedChainId.POLYGON,
  ]),
  [SupportedChainId.CELO]: CELO_V3_MIGRATOR_ADDRESSES,
  [SupportedChainId.CELO_ALFAJORES]: CELO_V3_MIGRATOR_ADDRESSES,
  [SupportedChainId.OPTIMISM_GOERLI]: OPTIMISM_GOERLI_V3_MIGRATOR_ADDRESSES,
  [SupportedChainId.ARBITRUM_GOERLI]: ARBITRUM_GOERLI_V3_MIGRATOR_ADDRESSES,
}

export const MULTICALL_ADDRESS: AddressMap = {
  ...constructSameAddressMap('0x1F98415757620B543A52E61c46B32eB19261F984', [
    SupportedChainId.OPTIMISM,
    SupportedChainId.POLYGON_MUMBAI,
    SupportedChainId.POLYGON,
  ]),
  [SupportedChainId.ARBITRUM_ONE]: '0xadF885960B47eA2CD9B55E6DAc6B42b7Cb2806dB',
  [SupportedChainId.CELO]: CELO_MULTICALL_ADDRESS,
  [SupportedChainId.CELO_ALFAJORES]: CELO_MULTICALL_ADDRESS,
  [SupportedChainId.AVALANCHE]: CUSTOM_CHAINS_MULTICALL_ADDRESS,
  [SupportedChainId.BINANCE]: CUSTOM_CHAINS_MULTICALL_ADDRESS,
  [SupportedChainId.MOONBEAM]: CUSTOM_CHAINS_MULTICALL_ADDRESS,
  [SupportedChainId.MOONRIVER]: CUSTOM_CHAINS_MULTICALL_ADDRESS,
  [SupportedChainId.FANTOM]: CUSTOM_CHAINS_MULTICALL_ADDRESS,
  [SupportedChainId.ANDROMEDA]: CUSTOM_CHAINS_MULTICALL_ADDRESS,
  [SupportedChainId.GNOSIS]: CUSTOM_CHAINS_MULTICALL_ADDRESS,
  [SupportedChainId.KUCOIN]: CUSTOM_CHAINS_MULTICALL_ADDRESS,
}

export const SWAP_ROUTER_ADDRESSES: AddressMap = {
  ...constructSameAddressMap('0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45', [
    SupportedChainId.OPTIMISM,
    SupportedChainId.OPTIMISM_GOERLI,
    SupportedChainId.ARBITRUM_ONE,
    SupportedChainId.ARBITRUM_GOERLI,
    SupportedChainId.POLYGON,
    SupportedChainId.POLYGON_MUMBAI,
  ]),
  // [SupportedChainId.CELO]: CELO_ROUTER_ADDRESS,
  // [SupportedChainId.CELO_ALFAJORES]: CELO_ROUTER_ADDRESS,
  [SupportedChainId.AVALANCHE]: '0x60aE616a2155Ee3d9A68541Ba4544862310933d4',
  [SupportedChainId.BINANCE]: BINANCE_ROUTER_ADDRESS,
  [SupportedChainId.MOONBEAM]: MOONBEAM_ROUTER_ADDRESS,
  [SupportedChainId.MOONRIVER]: SUSHI_ROUTER_ADDRESS,
  [SupportedChainId.FANTOM]: SUSHI_ROUTER_ADDRESS,
  [SupportedChainId.ANDROMEDA]: ANDROMEDA_ROUTER_ADDRESS,
  [SupportedChainId.GNOSIS]: SUSHI_ROUTER_ADDRESS,
  [SupportedChainId.KUCOIN]: KUCOIN_ROUTER_ADDRESS,
  [SupportedChainId.OPTIMISM_GOERLI]: OPTIMISM_GOERLI_MULTICALL_ADDRESS,
  [SupportedChainId.ARBITRUM_GOERLI]: ARBITRUM_GOERLI_MULTICALL_ADDRESS,
}

/**
 * The oldest V0 governance address
 */
export const GOVERNANCE_ALPHA_V0_ADDRESSES: AddressMap = constructSameAddressMap(
  '0x5e4be8Bc9637f0EAA1A755019e06A68ce081D58F'
)
/**
 * The older V1 governance address
 */
export const GOVERNANCE_ALPHA_V1_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0xC4e172459f1E7939D522503B81AFAaC1014CE6F6',
}
/**
 * The latest governor bravo that is currently admin of timelock
 */
export const GOVERNANCE_BRAVO_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x408ED6354d4973f66138C91495F2f2FCbd8724C3',
}

export const TIMELOCK_ADDRESS: AddressMap = constructSameAddressMap('0x1a9C8182C09F50C8318d769245beA52c32BE35BC')

export const MERKLE_DISTRIBUTOR_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '0x090D4613473dEE047c3f2706764f49E0821D256e',
}

export const ARGENT_WALLET_DETECTOR_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '0xeca4B0bDBf7c55E9b7925919d03CbF8Dc82537E8',
}

export const QUOTER_ADDRESSES: AddressMap = {
  ...constructSameAddressMap('0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6', [
    SupportedChainId.OPTIMISM,
    SupportedChainId.ARBITRUM_ONE,
    SupportedChainId.POLYGON_MUMBAI,
    SupportedChainId.POLYGON,
  ]),
  [SupportedChainId.CELO]: CELO_QUOTER_ADDRESSES,
  [SupportedChainId.CELO_ALFAJORES]: CELO_QUOTER_ADDRESSES,
  [SupportedChainId.OPTIMISM_GOERLI]: OPTIMISM_GOERLI_QUOTER_ADDRESSES,
  [SupportedChainId.ARBITRUM_GOERLI]: ARBITRUM_GOERLI_QUOTER_ADDRESSES,
}

export const NONFUNGIBLE_POSITION_MANAGER_ADDRESSES: AddressMap = {
  ...constructSameAddressMap('0xC36442b4a4522E871399CD717aBDD847Ab11FE88', [
    SupportedChainId.OPTIMISM,
    SupportedChainId.ARBITRUM_ONE,
    SupportedChainId.POLYGON_MUMBAI,
    SupportedChainId.POLYGON,
  ]),
  [SupportedChainId.CELO]: CELO_NONFUNGIBLE_POSITION_MANAGER_ADDRESSES,
  [SupportedChainId.CELO_ALFAJORES]: CELO_NONFUNGIBLE_POSITION_MANAGER_ADDRESSES,
  [SupportedChainId.OPTIMISM_GOERLI]: OPTIMISM_GOERLI_NONFUNGIBLE_POSITION_MANAGER_ADDRESSES,
  [SupportedChainId.ARBITRUM_GOERLI]: ARBITRUM_GOERLI_NONFUNGIBLE_POSITION_MANAGER_ADDRESSES,
}

export const ENS_REGISTRAR_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  [SupportedChainId.GOERLI]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
}

export const SOCKS_CONTROLLER_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x65770b5283117639760beA3F867b69b3697a91dd',
}

export const TICK_LENS_ADDRESSES: AddressMap = {
  [SupportedChainId.ARBITRUM_ONE]: '0xbfd8137f7d1516D3ea5cA83523914859ec47F573',
  [SupportedChainId.ARBITRUM_GOERLI]: ARBITRUM_GOERLI_TICK_LENS_ADDRESSES,
  [SupportedChainId.CELO]: CELO_TICK_LENS_ADDRESSES,
  [SupportedChainId.CELO_ALFAJORES]: CELO_TICK_LENS_ADDRESSES,
  [SupportedChainId.OPTIMISM_GOERLI]: OPTIMISM_GOERLI_TICK_LENS_ADDRESSES,
}
