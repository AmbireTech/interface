/* eslint-disable import/no-unused-modules */
import type { TokenList } from '@uniswap/token-lists'
import {
  formatFantomList,
  formatGnosisList,
  formatKuCoinList,
  formatMoonriverList,
} from 'lib/hooks/useTokenList/listFormatters'

export const AMBIRE_LIST = 'https://ambiretech.github.io/ambire-tokens-list/list.json'
export const UNI_LIST = 'https://gateway.ipfs.io/ipns/tokens.uniswap.org'
export const UNI_EXTENDED_LIST = 'https://gateway.ipfs.io/ipns/extendedtokens.uniswap.org'
const UNI_UNSUPPORTED_LIST = 'https://gateway.ipfs.io/ipns/unsupportedtokens.uniswap.org'
const AAVE_LIST = 'tokenlist.aave.eth'
const BA_LIST = 'https://raw.githubusercontent.com/The-Blockchain-Association/sec-notice-list/master/ba-sec-list.json'
const CMC_ALL_LIST = 'https://api.coinmarketcap.com/data-api/v3/uniswap/all.json'
const COINGECKO_LIST = 'https://tokens.coingecko.com/uniswap/all.json'
const COINGECKO_BNB_LIST = 'https://tokens.coingecko.com/binance-smart-chain/all.json'
const COMPOUND_LIST = 'https://raw.githubusercontent.com/compound-finance/token-list/master/compound.tokenlist.json'
const GEMINI_LIST = 'https://www.gemini.com/uniswap/manifest.json'
const KLEROS_LIST = 't2crtokens.eth'
const SET_LIST = 'https://raw.githubusercontent.com/SetProtocol/uniswap-tokenlist/main/set.tokenlist.json'
const WRAPPED_LIST = 'wrapped.tokensoft.eth'

export const OPTIMISM_LIST = 'https://static.optimism.io/optimism.tokenlist.json'
export const ARBITRUM_LIST = 'https://bridge.arbitrum.io/token-list-42161.json'
export const CELO_LIST = 'https://celo-org.github.io/celo-token-list/celo.tokenlist.json'
export const PLASMA_BNB_LIST = 'https://raw.githubusercontent.com/plasmadlt/plasma-finance-token-list/master/bnb.json'

export const AVAX_TRADER_JOE_LIST =
  'https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/joe.tokenlist.json'

export const BINANCE_PANCAKE_SWAP_LIST =
  'https://raw.githubusercontent.com/pancakeswap/token-list/main/lists/pancakeswap-extended.json'

export const MOONBEAM_BEAMSWAP_LIST =
  'https://raw.githubusercontent.com/BeamSwap/beamswap-tokenlist/main/tokenlist.json'

export const MOONRIVER_SUSHI_SWAP_LIST =
  'https://raw.githubusercontent.com/sushiswap/list/master/lists/token-lists/default-token-list/tokens/moonriver.json'

export const FANTOM_SUSHI_SWAP_LIST =
  'https://raw.githubusercontent.com/sushiswap/list/master/lists/token-lists/default-token-list/tokens/fantom.json'

export const ANDROMEDA_NET_SWAP_LIST =
  'https://raw.githubusercontent.com/Netswap/token-lists/master/top100.tokenlist.json'

export const GNOSIS_SUSHI_SWAP_LIST =
  'https://raw.githubusercontent.com/sushiswap/list/master/lists/token-lists/default-token-list/tokens/xdai.json'

export const KUCOIN_LIST = 'https://raw.githubusercontent.com/KuSwap/kusTokenList/master/v1/kuswaptokenlist.json'

export const UNSUPPORTED_LIST_URLS: string[] = [BA_LIST, UNI_UNSUPPORTED_LIST]

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS: string[] = [
  AMBIRE_LIST,
  UNI_LIST,
  GEMINI_LIST,
  AVAX_TRADER_JOE_LIST,
  BINANCE_PANCAKE_SWAP_LIST,
  MOONBEAM_BEAMSWAP_LIST,
  MOONRIVER_SUSHI_SWAP_LIST,
  FANTOM_SUSHI_SWAP_LIST,
  ANDROMEDA_NET_SWAP_LIST,
  GNOSIS_SUSHI_SWAP_LIST,
  KUCOIN_LIST,
]

export const DEFAULT_INACTIVE_LIST_URLS: string[] = [
  UNI_EXTENDED_LIST,
  COMPOUND_LIST,
  AAVE_LIST,
  CMC_ALL_LIST,
  COINGECKO_LIST,
  COINGECKO_BNB_LIST,
  KLEROS_LIST,
  GEMINI_LIST,
  WRAPPED_LIST,
  SET_LIST,
  ARBITRUM_LIST,
  OPTIMISM_LIST,
  CELO_LIST,
  PLASMA_BNB_LIST,
  ...UNSUPPORTED_LIST_URLS,
]

export const LIST_FORMATTERS: { [listUrl: string]: (json: any) => TokenList } = {
  [MOONRIVER_SUSHI_SWAP_LIST]: formatMoonriverList,
  [FANTOM_SUSHI_SWAP_LIST]: formatFantomList,
  [GNOSIS_SUSHI_SWAP_LIST]: formatGnosisList,
  [KUCOIN_LIST]: formatKuCoinList,
}

export const DEFAULT_LIST_OF_LISTS: string[] = [...DEFAULT_ACTIVE_LIST_URLS, ...DEFAULT_INACTIVE_LIST_URLS]
