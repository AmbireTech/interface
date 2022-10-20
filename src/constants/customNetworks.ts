import { AvalancheLibrary } from 'hooks/customNetwork/libraries/AvalancheLibrary'
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
}

export const LIBRARIES: { [chainId: number]: UniV2CustomLibrary } = {
  [SupportedChainId.AVALANCHE]: new AvalancheLibrary(),
}
