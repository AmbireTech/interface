/* eslint-disable import/no-unused-modules */
import { Currency, Ether, NativeCurrency, Token, WETH9 } from '@uniswap/sdk-core'
import invariant from 'tiny-invariant'

import { UNI_ADDRESS } from './addresses'
import { SupportedChainId } from './chains'
import { USDCSupportedChainId } from './chains'

export const NATIVE_CHAIN_ID = 'NATIVE'

// When decimals are not specified for an ERC20 token
// use default ERC20 token decimals as specified here:
// https://docs.openzeppelin.com/contracts/3.x/erc20
export const DEFAULT_ERC20_DECIMALS = 18

export const USDC_MAINNET = new Token(
  SupportedChainId.MAINNET,
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  6,
  'USDC',
  'USD//C'
)
const USDC_GOERLI = new Token(
  SupportedChainId.GOERLI,
  '0x07865c6e87b9f70255377e024ace6630c1eaa37f',
  6,
  'USDC',
  'USD//C'
)
export const USDC_OPTIMISM = new Token(
  SupportedChainId.OPTIMISM,
  '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
  6,
  'USDC',
  'USD//C'
)
const USDC_OPTIMISM_GOERLI = new Token(
  SupportedChainId.OPTIMISM_GOERLI,
  '0x7E07E15D2a87A24492740D16f5bdF58c16db0c4E',
  6,
  'USDC',
  'USD//C'
)
export const USDC_ARBITRUM = new Token(
  SupportedChainId.ARBITRUM_ONE,
  '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
  6,
  'USDC',
  'USD//C'
)
export const USDC_ARBITRUM_GOERLI = new Token(
  SupportedChainId.ARBITRUM_GOERLI,
  '0x8FB1E3fC51F3b789dED7557E680551d93Ea9d892',
  6,
  'USDC',
  'USD//C'
)
export const USDC_POLYGON = new Token(
  SupportedChainId.POLYGON,
  '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
  6,
  'USDC',
  'USD//C'
)
export const USDC_AVALANCHE = new Token(
  SupportedChainId.AVALANCHE,
  // '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664', // bridged ethereum USDC
  '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
  6,
  'USDC',
  'USD//C'
)
export const USDC_BINANCE = new Token(
  SupportedChainId.BINANCE,
  '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
  6,
  'USDC',
  'USD//C'
)
export const USDC_MOONBEAM = new Token(
  SupportedChainId.MOONBEAM,
  '0x818ec0A7Fe18Ff94269904fCED6AE3DaE6d6dC0b',
  6,
  'USDC',
  'USD//C'
)
export const USDC_MOONRIVER = new Token(
  SupportedChainId.MOONRIVER,
  '0xE3F5a90F9cb311505cd691a46596599aA1A0AD7D',
  6,
  'USDC',
  'USD//C'
)
export const USDC_FANTOM = new Token(
  SupportedChainId.FANTOM,
  '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
  6,
  'USDC',
  'USD//C'
)
export const USDC_ANDROMEDA = new Token(
  SupportedChainId.ANDROMEDA,
  '0xEA32A96608495e54156Ae48931A7c20f0dcc1a21',
  6,
  'USDC',
  'USD//C'
)
export const USDC_POLYGON_MUMBAI = new Token(
  SupportedChainId.POLYGON_MUMBAI,
  '0xe11a86849d99f524cac3e7a0ec1241828e332c62',
  6,
  'USDC',
  'USD//C'
)
export const PORTAL_USDC_CELO = new Token(
  SupportedChainId.CELO,
  '0x37f750B7cC259A2f741AF45294f6a16572CF5cAd',
  6,
  'USDCet',
  'USDC (Portal from Ethereum)'
)
export const USDC_CELO_ALFAJORES = new Token(
  SupportedChainId.CELO_ALFAJORES,
  '0x41F4a5d2632b019Ae6CE9625bE3c9CaC143AcC7D',
  6,
  'USDC',
  'USD//C'
)
export const USDC_GNOSIS = new Token(
  SupportedChainId.GNOSIS,
  '0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83',
  6,
  'USDC',
  'USD//C'
)
export const USDC_KUCOIN = new Token(
  SupportedChainId.KUCOIN,
  '0x980a5AfEf3D17aD98635F6C5aebCBAedEd3c3430',
  6,
  'USDC',
  'USD//C'
)
export const AMPL = new Token(
  SupportedChainId.MAINNET,
  '0xD46bA6D942050d489DBd938a2C909A5d5039A161',
  9,
  'AMPL',
  'Ampleforth'
)
export const DAI = new Token(
  SupportedChainId.MAINNET,
  '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  18,
  'DAI',
  'Dai Stablecoin'
)
export const DAI_ARBITRUM_ONE = new Token(
  SupportedChainId.ARBITRUM_ONE,
  '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
  18,
  'DAI',
  'Dai stable coin'
)
export const DAI_OPTIMISM = new Token(
  SupportedChainId.OPTIMISM,
  '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
  18,
  'DAI',
  'Dai stable coin'
)
export const WALLET = new Token(
  SupportedChainId.MAINNET,
  '0x88800092fF476844f74dC2FC427974BBee2794Ae',
  18,
  'WALLET',
  'Ambire Wallet'
)
export const ADX = new Token(
  SupportedChainId.MAINNET,
  '0xADE00C28244d5CE17D72E40330B1c318cD12B7c3',
  18,
  'ADX',
  'AdEx Network'
)
export const USDC: { [chainId in USDCSupportedChainId]: Token } = {
  [SupportedChainId.MAINNET]: USDC_MAINNET,
  [SupportedChainId.GOERLI]: USDC_GOERLI,
  [SupportedChainId.ARBITRUM_ONE]: USDC_ARBITRUM,
  [SupportedChainId.ARBITRUM_GOERLI]: USDC_ARBITRUM_GOERLI,
  [SupportedChainId.OPTIMISM]: USDC_OPTIMISM,
  [SupportedChainId.OPTIMISM_GOERLI]: USDC_OPTIMISM_GOERLI,
  [SupportedChainId.POLYGON]: USDC_POLYGON,
  [SupportedChainId.POLYGON_MUMBAI]: USDC_POLYGON_MUMBAI,
  [SupportedChainId.CELO]: PORTAL_USDC_CELO,
  [SupportedChainId.CELO_ALFAJORES]: USDC_CELO_ALFAJORES,
  [SupportedChainId.GOERLI]: USDC_GOERLI,
  [SupportedChainId.AVALANCHE]: USDC_AVALANCHE,
  [SupportedChainId.MOONBEAM]: USDC_MOONBEAM,
  [SupportedChainId.BINANCE]: USDC_BINANCE,
  [SupportedChainId.MOONRIVER]: USDC_MOONRIVER,
  [SupportedChainId.FANTOM]: USDC_FANTOM,
  [SupportedChainId.ANDROMEDA]: USDC_ANDROMEDA,
  [SupportedChainId.GNOSIS]: USDC_GNOSIS,
  [SupportedChainId.KUCOIN]: USDC_KUCOIN,
}
export const DAI_POLYGON = new Token(
  SupportedChainId.POLYGON,
  '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
  18,
  'DAI',
  'Dai Stablecoin'
)
export const USDT_POLYGON = new Token(
  SupportedChainId.POLYGON,
  '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
  6,
  'USDT',
  'Tether USD'
)
export const WBTC_POLYGON = new Token(
  SupportedChainId.POLYGON,
  '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6',
  8,
  'WBTC',
  'Wrapped BTC'
)
export const USDT = new Token(
  SupportedChainId.MAINNET,
  '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  6,
  'USDT',
  'Tether USD'
)
export const USDT_ARBITRUM_ONE = new Token(
  SupportedChainId.ARBITRUM_ONE,
  '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
  6,
  'USDT',
  'Tether USD'
)
export const USDT_OPTIMISM = new Token(
  SupportedChainId.OPTIMISM,
  '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
  6,
  'USDT',
  'Tether USD'
)
export const WBTC = new Token(
  SupportedChainId.MAINNET,
  '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  8,
  'WBTC',
  'Wrapped BTC'
)
export const WBTC_ARBITRUM_ONE = new Token(
  SupportedChainId.ARBITRUM_ONE,
  '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
  8,
  'WBTC',
  'Wrapped BTC'
)
export const WBTC_OPTIMISM = new Token(
  SupportedChainId.OPTIMISM,
  '0x68f180fcCe6836688e9084f035309E29Bf0A2095',
  8,
  'WBTC',
  'Wrapped BTC'
)
export const FEI = new Token(
  SupportedChainId.MAINNET,
  '0x956F47F50A910163D8BF957Cf5846D573E7f87CA',
  18,
  'FEI',
  'Fei USD'
)
export const TRIBE = new Token(
  SupportedChainId.MAINNET,
  '0xc7283b66Eb1EB5FB86327f08e1B5816b0720212B',
  18,
  'TRIBE',
  'Tribe'
)
export const FRAX = new Token(
  SupportedChainId.MAINNET,
  '0x853d955aCEf822Db058eb8505911ED77F175b99e',
  18,
  'FRAX',
  'Frax'
)
export const FXS = new Token(
  SupportedChainId.MAINNET,
  '0x3432B6A60D23Ca0dFCa7761B7ab56459D9C964D0',
  18,
  'FXS',
  'Frax Share'
)
export const renBTC = new Token(
  SupportedChainId.MAINNET,
  '0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D',
  8,
  'renBTC',
  'renBTC'
)
export const ETH2X_FLI = new Token(
  SupportedChainId.MAINNET,
  '0xAa6E8127831c9DE45ae56bB1b0d4D4Da6e5665BD',
  18,
  'ETH2x-FLI',
  'ETH 2x Flexible Leverage Index'
)
export const sETH2 = new Token(
  SupportedChainId.MAINNET,
  '0xFe2e637202056d30016725477c5da089Ab0A043A',
  18,
  'sETH2',
  'StakeWise Staked ETH2'
)
export const rETH2 = new Token(
  SupportedChainId.MAINNET,
  '0x20BC832ca081b91433ff6c17f85701B6e92486c5',
  18,
  'rETH2',
  'StakeWise Reward ETH2'
)
export const SWISE = new Token(
  SupportedChainId.MAINNET,
  '0x48C3399719B582dD63eB5AADf12A40B4C3f52FA2',
  18,
  'SWISE',
  'StakeWise'
)
export const WETH_POLYGON_MUMBAI = new Token(
  SupportedChainId.POLYGON_MUMBAI,
  '0xa6fa4fb5f76172d178d61b04b0ecd319c5d1c0aa',
  18,
  'WETH',
  'Wrapped Ether'
)

export const WETH_POLYGON = new Token(
  SupportedChainId.POLYGON,
  '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
  18,
  'WETH',
  'Wrapped Ether'
)
const CELO_CELO = new Token(SupportedChainId.CELO, '0x471EcE3750Da237f93B8E339c536989b8978a438', 18, 'CELO', 'Celo')
export const CUSD_CELO = new Token(
  SupportedChainId.CELO,
  '0x765DE816845861e75A25fCA122bb6898B8B1282a',
  18,
  'cUSD',
  'Celo Dollar'
)
export const CEUR_CELO = new Token(
  SupportedChainId.CELO,
  '0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73',
  18,
  'cEUR',
  'Celo Euro Stablecoin'
)
export const PORTAL_ETH_CELO = new Token(
  SupportedChainId.CELO,
  '0x66803FB87aBd4aaC3cbB3fAd7C3aa01f6F3FB207',
  18,
  'ETH',
  'Portal Ether'
)
export const CMC02_CELO = new Token(
  SupportedChainId.CELO,
  '0x32A9FE697a32135BFd313a6Ac28792DaE4D9979d',
  18,
  'cMCO2',
  'Celo Moss Carbon Credit'
)
const CELO_CELO_ALFAJORES = new Token(
  SupportedChainId.CELO_ALFAJORES,
  '0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9',
  18,
  'CELO',
  'Celo'
)
export const CUSD_CELO_ALFAJORES = new Token(
  SupportedChainId.CELO_ALFAJORES,
  '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1',
  18,
  'CUSD',
  'Celo Dollar'
)
export const CEUR_CELO_ALFAJORES = new Token(
  SupportedChainId.CELO_ALFAJORES,
  '0x10c892A6EC43a53E45D0B916B4b7D383B1b78C0F',
  18,
  'CEUR',
  'Celo Euro Stablecoin'
)

export const USDC_BSC = new Token(
  SupportedChainId.BNB,
  '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
  18,
  'USDC',
  'USDC'
)

export const USDT_BSC = new Token(
  SupportedChainId.BNB,
  '0x55d398326f99059fF775485246999027B3197955',
  18,
  'USDT',
  'USDT'
)

export const ETH_BSC = new Token(
  SupportedChainId.BNB,
  '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
  18,
  'ETH',
  'Ethereum'
)

export const MATIC_BSC = new Token(
  SupportedChainId.BNB,
  '0xCC42724C6683B7E57334c4E856f4c9965ED682bD',
  18,
  'MATIC',
  'Matic'
)

export const FRAX_BSC = new Token(
  SupportedChainId.BNB,
  '0x90C97F71E18723b0Cf0dfa30ee176Ab653E89F40',
  18,
  'FRAX',
  'FRAX'
)

export const BTC_BSC = new Token(SupportedChainId.BNB, '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c', 18, 'BTCB', 'BTCB')

export const CAKE_BSC = new Token(
  SupportedChainId.BNB,
  '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
  18,
  'CAKE',
  'Cake'
)

export const BUSD_BSC = new Token(
  SupportedChainId.BNB,
  '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
  18,
  'BUSD',
  'BUSD'
)

export const DAI_BSC = new Token(SupportedChainId.BNB, '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3', 18, 'DAI', 'DAI')

export const UNI: { [chainId: number]: Token } = {
  [SupportedChainId.MAINNET]: new Token(SupportedChainId.MAINNET, UNI_ADDRESS[1], 18, 'UNI', 'Uniswap'),
  [SupportedChainId.GOERLI]: new Token(SupportedChainId.GOERLI, UNI_ADDRESS[5], 18, 'UNI', 'Uniswap'),
}

export const WRAPPED_NATIVE_CURRENCY: { [chainId: number]: Token | undefined } = {
  ...(WETH9 as Record<SupportedChainId, Token>),
  [SupportedChainId.OPTIMISM]: new Token(
    SupportedChainId.OPTIMISM,
    '0x4200000000000000000000000000000000000006',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [SupportedChainId.OPTIMISM_GOERLI]: new Token(
    SupportedChainId.OPTIMISM_GOERLI,
    '0x4200000000000000000000000000000000000006',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [SupportedChainId.ARBITRUM_ONE]: new Token(
    SupportedChainId.ARBITRUM_ONE,
    '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [SupportedChainId.ARBITRUM_GOERLI]: new Token(
    SupportedChainId.ARBITRUM_GOERLI,
    '0xe39Ab88f8A4777030A534146A9Ca3B52bd5D43A3',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [SupportedChainId.POLYGON]: new Token(
    SupportedChainId.POLYGON,
    '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    18,
    'WMATIC',
    'Wrapped MATIC'
  ),
  [SupportedChainId.POLYGON_MUMBAI]: new Token(
    SupportedChainId.POLYGON_MUMBAI,
    '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
    18,
    'WMATIC',
    'Wrapped MATIC'
  ),
  [SupportedChainId.CELO]: new Token(
    SupportedChainId.CELO,
    '0x471ece3750da237f93b8e339c536989b8978a438',
    18,
    'CELO',
    'Celo native asset'
  ),
  [SupportedChainId.CELO_ALFAJORES]: new Token(
    SupportedChainId.CELO_ALFAJORES,
    '0xf194afdf50b03e69bd7d057c1aa9e10c9954e4c9',
    18,
    'CELO',
    'Celo native asset'
  ),
  [SupportedChainId.BNB]: new Token(
    SupportedChainId.BNB,
    '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    18,
    'WBNB',
    'Wrapped BNB'
  ),
  [SupportedChainId.AVALANCHE]: new Token(
    SupportedChainId.AVALANCHE,
    '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
    18,
    'WAVAX',
    'Wrapped AVAX'
  ),
  [SupportedChainId.BINANCE]: new Token(
    SupportedChainId.BINANCE,
    '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    18,
    'WBNB',
    'Wrapped BNB'
  ),
  [SupportedChainId.MOONBEAM]: new Token(
    SupportedChainId.MOONBEAM,
    '0xAcc15dC74880C9944775448304B263D191c6077F',
    18,
    'WGLMR',
    'Wrapped GLMR'
  ),
  [SupportedChainId.MOONRIVER]: new Token(
    SupportedChainId.MOONRIVER,
    '0xf50225a84382c74CbdeA10b0c176f71fc3DE0C4d',
    18,
    'WMOVR',
    'Wrapped MOVR'
  ),
  [SupportedChainId.FANTOM]: new Token(
    SupportedChainId.FANTOM,
    '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83',
    18,
    'WFTM',
    'Wrapped Fantom'
  ),
  [SupportedChainId.GNOSIS]: new Token(
    SupportedChainId.GNOSIS,
    '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d',
    18,
    'WxDAI',
    'Wrapped xDAI'
  ),
  [SupportedChainId.ANDROMEDA]: new Token(
    SupportedChainId.ANDROMEDA,
    '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000',
    18,
    'Metis',
    'Metis Token'
  ),
  [SupportedChainId.KUCOIN]: new Token(
    SupportedChainId.KUCOIN,
    '0x4446Fc4eb47f2f6586f9fAAb68B3498F86C07521',
    18,
    'WKCS',
    'Wrapped KuCoin'
  ),
}

export function isCelo(chainId: number): chainId is SupportedChainId.CELO | SupportedChainId.CELO_ALFAJORES {
  return chainId === SupportedChainId.CELO_ALFAJORES || chainId === SupportedChainId.CELO
}

export function isAvax(chainId: number): chainId is SupportedChainId.AVALANCHE {
  return chainId === SupportedChainId.AVALANCHE
}

export function isBNB(chainId: number): chainId is SupportedChainId.BINANCE {
  return chainId === SupportedChainId.BINANCE
}

export function isMoonbeam(chainId: number): chainId is SupportedChainId.MOONBEAM {
  return chainId === SupportedChainId.MOONBEAM
}

export function isMoonriver(chainId: number): chainId is SupportedChainId.MOONRIVER {
  return chainId === SupportedChainId.MOONRIVER
}

export function isFantom(chainId: number): chainId is SupportedChainId.FANTOM {
  return chainId === SupportedChainId.FANTOM
}

export function isAndromeda(chainId: number): chainId is SupportedChainId.ANDROMEDA {
  return chainId === SupportedChainId.ANDROMEDA
}

export function isGnosis(chainId: number): chainId is SupportedChainId.GNOSIS {
  return chainId === SupportedChainId.GNOSIS
}

export function isKuCoin(chainId: number): chainId is SupportedChainId.KUCOIN {
  return chainId === SupportedChainId.KUCOIN
}

function getCeloNativeCurrency(chainId: number) {
  switch (chainId) {
    case SupportedChainId.CELO_ALFAJORES:
      return CELO_CELO_ALFAJORES
    case SupportedChainId.CELO:
      return CELO_CELO
    default:
      throw new Error('Not celo')
  }
}

function isMatic(chainId: number): chainId is SupportedChainId.POLYGON | SupportedChainId.POLYGON_MUMBAI {
  return chainId === SupportedChainId.POLYGON_MUMBAI || chainId === SupportedChainId.POLYGON
}

class MaticNativeCurrency extends NativeCurrency {
  equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId
  }

  get wrapped(): Token {
    if (!isMatic(this.chainId)) throw new Error('Not matic')
    const wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId]
    invariant(wrapped instanceof Token)
    return wrapped
  }

  public constructor(chainId: number) {
    if (!isMatic(chainId)) throw new Error('Not matic')
    super(chainId, 18, 'MATIC', 'Polygon Matic')
  }
}

function isBsc(chainId: number): chainId is SupportedChainId.BNB {
  return chainId === SupportedChainId.BNB
}

class BscNativeCurrency extends NativeCurrency {
  equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId
  }

  get wrapped(): Token {
    if (!isBsc(this.chainId)) throw new Error('Not bnb')
    const wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId]
    invariant(wrapped instanceof Token)
    return wrapped
  }

  public constructor(chainId: number) {
    if (!isBsc(chainId)) throw new Error('Not bnb')
    super(chainId, 18, 'BNB', 'BNB')
  }
}

class AvaxNativeCurrency extends NativeCurrency {
  equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId
  }

  get wrapped(): Token {
    if (!isAvax(this.chainId)) throw new Error('Not avax')
    const wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId]
    invariant(wrapped instanceof Token)
    return wrapped
  }

  public constructor(chainId: number) {
    if (!isAvax(chainId)) throw new Error('Not avax')
    super(chainId, 18, 'AVAX', 'Avalanche AVAX')
  }
}

class BnbNativeCurrency extends NativeCurrency {
  equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId
  }

  get wrapped(): Token {
    if (!isBNB(this.chainId)) throw new Error('Not bnb')
    const wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId]
    invariant(wrapped instanceof Token)
    return wrapped
  }

  public constructor(chainId: number) {
    if (!isBNB(chainId)) throw new Error('Not bnb')
    super(chainId, 18, 'BNB', 'Binance BNB')
  }
}

class MoonbeamNativeCurrency extends NativeCurrency {
  equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId
  }

  get wrapped(): Token {
    if (!isMoonbeam(this.chainId)) throw new Error('Not moonbeam')
    const wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId]
    invariant(wrapped instanceof Token)
    return wrapped
  }

  public constructor(chainId: number) {
    if (!isMoonbeam(chainId)) throw new Error('Not moonbeam')
    super(chainId, 18, 'GLMR', 'Moonbeam GLMR')
  }
}

class MoonriverNativeCurrency extends NativeCurrency {
  equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId
  }

  get wrapped(): Token {
    if (!isMoonriver(this.chainId)) throw new Error('Not moonriver')
    const wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId]
    invariant(wrapped instanceof Token)
    return wrapped
  }

  public constructor(chainId: number) {
    if (!isMoonriver(chainId)) throw new Error('Not moonriver')
    super(chainId, 18, 'MOVR', 'Moonriver MOVR')
  }
}

class FantomNativeCurrency extends NativeCurrency {
  equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId
  }

  get wrapped(): Token {
    if (!isFantom(this.chainId)) throw new Error('Not fantom')
    const wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId]
    invariant(wrapped instanceof Token)
    return wrapped
  }

  public constructor(chainId: number) {
    if (!isFantom(chainId)) throw new Error('Not fantom')
    super(chainId, 18, 'FTM', 'Fantom FTM')
  }
}

class AndromedaNativeCurrency extends NativeCurrency {
  equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId
  }

  get wrapped(): Token {
    if (!isAndromeda(this.chainId)) throw new Error('Not andromeda')
    const wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId]
    invariant(wrapped instanceof Token)
    return wrapped
  }

  public constructor(chainId: number) {
    if (!isAndromeda(chainId)) throw new Error('Not andromeda')
    super(chainId, 18, 'Metis', 'Andromeda Metis')
  }
}
class GnosisNativeCurrency extends NativeCurrency {
  equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId
  }

  get wrapped(): Token {
    if (!isGnosis(this.chainId)) throw new Error('Not gnosis')
    const wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId]
    invariant(wrapped instanceof Token)
    return wrapped
  }

  public constructor(chainId: number) {
    if (!isGnosis(chainId)) throw new Error('Not gnosis')
    super(chainId, 18, 'xDAI', 'Gnosis xDAI')
  }
}

class KuCoinNativeCurrency extends NativeCurrency {
  equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId
  }

  get wrapped(): Token {
    if (!isKuCoin(this.chainId)) throw new Error('Not kuCoin')
    const wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId]
    invariant(wrapped instanceof Token)
    return wrapped
  }

  public constructor(chainId: number) {
    if (!isKuCoin(chainId)) throw new Error('Not kuCoin')
    super(chainId, 18, 'KCS', 'KuCoin KCS')
  }
}

class ExtendedEther extends Ether {
  public get wrapped(): Token {
    const wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId]
    if (wrapped) return wrapped
    throw new Error('Unsupported chain ID')
  }

  private static _cachedExtendedEther: { [chainId: number]: NativeCurrency } = {}

  public static onChain(chainId: number): ExtendedEther {
    return this._cachedExtendedEther[chainId] ?? (this._cachedExtendedEther[chainId] = new ExtendedEther(chainId))
  }
}

const cachedNativeCurrency: { [chainId: number]: NativeCurrency | Token } = {}
export function nativeOnChain(chainId: number): NativeCurrency | Token {
  if (cachedNativeCurrency[chainId]) return cachedNativeCurrency[chainId]
  let nativeCurrency: NativeCurrency | Token
  if (isMatic(chainId)) {
    nativeCurrency = new MaticNativeCurrency(chainId)
  } else if (isCelo(chainId)) {
    nativeCurrency = getCeloNativeCurrency(chainId)
  } else if (isBsc(chainId)) {
    nativeCurrency = new BscNativeCurrency(chainId)
  } else if (isAvax(chainId)) {
    nativeCurrency = new AvaxNativeCurrency(chainId)
  } else if (isBNB(chainId)) {
    nativeCurrency = new BnbNativeCurrency(chainId)
  } else if (isMoonbeam(chainId)) {
    nativeCurrency = new MoonbeamNativeCurrency(chainId)
  } else if (isMoonriver(chainId)) {
    nativeCurrency = new MoonriverNativeCurrency(chainId)
  } else if (isFantom(chainId)) {
    nativeCurrency = new FantomNativeCurrency(chainId)
  } else if (isAndromeda(chainId)) {
    nativeCurrency = new AndromedaNativeCurrency(chainId)
  } else if (isGnosis(chainId)) {
    nativeCurrency = new GnosisNativeCurrency(chainId)
  } else if (isKuCoin(chainId)) {
    nativeCurrency = new KuCoinNativeCurrency(chainId)
  } else {
    nativeCurrency = ExtendedEther.onChain(chainId)
  }
  return (cachedNativeCurrency[chainId] = nativeCurrency)
}

export const TOKEN_SHORTHANDS: { [shorthand: string]: { [chainId in SupportedChainId]?: string } } = {
  USDC: {
    [SupportedChainId.MAINNET]: USDC_MAINNET.address,
    [SupportedChainId.ARBITRUM_ONE]: USDC_ARBITRUM.address,
    [SupportedChainId.ARBITRUM_GOERLI]: USDC_ARBITRUM_GOERLI.address,
    [SupportedChainId.OPTIMISM]: USDC_OPTIMISM.address,
    [SupportedChainId.OPTIMISM_GOERLI]: USDC_OPTIMISM_GOERLI.address,
    [SupportedChainId.POLYGON]: USDC_POLYGON.address,
    [SupportedChainId.POLYGON_MUMBAI]: USDC_POLYGON_MUMBAI.address,
    [SupportedChainId.BNB]: USDC_BSC.address,
    [SupportedChainId.CELO]: PORTAL_USDC_CELO.address,
    [SupportedChainId.CELO_ALFAJORES]: PORTAL_USDC_CELO.address,
    [SupportedChainId.GOERLI]: USDC_GOERLI.address,
    [SupportedChainId.AVALANCHE]: USDC_AVALANCHE.address,
    [SupportedChainId.BINANCE]: USDC_BINANCE.address,
    [SupportedChainId.MOONRIVER]: USDC_MOONRIVER.address,
    [SupportedChainId.FANTOM]: USDC_FANTOM.address,
    [SupportedChainId.ANDROMEDA]: USDC_ANDROMEDA.address,
    [SupportedChainId.GNOSIS]: USDC_GNOSIS.address,
    [SupportedChainId.KUCOIN]: USDC_KUCOIN.address,
  },
}
