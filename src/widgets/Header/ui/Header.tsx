import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getNavigationItems } from '@shared/config/navigation';
import Icon from '@shared/ui/Icon';
import projectLogoSrc from '@shared/assets/images/logo/logo.png';
import type { RootState } from '@app/store';
import { selectCartTotalCount } from '@features/cart/model';
import { findDishBySlug } from '@entities/menu/model';

const HeaderRoot = styled.header`
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  background-color: #ffffff;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const HeaderBackButton = styled.button`
  display: inline-flex;
  align-items: center;
  line-height: 0;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 999px;
  border: none;
  background-color: #f5f5f5;
  cursor: pointer;
  font-size: 13px;
  color: #333333;
  height: 32px;

  &:hover {
    background-color: #e6e6e6;
  }
`;

const HeaderLogo = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoImage = styled.img`
  height: 32px;
  object-fit: contain;
`;

const HeaderNav = styled.nav`
  display: none;

  @media (max-width: 1500px) and (min-width: 801px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const HeaderNavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 16px;
`;

const HeaderNavItemButton = styled.button<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 100%;
  padding: 6px 8px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  background-color: ${({ $active }) => ($active ? '#e6f0ff' : 'transparent')};

  &:hover {
    background-color: ${({ $active }) => ($active ? '#d9e6ff' : '#f5f5f5')};
  }
`;

const HeaderNavLabel = styled.span`
  font-size: 11px;

  @media (max-width: 1100px) {
    font-size: 10px;
  }

  @media (min-width: 1300px) and (max-width: 1500px) {
    font-size: 12px;
  }
`;

const HeaderNavIcon = styled(Icon)`
  font-size: 18px;

  @media (max-width: 1100px) {
    font-size: 16px;
  }

  @media (min-width: 1300px) and (max-width: 1500px) {
    font-size: 20px;
  }
`;

const IconWithBadge = styled.div`
  position: relative;
  display: inline-flex;
`;

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
`;

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { dishSlug } = useParams<{ dishSlug?: string }>();
  const cartCount = useSelector((state: RootState) => selectCartTotalCount(state));

  const isHomePage = location.pathname === '/';
  const navigationItems = getNavigationItems();

  const isDishPage = Boolean(dishSlug);

  const handleBackClick = () => {
    if (isDishPage && dishSlug) {
      const result = findDishBySlug(dishSlug);
      if (result) {
        const { category, dish } = result;
        navigate('/', { state: { categoryId: category.id, scrollToSlug: dish.slug } });
        return;
      }
    }

    navigate('/');
  };

  return (
    <HeaderRoot>
      <HeaderLeft>
        {!isHomePage && (
          <HeaderBackButton type="button" onClick={handleBackClick}>
            <Icon name="arrow-left-line" />
            Назад
          </HeaderBackButton>
        )}
      </HeaderLeft>
      <HeaderLogo>
        <LogoImage src={projectLogoSrc} alt="Shablon" />
      </HeaderLogo>
      <HeaderNav>
        <HeaderNavList>
          {navigationItems.map((item) => (
            <li key={item.id}>
              <HeaderNavItemButton
                type="button"
                $active={location.pathname === item.path}
                onClick={() => navigate(item.path)}
              >
                <IconWithBadge>
                  <HeaderNavIcon name={item.iconName} />
                  {item.id === 'cart' && cartCount > 0 && <CartBadge>{cartCount}</CartBadge>}
                </IconWithBadge>
                <HeaderNavLabel>{item.label}</HeaderNavLabel>
              </HeaderNavItemButton>
            </li>
          ))}
        </HeaderNavList>
      </HeaderNav>
    </HeaderRoot>
  );
}

export default Header;
