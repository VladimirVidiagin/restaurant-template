import styled from 'styled-components';
import AdvertisementCardsBlock from '@widgets/AdvertisementCardsBlock';
import Menu from '@widgets/Menu';
import type { MenuCategory, MenuCategoryId } from '@entities/menu/model';

interface HomePageProps {
  menuCategories: MenuCategory[];
  selectedCategoryId: MenuCategoryId;
  onSelectCategory: (categoryId: MenuCategoryId) => void;
  scrollToDishSlug?: string;
}

const HomePageRoot = styled.main`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

function HomePage({
  menuCategories,
  selectedCategoryId,
  onSelectCategory,
  scrollToDishSlug,
}: HomePageProps) {
  return (
    <HomePageRoot>
      <AdvertisementCardsBlock />
      <Menu
        categories={menuCategories}
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={onSelectCategory}
        scrollToDishSlug={scrollToDishSlug}
      />
    </HomePageRoot>
  );
}

export default HomePage;
