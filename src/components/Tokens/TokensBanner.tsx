import { Trans } from '@lingui/macro'
import { useWeb3React } from '@web3-react/core'
import { ElementName, Event, EventName } from 'analytics/constants'
import { TraceEvent } from 'analytics/TraceEvent'
import { chainIdToBackendName } from 'graphql/data/util'
import { X } from 'react-feather'
import { Link } from 'react-router-dom'
import { useShowTokensPromoBanner } from 'state/user/hooks'
import styled, { useTheme } from 'styled-components/macro'
import { opacify } from 'theme/utils'
import { Z_INDEX } from 'theme/zIndex'

const BackgroundColor = styled(Link)<{ show: boolean }>`
  background-color: ${({ theme }) => (theme.darkMode ? theme.backgroundScrim : '#0D0BB1')};
  border: 1px solid ${({ theme }) => theme.backgroundOutline};
  border-radius: 12px;
  bottom: -70px;
  box-shadow: ${({ theme }) => theme.deepShadow};
  display: ${({ show }) => (show ? 'block' : 'none')};
  height: 88px;
  position: absolute;
  right: clamp(0px, 1vw, 16px);
  text-decoration: none;
  width: 140px;
  z-index: ${Z_INDEX.sticky};
`
const PopupContainer = styled.div`
  background-color: ${({ theme }) => (theme.darkMode ? theme.backgroundScrim : opacify(60, '#0D0BB1'))};
  background-image: url(./static/media/tokensPromoLight.bef97fb5.png);
  background-size: cover;
  background-blend-mode: overlay;
  border-radius: 20px;
  color: #f7eded;
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  padding: 20px 16px 12px 20px;

  transition: ${({
    theme: {
      transition: { duration, timing },
    },
  }) => `${duration.slow} opacity ${timing.in}`};
`
const Header = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`
const HeaderText = styled.span`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
`

const Description = styled.span`
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  width: max(212px, calc(100% - 36px));
`

export default function TokensBanner() {
  const theme = useTheme()
  const [showTokensPromoBanner, setShowTokensPromoBanner] = useShowTokensPromoBanner()
  const { chainId: connectedChainId } = useWeb3React()
  const chainName = chainIdToBackendName(connectedChainId).toLowerCase()

  return (
    <BackgroundColor show={showTokensPromoBanner} to={`/tokens/${chainName}`}>
      <TraceEvent events={[Event.onClick]} name={EventName.EXPLORE_BANNER_CLICKED} element={ElementName.EXPLORE_BANNER}>
        <PopupContainer>
          <Header>
            <HeaderText>
              <Trans>
                <a href="https://svgshare.com/s/oEL">
                  <img src="https://svgshare.com/i/oEL.svg" title="" />
                </a>
              </Trans>
            </HeaderText>
            <X
              size={20}
              color={theme.textSecondary}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setShowTokensPromoBanner(false)
              }}
              style={{ cursor: 'pointer' }}
            />
          </Header>

          <Description>
            <Trans>www.gtps.finance</Trans>
          </Description>
        </PopupContainer>
      </TraceEvent>
    </BackgroundColor>
  )
}
