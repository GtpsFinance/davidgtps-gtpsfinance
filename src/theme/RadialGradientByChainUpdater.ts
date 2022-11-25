import { useWeb3React } from '@web3-react/core'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDarkModeManager } from 'state/user/hooks'

import { SupportedChainId } from '../constants/chains'
import { colorsDark, colorsLight } from './colors'

const initialStyles = {
  width: '100vw',
  height: '100vh',
  transform: 'rotateZ(45deg)',
}
const backgroundResetStyles = {
  width: '100vw',
  height: '100vh',
  transform: 'rotateZ(45deg)',
}

type TargetBackgroundStyles = typeof initialStyles | typeof backgroundResetStyles

const backgroundRadialGradientElement = document.getElementById('background-radial-gradient')
const setBackground = (newValues: TargetBackgroundStyles) =>
  Object.entries(newValues).forEach(([key, value]) => {
    if (backgroundRadialGradientElement) {
      backgroundRadialGradientElement.style[key as keyof typeof backgroundResetStyles] = value
    }
  })
export default function RadialGradientByChainUpdater(): null {
  const { chainId } = useWeb3React()
  const [darkMode] = useDarkModeManager()
  const { pathname } = useLocation()
  const isNftPage = pathname.startsWith('/nfts')

  // manage background color
  useEffect(() => {
    if (!backgroundRadialGradientElement) {
      return
    }

    if (isNftPage) {
      setBackground(initialStyles)
      backgroundRadialGradientElement.style.background = darkMode
        ? colorsDark.backgroundBackdrop
        : colorsLight.backgroundBackdrop
      return
    }

    switch (chainId) {
      case SupportedChainId.ARBITRUM_ONE:
      case SupportedChainId.ARBITRUM_RINKEBY:
        setBackground(backgroundResetStyles)
        const arbitrumLightGradient =
          'radial-gradient(100% 100% at 50% 0%, rgba(25, 237, 239, 0.7) 0%, rgba(37, 231, 222, 0.6536) 49.48%, rgba(25, 237, 239, 0) 100%), #25e7deb3'
        const arbitrumDarkGradient =
          'radial-gradient(100% 100% at 50% 0%, rgba(10, 41, 75, 0.7) 0%, rgba(34, 30, 48, 0.6536) 49.48%, rgba(31, 33, 40, 0) 100%), #0D0E0E'
        backgroundRadialGradientElement.style.background = darkMode ? arbitrumDarkGradient : arbitrumLightGradient
        break
      case SupportedChainId.OPTIMISM:
      case SupportedChainId.OPTIMISM_GOERLI:
        setBackground(backgroundResetStyles)
        const optimismLightGradient =
          'radial-gradient(100% 100% at 50% 0%, rgba(255, 0, 0, 0.8) 0%, rgba(255, 0, 0, 0.6958) 50.52%, rgba(255, 0, 0, 0) 100%), #ff0000'
        const optimismDarkGradient =
          'radial-gradient(100% 100% at 50% 0%, rgba(62, 46, 56, 0.8) 0%, rgba(44, 31, 45, 0.6958) 50.52%, rgba(31, 33, 40, 0) 100%), #0D0E0E'
        backgroundRadialGradientElement.style.background = darkMode ? optimismDarkGradient : optimismLightGradient
        break
      case SupportedChainId.POLYGON:
      case SupportedChainId.POLYGON_MUMBAI:
        setBackground(backgroundResetStyles)
        const polygonLightGradient =
          'radial-gradient(100% 100% at 50% 0%, rgba(128, 0, 128, 0.2) 0%, rgba(128, 0, 128, 0.05) 52.6%, rgba(128, 0, 128, 0) 100%), #800080'
        const polygonDarkGradient =
          'radial-gradient(100% 100% at 50% 0%, rgba(128, 71, 229, 0.2) 0%, rgba(200, 168, 255, 0.05) 52.6%, rgba(0, 0, 0, 0) 100%), #0D0E0E'
        backgroundRadialGradientElement.style.background = darkMode ? polygonDarkGradient : polygonLightGradient
        break
      case SupportedChainId.CELO:
      case SupportedChainId.CELO_ALFAJORES:
        setBackground(backgroundResetStyles)
        const celoLightGradient =
          'radial-gradient(100% 100% at 50% 0%, rgba(18, 217, 0, 0.7) 0%, rgba(18, 217, 0, 0.6536) 49.48%, rgba(18, 217, 0, 0) 100%), #12D900'
        const celoDarkGradient =
          'radial-gradient(100% 100% at 50% 0%, rgba(20, 49, 37, 0.29) 0%, rgba(12, 31, 23, 0.6536) 49.48%, rgba(31, 33, 40, 0) 100%, rgba(31, 33, 40, 0) 100%), #0D0E0E'
        backgroundRadialGradientElement.style.background = darkMode ? celoDarkGradient : celoLightGradient
        break
      default:
        setBackground(initialStyles)
        const defaultLightGradient =
          'radial-gradient(100% 100% at 50% 0%, rgba(27, 124, 237, 0.51) 0%, rgba(27, 124, 237, 0) 100%), #1b7ced'
        const defaultDarkGradient = 'linear-gradient(180deg, #202738 0%, #070816 100%)'
        backgroundRadialGradientElement.style.background = darkMode ? defaultDarkGradient : defaultLightGradient
    }
  }, [darkMode, chainId, isNftPage])
  return null
}
