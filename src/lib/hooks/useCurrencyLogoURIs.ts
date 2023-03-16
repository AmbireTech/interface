import { SupportedChainId } from 'constants/chains'
import useHttpLocations from 'hooks/useHttpLocations'
import { useMemo } from 'react'
import { isAddress } from 'utils'

import EthereumLogo from '../../assets/images/ethereum-logo.png'
import AvaxLogo from '../../assets/svg/avalanche-avax-logo.svg'
import BinanceLogo from '../../assets/svg/bnb-logo.svg'
import BnbLogo from '../../assets/svg/bnb-logo.svg'
import CeloLogo from '../../assets/svg/celo_logo.svg'
import FantomLogo from '../../assets/svg/fantom-logo.svg'
import GnosisLogo from '../../assets/svg/gnosis-logo.svg'
import KuCoinLogo from '../../assets/svg/kucoin-logo.svg'
import MaticLogo from '../../assets/svg/matic-token-icon.svg'
import AndromedaLogo from '../../assets/svg/metis-logo.svg'
import MoonbeamLogo from '../../assets/svg/moonbeam-token.svg'
import MoonriverLogo from '../../assets/svg/moonriver-logo.svg'
// import { isCelo, nativeOnChain } from '../../constants/tokens'
import { isCelo, NATIVE_CHAIN_ID, nativeOnChain } from '../../constants/tokens'

type Network =
  | 'ethereum'
  | 'arbitrum'
  | 'optimism'
  | 'polygon'
  | 'smartchain'
  | 'avalanche'
  | 'binance'
  | 'moonbeam'
  | 'moonriver'
  | 'fantom'
  | 'andromeda'
  | 'gnosis'
  | 'kucoin'

export function chainIdToNetworkName(networkId: SupportedChainId): Network {
  switch (networkId) {
    case SupportedChainId.MAINNET:
      return 'ethereum'
    case SupportedChainId.ARBITRUM_ONE:
      return 'arbitrum'
    case SupportedChainId.OPTIMISM:
      return 'optimism'
    case SupportedChainId.POLYGON:
      return 'polygon'
    case SupportedChainId.AVALANCHE:
      return 'avalanche'
    case SupportedChainId.BNB:
      return 'smartchain'
    case SupportedChainId.BINANCE:
      return 'binance'
    case SupportedChainId.MOONBEAM:
      return 'moonbeam'
    case SupportedChainId.MOONRIVER:
      return 'moonriver'
    case SupportedChainId.FANTOM:
      return 'fantom'
    case SupportedChainId.ANDROMEDA:
      return 'andromeda'
    case SupportedChainId.GNOSIS:
      return 'gnosis'
    case SupportedChainId.KUCOIN:
      return 'kucoin'
    default:
      return 'ethereum'
  }
}

export function getNativeLogoURI(chainId: SupportedChainId = SupportedChainId.MAINNET): string {
  switch (chainId) {
    case SupportedChainId.POLYGON:
    case SupportedChainId.POLYGON_MUMBAI:
      return MaticLogo
    case SupportedChainId.BNB:
      return BnbLogo
    case SupportedChainId.CELO:
    case SupportedChainId.CELO_ALFAJORES:
      return CeloLogo
    case SupportedChainId.AVALANCHE:
      return AvaxLogo
    case SupportedChainId.BINANCE:
      return BinanceLogo
    case SupportedChainId.MOONBEAM:
      return MoonbeamLogo
    case SupportedChainId.MOONRIVER:
      return MoonriverLogo
    case SupportedChainId.FANTOM:
      return FantomLogo
    case SupportedChainId.ANDROMEDA:
      return AndromedaLogo
    case SupportedChainId.GNOSIS:
      return GnosisLogo
    case SupportedChainId.KUCOIN:
      return KuCoinLogo
    default:
      return EthereumLogo
  }
}

function getTokenLogoURI(address: string, chainId: SupportedChainId = SupportedChainId.MAINNET): string | void {
  const networkName = chainIdToNetworkName(chainId)
  const networksWithUrls = [
    SupportedChainId.ARBITRUM_ONE,
    SupportedChainId.MAINNET,
    SupportedChainId.OPTIMISM,
    SupportedChainId.BNB,
  ]
  if (networksWithUrls.includes(chainId)) {
    return `https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/${networkName}/assets/${address}/logo.png`
  }

  // Celo logo logo is hosted elsewhere.
  if (isCelo(chainId)) {
    if (address === nativeOnChain(chainId).wrapped.address) {
      return 'https://raw.githubusercontent.com/ubeswap/default-token-list/master/assets/asset_CELO.png'
    }
  }
}

export default function useCurrencyLogoURIs(
  currency:
    | {
        isNative?: boolean
        isToken?: boolean
        address?: string
        chainId: number
        logoURI?: string | null
      }
    | null
    | undefined
): string[] {
  const locations = useHttpLocations(currency?.logoURI)
  return useMemo(() => {
    const logoURIs = [...locations]
    if (currency) {
      if (currency.isNative || currency.address === NATIVE_CHAIN_ID) {
        logoURIs.push(getNativeLogoURI(currency.chainId))
      } else if (currency.isToken || currency.address) {
        const checksummedAddress = isAddress(currency.address)
        const logoURI = checksummedAddress && getTokenLogoURI(checksummedAddress, currency.chainId)
        if (logoURI) {
          logoURIs.push(logoURI)
        }
      }
    }
    return logoURIs
  }, [currency, locations])
}
