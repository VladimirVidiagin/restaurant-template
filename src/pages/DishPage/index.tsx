import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { findDishBySlug } from '@entities/menu/model';
import AddToCartControl from '@features/cart/ui/AddToCartControl';

const PageRoot = styled.main`
  padding: 18px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  max-width: 800px;
  margin: 0 auto;
`;

const ContentLayout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  flex: 1;
  min-width: 0;

  img {
    width: 100%;
    border-radius: 12px;
    object-fit: cover;
  }
`;

const InfoColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 22px;
`;

const CategoryName = styled.div`
  font-size: 13px;
  color: #777777;
`;

const Description = styled.p`
  margin: 8px 0 0;
  font-size: 14px;
  line-height: 1.5;
`;

const Price = styled.div`
  margin-top: 12px;
  font-size: 16px;
  font-weight: 600;
`;

function DishPage() {
  const { dishSlug } = useParams<{ dishSlug: string }>();

  const result = useMemo(() => {
    if (!dishSlug) return null;
    return findDishBySlug(dishSlug);
  }, [dishSlug]);

  if (!result) {
    return <PageRoot>Блюдо не найдено</PageRoot>;
  }

  const { category, dish } = result;

  return (
    <PageRoot>
      <ContentLayout>
        <ImageWrapper>
          <img src={dish.image} alt={dish.title} />
        </ImageWrapper>
        <InfoColumn>
          <Title>{dish.title}</Title>
          <CategoryName>{category.name}</CategoryName>
          <Description>{dish.description}</Description>
          <Price>{dish.price} ₽</Price>
        </InfoColumn>
        <AddToCartControl slug={dish.slug} />
      </ContentLayout>
    </PageRoot>
  );
}

export default DishPage;
