import { SupportedChainId } from 'constants/chains'

import { BaseVariant, FeatureFlag, useBaseFlag } from '../index'

export function useBaseEnabledFlag(): BaseVariant {
  return useBaseFlag(FeatureFlag.baseEnabled)
}

export function useBaseEnabled(): boolean {
  return useBaseEnabledFlag() === BaseVariant.Enabled
}

export function useBaseEnabledChains(): Record<number, boolean> {
  const baseEnabled = useBaseEnabled()
  return {
    [SupportedChainId.BASE]: baseEnabled,
  }
}
