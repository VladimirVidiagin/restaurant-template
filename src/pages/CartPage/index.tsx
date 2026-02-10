import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { findDishBySlug } from '@entities/menu/model';
import type { RootState } from '@app/store';
import { selectCartItemsMap } from '@features/cart/model';
import AddToCartControl from '@features/cart/ui/AddToCartControl';

const PageRoot = styled.main`
  padding: 24px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
`;

const EmptyState = styled.div`
  font-size: 16px;
  color: #666666;
`;

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ItemCard = styled.article`
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 12px;
  padding: 12px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
`;

const ItemImageWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 80px;
  overflow: hidden;
  border-radius: 8px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ItemTitle = styled.h2`
  margin: 0;
  font-size: 16px;
`;

const ItemPrice = styled.div`
  font-size: 14px;
  color: #444444;
`;

const ItemTotal = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
`;

const ItemBottomRow = styled.div`
  margin-top: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Summary = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding-top: 16px;
  border-top: 1px solid #eeeeee;
`;

const SummaryText = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

const OrderButton = styled.button`
  padding: 10px 18px;
  border-radius: 999px;
  border: none;
  background-color: #111111;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

function CartPage() {
  const itemsMap = useSelector((state: RootState) => selectCartItemsMap(state));

  const cartItems = useMemo(() => {
    const entries = Object.entries(itemsMap);

    return entries
      .map(([slug, quantity]) => {
        const result = findDishBySlug(slug);
        if (!result) return null;

        const { dish } = result;
        return { slug, dish, quantity };
      })
      .filter(
        (
          item
        ): item is {
          slug: string;
          dish: NonNullable<ReturnType<typeof findDishBySlug>>['dish'];
          quantity: number;
        } => Boolean(item)
      );
  }, [itemsMap]);

  const totalAmount = cartItems.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);

  return (
    <PageRoot>
      <Title>Корзина</Title>
      {cartItems.length === 0 ? (
        <EmptyState>Ваша корзина пуста.</EmptyState>
      ) : (
        <>
          <ItemsList>
            {cartItems.map(({ slug, dish, quantity }) => (
              <ItemCard key={slug}>
                <ItemImageWrapper>
                  <img src={dish.image} alt={dish.title} />
                </ItemImageWrapper>
                <ItemInfo>
                  <ItemTitle>{dish.title}</ItemTitle>
                  <ItemPrice>{dish.price} ₽ за штуку</ItemPrice>
                  <ItemBottomRow>
                    <AddToCartControl slug={slug} inline />
                    <ItemTotal>{dish.price * quantity} ₽</ItemTotal>
                  </ItemBottomRow>
                </ItemInfo>
              </ItemCard>
            ))}
          </ItemsList>
          <Summary>
            <SummaryText>Итого: {totalAmount} ₽</SummaryText>
            <OrderButton type="button" disabled>
              Заказать
            </OrderButton>
          </Summary>
        </>
      )}
    </PageRoot>
  );
}

export default CartPage;
