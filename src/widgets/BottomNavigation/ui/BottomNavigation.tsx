import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { getNavigationItems } from '@shared/config/navigation'
import Icon from '@shared/ui/Icon'
import type { RootState } from '@app/store'
import { selectCartTotalCount } from '@features/cart/model'

const BottomNavRoot = styled.nav`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 8px 16px;
  padding-bottom: calc(8px + env(safe-area-inset-bottom));
  background-color: #ffffff;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.12);
  z-index: 150;
  display: none;

  @media (max-width: 800px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const BottomNavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  width: 100%;
  max-width: 420px;
  gap: 8px;

  & > li {
    flex: 1;
  }
`

const BottomNavItemButton = styled.button<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 100%;
  padding: 6px 4px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  background-color: ${({ $active }) => ($active ? '#e6f0ff' : 'transparent')};

  &:hover {
    background-color: ${({ $active }) => ($active ? '#d9e6ff' : '#f5f5f5')};
  }
`

const BottomNavLabel = styled.span`
  font-size: 10px;

  @media (min-width: 480px) and (max-width: 800px) {
    font-size: 11px;
  }
`

const BottomNavIcon = styled(Icon)`
  font-size: 18px;

  @media (min-width: 480px) and (max-width: 800px) {
    font-size: 20px;
  }
`

const IconWithBadge = styled.div`
  position: relative;
  display: inline-flex;
`

const CartBadge = styled.span`
  position: absolute;
  top: -4px;
  right: -8px;
  min-width: 16px;
  padding: 0 4px;
  border-radius: 999px;
  background-color: #ff4d4f;
  color: #ffffff;
  font-size: 10px;
  line-height: 16px;
  text-align: center;
`

function BottomNavigation() {
	const location = useLocation()
	const navigate = useNavigate()
	const cartCount = useSelector((state: RootState) => selectCartTotalCount(state))

	const navigationItems = getNavigationItems()

	return (
		<BottomNavRoot>
			<BottomNavList>
				{navigationItems.map((item) => (
					<li key={item.id}>
						<BottomNavItemButton
							type="button"
							$active={location.pathname === item.path}
							onClick={() => navigate(item.path)}
						>
							<IconWithBadge>
								<BottomNavIcon name={item.iconName} />
								{item.id === 'cart' && cartCount > 0 && <CartBadge>{cartCount}</CartBadge>}
							</IconWithBadge>
							<BottomNavLabel>{item.label}</BottomNavLabel>
						</BottomNavItemButton>
					</li>
				))}
			</BottomNavList>
		</BottomNavRoot>
	)
}

export default BottomNavigation
