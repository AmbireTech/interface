import { rootCssString } from 'nft/css/cssStringFromTheme'
import React, { useMemo } from 'react'
import { createGlobalStyle, css, ThemeProvider as StyledComponentsThemeProvider } from 'styled-components/macro'

import { useIsDarkMode } from '../state/user/hooks'
import { darkTheme, lightTheme } from './colors'
import { darkDeprecatedTheme, lightDeprecatedTheme } from './deprecatedColors'

// todo - remove and replace imports with a new path
export * from './components'
export * from './components/text'

export const MEDIA_WIDTHS = {
  deprecated_upToExtraSmall: 500,
  deprecated_upToSmall: 720,
  deprecated_upToMedium: 960,
  deprecated_upToLarge: 1280,
}

const deprecated_mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(
  MEDIA_WIDTHS
).reduce((acc, size) => {
  acc[size] = (a: any, b: any, c: any) => css`
    @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
      ${css(a, b, c)}
    }
  `
  return acc
}, {} as any)

export const BREAKPOINTS = {
  xs: 396,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
  xxxl: 1920,
}

// deprecated - please use the ones in styles.ts file
const transitions = {
  duration: {
    slow: '500ms',
    medium: '250ms',
    fast: '125ms',
  },
  timing: {
    ease: 'ease',
    in: 'ease-in',
    out: 'ease-out',
    inOut: 'ease-in-out',
  },
}

const opacities = {
  hover: 0.6,
  click: 0.4,
  disabled: 0.5,
  enabled: 1,
}

const fonts = {
  code: 'courier, courier new, serif',
}

function getSettings(darkMode: boolean) {
  return {
    grids: {
      xs: '4px',
      sm: '8px',
      md: '12px',
      lg: '24px',
      xl: '32px',
    },
    fonts,

    // shadows
    shadow1: darkMode ? '#000' : '#2F80ED',

    // media queries
    deprecated_mediaWidth: deprecated_mediaWidthTemplates,

    navHeight: 72,
    mobileBottomBarHeight: 52,

    // deprecated - please use hardcoded exported values instead of
    // adding to the theme object
    breakpoint: BREAKPOINTS,
    transition: transitions,
    opacity: opacities,
  }
}

// eslint-disable-next-line import/no-unused-modules -- used in styled.d.ts
export function getTheme(darkMode: boolean) {
  return {
    darkMode,
    ...(darkMode ? darkTheme : lightTheme),
    ...(darkMode ? darkDeprecatedTheme : lightDeprecatedTheme),
    ...getSettings(darkMode),
  }
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const darkMode = useIsDarkMode()
  const themeObject = useMemo(() => getTheme(darkMode), [darkMode])
  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
}

export const ThemedGlobalStyle = createGlobalStyle`

html {
  color: ${({ theme }) => theme.textPrimary};
  background-color: transparent !important;
}

summary::-webkit-details-marker {
  display:none;
}

:root {
  scrollbar-color: #898dcb #1e2033;
  scrollbar-width: thin;
}

::-webkit-scrollbar {
  height: 10px;
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #1c1e24;
}

::-webkit-scrollbar-thumb {
  background: #bbb;

  &:hover {
    background: #cfcfcf;
  }
}

* {
  &::-webkit-scrollbar {
    width: 8px;
    background: #898dcb #1e2033;
  }


  &::-webkit-scrollbar-track {
    background: #1e2033;
    border-radius: 13px;
    border: 1px solid #3e436b;
  }



  &::-webkit-scrollbar-thumb {
    background-color: #898dcb #1e2033;
    border-radius: 13px;
    max-height: 70px;
  }

  &::-moz-scrollbar-thumb {
    border-radius: 10px;
  }

  scrollbar-width: thin;
  scrollbar-color: #898dcb #1e2033;
}

a {
  color: ${({ theme }) => theme.accentAction}; 
}

:root {
  ${({ theme }) => rootCssString(theme.darkMode)}
}
`
