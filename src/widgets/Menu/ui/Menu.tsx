import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import type { MenuCategory, MenuCategoryId } from '@entities/menu/model';
import { MenuCard } from '@entities/menu/ui';
import AddToCartControl from '@features/cart/ui/AddToCartControl';

interface MenuWidgetProps {
  categories: MenuCategory[];
  selectedCategoryId: MenuCategoryId;
  onSelectCategory: (categoryId: MenuCategoryId) => void;
  scrollToDishSlug?: string;
}

const MenuRoot = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
`;

const MenuHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MenuTitle = styled.h2`
  margin: 0;
  font-size: 22px;
`;

const MobileChipsWrapper = styled.div`
  @media (min-width: 1501px) {
    display: none;
  }
`;

const ChipsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const CategoryChip = styled.button<{ $active?: boolean }>`
  border: none;
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  background-color: ${({ $active }) => ($active ? '#111111' : '#f0f0f0')};
  color: ${({ $active }) => ($active ? '#ffffff' : '#111111')};

  &:hover {
    background-color: ${({ $active }) => ($active ? '#222222' : '#e0e0e0')};
  }
`;

const CardsGrid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const DishCardWrapper = styled.div`
  position: relative;
  height: 100%;
`;

function Menu({
  categories,
  selectedCategoryId,
  onSelectCategory,
  scrollToDishSlug,
}: MenuWidgetProps) {
  const navigate = useNavigate();
  const [showAllMobileCategories, setShowAllMobileCategories] = useState(false);
  const dishRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [scrolledSlug, setScrolledSlug] = useState<string | null>(null);
  const activeCategory =
    categories.find((category) => category.id === selectedCategoryId) ?? categories[0];

  const MOBILE_VISIBLE_CHIPS = 3;
  const hasExtraCategories = categories.length > MOBILE_VISIBLE_CHIPS;
  const visibleMobileCategories =
    hasExtraCategories && !showAllMobileCategories
      ? categories.slice(0, MOBILE_VISIBLE_CHIPS)
      : categories;

  useEffect(() => {
    if (!scrollToDishSlug || scrollToDishSlug === scrolledSlug) {
      return;
    }

    const element = dishRefs.current[scrollToDishSlug];

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setScrolledSlug(scrollToDishSlug);
    }
  }, [scrollToDishSlug, scrolledSlug]);

  return (
    <MenuRoot>
      <MenuHeader>
        <MenuTitle>Меню / {activeCategory?.name}</MenuTitle>
        <MobileChipsWrapper>
          <ChipsRow>
            {visibleMobileCategories.map((category) => (
              <CategoryChip
                key={category.id}
                type="button"
                $active={category.id === activeCategory?.id}
                onClick={() => onSelectCategory(category.id)}
              >
                {category.name}
              </CategoryChip>
            ))}
            {hasExtraCategories && !showAllMobileCategories && (
              <CategoryChip type="button" onClick={() => setShowAllMobileCategories(true)}>
                Еще
              </CategoryChip>
            )}
          </ChipsRow>
        </MobileChipsWrapper>
      </MenuHeader>

      {activeCategory && (
        <CardsGrid>
          {activeCategory.dishes.map((dish) => (
            <DishCardWrapper
              key={dish.id}
              ref={(element) => {
                if (element) {
                  dishRefs.current[dish.slug] = element;
                }
              }}
            >
              <MenuCard dish={dish} onClick={() => navigate(`/menu/${dish.slug}`)} />
              <AddToCartControl slug={dish.slug} />
            </DishCardWrapper>
          ))}
        </CardsGrid>
      )}
    </MenuRoot>
  );
}

export default Menu;
