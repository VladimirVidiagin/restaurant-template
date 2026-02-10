import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import type { MenuCategory, MenuCategoryId } from '@entities/menu/model';
import { getNavigationItems } from '@shared/config/navigation';
import Icon from '@shared/ui/Icon';
import type { RootState } from '@app/store';
import { selectCartTotalCount } from '@features/cart/model';

interface SiderProps {
  categories: MenuCategory[];
  selectedCategoryId: MenuCategoryId;
  onSelectCategory: (categoryId: MenuCategoryId) => void;
}

const SiderRoot = styled.aside`
  width: 260px;
  padding: 16px 12px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  position: fixed;
  top: 64px;
  right: 0;
  height: 100%;
  overflow-y: auto;
  z-index: 90;

  @media (max-width: 1500px) {
    display: none;
  }
`;

const SectionTitle = styled.h2`
  margin: 0 0 12px;
  font-size: 18px;
`;

const NavSection = styled.section`
  margin-bottom: 24px;
`;

const NavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CategoriesList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const NavItemButton = styled.button<{ $active: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  text-align: left;
  padding: 8px 10px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background-color: ${({ $active }) => ($active ? '#e6f0ff' : 'transparent')};
  font-size: 14px;

  &:hover {
    background-color: #f0f4ff;
  }
`;

const NavItemIcon = styled(Icon)`
  font-size: 18px;
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

const CategoryItemButton = styled.button<{ $active: boolean }>`
  width: 100%;
  text-align: left;
  padding: 8px 10px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background-color: ${({ $active }) => ($active ? '#f0f0f0' : 'transparent')};
  font-size: 14px;

  &:hover {
    background-color: #f5f5f5;
  }
`;

function Sider({ categories, selectedCategoryId, onSelectCategory }: SiderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const cartCount = useSelector((state: RootState) => selectCartTotalCount(state));

  const navigationItems = getNavigationItems();

  return (
    <SiderRoot>
      <NavSection>
        <SectionTitle>Навигация</SectionTitle>
        <NavList>
          {navigationItems.map((item) => (
            <li key={item.id}>
              <NavItemButton
                type="button"
                $active={location.pathname === item.path}
                onClick={() => navigate(item.path)}
              >
                <IconWithBadge>
                  <NavItemIcon name={item.iconName} />
                  {item.id === 'cart' && cartCount > 0 && <CartBadge>{cartCount}</CartBadge>}
                </IconWithBadge>
                {item.label}
              </NavItemButton>
            </li>
          ))}
        </NavList>
      </NavSection>
      <SectionTitle>Меню</SectionTitle>
      <CategoriesList>
        {categories.map((category) => (
          <li key={category.id}>
            <CategoryItemButton
              type="button"
              $active={category.id === selectedCategoryId}
              onClick={() => onSelectCategory(category.id)}
            >
              {category.name}
            </CategoryItemButton>
          </li>
        ))}
      </CategoriesList>
    </SiderRoot>
  );
}

export default Sider;
