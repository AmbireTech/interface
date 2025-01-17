import { ChainId } from '@sushiswap/sdk'
import { BeamswapLibrary } from 'hooks/customNetwork/libraries/BeamSwapLibrary'
import { KuCoinFinanceLibrary } from 'hooks/customNetwork/libraries/KuCoinFinanceLibrary'
import { NetSwapLibrary } from 'hooks/customNetwork/libraries/NetSwapLibrary'
import { PancakeLibrary } from 'hooks/customNetwork/libraries/PancakeLibrary'
import { SushiSwapLibrary } from 'hooks/customNetwork/libraries/SushiSwapLibrary'
import { TraderJoeLibrary } from 'hooks/customNetwork/libraries/TraderJoeLibrary'
import { UniV2CustomLibrary } from 'hooks/customNetwork/libraries/UniV2CustomLibrary'

import { SupportedChainId } from './chains'

export const SWAP_HOP_ASSETS: {
  [chainId: number]: { address: string; name: string; symbol: string; decimals: number }[]
} = {
  [SupportedChainId.AVALANCHE]: [
    { address: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7', name: 'Wrapped AVAX', symbol: 'WAVAX', decimals: 18 },
    { address: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E', name: 'USCD', symbol: 'USCD', decimals: 6 },
    {
      address: '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664',
      name: 'USCD - Bridged',
      symbol: 'USDC.e',
      decimals: 6,
    },
    { address: '0xd586E7F844cEa2F87f50152665BCbc2C279D8d70', name: 'dai', symbol: 'DAI', decimals: 18 },
    { address: '0x63a72806098Bd3D9520cC43356dD78afe5D386D9', name: 'aave', symbol: 'AAVE', decimals: 18 },
    { address: '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB', name: 'weth', symbol: 'WETH.e', decimals: 18 },
    { address: '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7', name: 'Tether', symbol: 'USDT', decimals: 6 },
    { address: '0xc7198437980c041c805A1EDcbA50c1Ce5db95118', name: 'Tether - Bridged', symbol: 'USDT.e', decimals: 6 },
  ],
  [SupportedChainId.BINANCE]: [
    { address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', name: 'wbnb', symbol: 'WBNB', decimals: 18 },
    { address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', name: 'USDC', symbol: 'USDC', decimals: 18 },
    { address: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3', name: 'dai', symbol: 'DAI', decimals: 18 },
    { address: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8', name: 'eth', symbol: 'ETH', decimals: 18 },
    { address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', name: 'busd', symbol: 'BUSD', decimals: 18 },
    { address: '0x55d398326f99059fF775485246999027B3197955', name: 'USDT', symbol: 'USDT', decimals: 18 },
  ],
  [SupportedChainId.MOONBEAM]: [
    { address: '0xAcc15dC74880C9944775448304B263D191c6077F', name: 'Wrapped Glimmer', symbol: 'WGLMR', decimals: 18 },
    { address: '0x818ec0A7Fe18Ff94269904fCED6AE3DaE6d6dC0b', name: 'multiUSDC', symbol: 'USDC', decimals: 6 },
    { address: '0x765277EebeCA2e31912C9946eAe1021199B39C61', name: 'multiDAI', symbol: 'DAI', decimals: 18 },
    { address: '0xfA9343C3897324496A05fC75abeD6bAC29f8A40f', name: 'multiETH', symbol: 'ETH', decimals: 18 },
    { address: '0xeFAeeE334F0Fd1712f9a8cc375f427D9Cdd40d73', name: 'multiUSDT', symbol: 'USDT', decimals: 6 },
    { address: '0xA649325Aa7C5093d12D6F98EB4378deAe68CE23F', name: 'multiBUSD', symbol: 'BUSD', decimals: 18 },
  ],
  [SupportedChainId.MOONRIVER]: [
    { address: '0xf50225a84382c74CbdeA10b0c176f71fc3DE0C4d', name: 'Wrapped Moonriver', symbol: 'WMOVR', decimals: 18 },
    { address: '0xE3F5a90F9cb311505cd691a46596599aA1A0AD7D', name: 'USD Coin - AnySwap', symbol: 'USDC', decimals: 6 },
    {
      address: '0x80A16016cC4A2E6a2CACA8a4a498b1699fF0f844',
      name: 'Dai Stablecoin - AnySwap',
      symbol: 'DAI',
      decimals: 18,
    },
    {
      address: '0x639A647fbe20b6c8ac19E48E2de44ea792c62c5C',
      name: 'Wrapped Ether - AnySwap',
      symbol: 'WETH',
      decimals: 18,
    },
    {
      address: '0xB44a9B6905aF7c801311e8F4E76932ee959c663C',
      name: 'Tether USD - AnySwap',
      symbol: 'USDT',
      decimals: 6,
    },
    {
      address: '0x5D9ab5522c64E1F6ef5e3627ECCc093f56167818',
      name: 'Binance USD - AnySwap',
      symbol: 'BUSD',
      decimals: 18,
    },
  ],
  [SupportedChainId.FANTOM]: [
    { address: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83', name: 'Wrapped Fantom', symbol: 'WFTM', decimals: 18 },
    { address: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75', name: 'USD Coin', symbol: 'USDC', decimals: 6 },
    {
      address: '0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E',
      name: 'Dai Stablecoin',
      symbol: 'DAI',
      decimals: 18,
    },
    {
      address: '0x74b23882a30290451A17c44f4F05243b6b58C76d',
      name: 'Wrapped Ether',
      symbol: 'WETH',
      decimals: 18,
    },
    {
      address: '0x049d68029688eAbF473097a2fC38ef61633A3C7A',
      name: 'Frapped USDT',
      symbol: 'fUSDT',
      decimals: 6,
    },
  ],
  [SupportedChainId.ANDROMEDA]: [
    { address: '0xa5B55ab1dAF0F8e1EFc0eB1931a957fd89B918f4', name: 'Wrapped BTC', symbol: 'WBTC', decimals: 18 },
    { address: '0xea32a96608495e54156ae48931a7c20f0dcc1a21', name: 'USDC Token', symbol: 'm.USDC', decimals: 6 },
    {
      address: '0x4c078361fc9bbb78df910800a991c7c3dd2f6ce0',
      name: 'Dai Token',
      symbol: 'm.DAI',
      decimals: 18,
    },
    {
      address: '0x420000000000000000000000000000000000000a',
      name: 'Ether',
      symbol: 'WETH',
      decimals: 18,
    },
    {
      address: '0xbb06dca3ae6887fabf931640f67cab3e3a16f4dc',
      name: 'USDT Token',
      symbol: 'm.USDT',
      decimals: 6,
    },
    {
      address: '0xb809cda0c2f79f43248c32b5dcb09d5cd26bbf10',
      name: 'Binance USD',
      symbol: 'm.BUSD',
      decimals: 18,
    },
  ],
  [SupportedChainId.GNOSIS]: [
    { address: '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d', name: 'Wrapped xDai', symbol: 'WXDAI', decimals: 18 },
    { address: '0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83', name: 'USDC on xDai', symbol: 'USDC', decimals: 6 },
    {
      address: '0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1',
      name: 'Wrapped Ether on xDai',
      symbol: 'WETH',
      decimals: 18,
    },
    {
      address: '0x4ECaBa5870353805a9F068101A40E0f32ed605C6',
      name: 'Tether on xDai',
      symbol: 'USDT',
      decimals: 6,
    },
    {
      address: '0x8e5bBbb09Ed1ebdE8674Cda39A0c169401db4252',
      name: 'Wrapped BTC on xDai',
      symbol: 'WBTC',
      decimals: 18,
    },
  ],
  [SupportedChainId.KUCOIN]: [
    { address: '0x4446Fc4eb47f2f6586f9fAAb68B3498F86C07521', name: 'Wrapped KCS', symbol: 'WKCS', decimals: 18 },
    { address: '0x980a5AfEf3D17aD98635F6C5aebCBAedEd3c3430', name: 'KCC-Peg USD Coin', symbol: 'USDC', decimals: 18 },
    {
      address: '0xf55aF137A98607F7ED2eFEfA4cd2DfE70E4253b1',
      name: 'KCC-Peg ETH Coin',
      symbol: 'ETH',
      decimals: 18,
    },
    {
      address: '0x0039f574eE5cC39bdD162E9A88e3EB1f111bAF48',
      name: 'KCC-Peg Tether USD',
      symbol: 'USDT',
      decimals: 18,
    },
    {
      address: '0x218c3c3D49d0E7B37aff0D8bB079de36Ae61A4c0',
      name: 'Wrapped Bitcoin',
      symbol: 'WBTC',
      decimals: 18,
    },
  ],
}

export const LIBRARIES: { [chainId: number]: UniV2CustomLibrary } = {
  [SupportedChainId.AVALANCHE]: new TraderJoeLibrary(),
  [SupportedChainId.BINANCE]: new PancakeLibrary(),
  [SupportedChainId.MOONBEAM]: new BeamswapLibrary(),
  [SupportedChainId.MOONRIVER]: new SushiSwapLibrary(ChainId.MOONRIVER),
  [SupportedChainId.FANTOM]: new SushiSwapLibrary(ChainId.FANTOM),
  [SupportedChainId.ANDROMEDA]: new NetSwapLibrary(),
  [SupportedChainId.GNOSIS]: new SushiSwapLibrary(ChainId.XDAI),
  [SupportedChainId.KUCOIN]: new KuCoinFinanceLibrary(),
}
