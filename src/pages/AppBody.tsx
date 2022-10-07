import { RedesignVariant, useRedesignFlag } from 'featureFlags/flags/redesign'
import React from 'react'
import styled from 'styled-components/macro'
import { Z_INDEX } from 'theme/zIndex'

export const BodyWrapper = styled.main<{ margin?: string; maxWidth?: string; redesignFlag?: boolean }>`
  position: relative;
  margin-top: ${({ margin }) => margin ?? '0px'};
  max-width: ${({ maxWidth, redesignFlag }) => maxWidth ?? (redesignFlag ? '420px' : '480px')};
  width: 100%;
  background: transparent;
  border-radius: ${({ redesignFlag }) => (redesignFlag ? '16px' : '24px')};
  border: 1px solid ${({ theme, redesignFlag }) => (redesignFlag ? theme.backgroundOutline : 'transparent')};
  margin-top: 1rem;
  margin-left: auto;
  margin-right: auto;
  z-index: ${Z_INDEX.deprecated_content};
  font-feature-settings: ${({ redesignFlag }) =>
    redesignFlag ? "'ss01' on, 'ss02' on, 'cv01' on, 'cv03' on" : "'ss01' on, 'ss02' on, 'cv01' on, 'cv03' on"};
  box-shadow: ${({ redesignFlag }) =>
    !redesignFlag &&
    '0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04), 0px 24px 32px rgba(0, 0, 0, 0.01)'};

  * {
    box-sizing: border-box;

    &::-webkit-scrollbar {
      width: 8px;
      background: #1e2033;
    }

    &::-webkit-scrollbar-track {
      background: #1e2033;
      border-radius: 13px;
      border: 1px solid #3e436b66;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #898dcb;
      border-radius: 13px;
      max-height: 70px;
    }

    &::-moz-scrollbar-thumb {
      border-radius: 10px;
    }

    scrollbar-width: thin;
    scrollbar-color: #898dcb #1e2033;
  }
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children, ...rest }: { children: React.ReactNode }) {
  const redesignFlag = useRedesignFlag()
  const redesignFlagEnabled = redesignFlag === RedesignVariant.Enabled
  return (
    <BodyWrapper {...rest} redesignFlag={redesignFlagEnabled}>
      {children}
    </BodyWrapper>
  )
}
