import type { TokenInfo, TokenList } from '@uniswap/token-lists'

export function formatMoonriverList(tokenArray: TokenInfo[]): TokenList {
  return {
    name: 'Moonriver SushiSwap Tokenlist',
    logoURI: 'https://raw.githubusercontent.com/sushiswap/list/master/logos/token-logos/token/movr.jpg',
    timestamp: '2022-10-31T00:00:00+00:00',
    version: {
      major: 1,
      minor: 0,
      patch: 0,
    },
    keywords: ['sushiswap', 'moonriver'],
    tags: {
      type: {
        name: 'moonriver token list',
        description: 'sushiswap token list for moonriver',
      },
    },
    tokens: tokenArray,
  }
}

export function formatFantomList(tokenArray: TokenInfo[]): TokenList {
  return {
    name: 'Fantom SushiSwap Tokenlist',
    logoURI: 'https://raw.githubusercontent.com/sushiswap/list/master/logos/token-logos/token/ftm.jpg',
    timestamp: '2022-10-31T00:00:00+00:00',
    version: {
      major: 1,
      minor: 0,
      patch: 0,
    },
    keywords: ['sushiswap', 'fantom'],
    tags: {
      type: {
        name: 'fantom token list',
        description: 'sushiswap token list for fantom',
      },
    },
    tokens: tokenArray,
  }
}

export function formatGnosisList(tokenArray: TokenInfo[]): TokenList {
  return {
    name: 'Gnosis SushiSwap Tokenlist',
    logoURI:
      'https://raw.githubusercontent.com/sushiswap/list/master/logos/token-logos/network/xdai/0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d.jpg',
    timestamp: '2022-10-31T00:00:00+00:00',
    version: {
      major: 1,
      minor: 0,
      patch: 0,
    },
    keywords: ['sushiswap', 'gnosis'],
    tags: {
      type: {
        name: 'gnosis token list',
        description: 'sushiswap token list for gnosis',
      },
    },
    tokens: tokenArray,
  }
}

export function formatKuCoinList(listInfo: any): TokenList {
  return {
    name: 'KuSwap Tokenlist',
    logoURI: listInfo.logoURI,
    timestamp: '2022-10-31T00:00:00+00:00',
    version: listInfo.version,
    keywords: ['sushiswap', 'kuswap', 'ku', 'swap'],
    tags: {
      type: {
        name: 'kuswap token list',
        description: 'sushiswap token list for kuswap.finance',
      },
    },
    tokens: listInfo.tokens,
  }
}
