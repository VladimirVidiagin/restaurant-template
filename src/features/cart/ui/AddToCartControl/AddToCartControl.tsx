import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import type { AppDispatch, RootState } from '@app/store';
import { addItem, decrementItem, selectCartQuantityBySlug } from '@features/cart/model';

interface AddToCartControlProps {
  slug: string;
  inline?: boolean;
}

const ControlWrapper = styled.div<{ $inline?: boolean }>`
  position: ${({ $inline }) => ($inline ? 'static' : 'absolute')};
  right: ${({ $inline }) => ($inline ? 'auto' : '8px')};
  bottom: ${({ $inline }) => ($inline ? 'auto' : '8px')};
`;

const ControlBody = styled.div<{ $hasItems: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  border-radius: 999px;
  background-color: #111111;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  box-sizing: border-box;
  height: 28px;
  width: ${({ $hasItems }) => ($hasItems ? '78px' : '28px')};
  padding: ${({ $hasItems }) => ($hasItems ? '2px 2px' : '2px')};
  gap: 4px;
  transition:
    padding 0.2s ease,
    width 0.2s ease;
  padding-bottom: 3px;
`;

const RoundButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  background-color: #111111;
  color: #ffffff;
  font-size: 18px;
  line-height: 1;
  padding: 0;
`;

const SmallButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  background-color: #111111;
  color: #ffffff;
  font-size: 18px;
  line-height: 1;
`;

const Counter = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  min-width: 20px;
  padding: 0 2px;
  font-size: 14px;
  color: #fff;
`;

function AddToCartControl({ slug, inline }: AddToCartControlProps) {
  const dispatch = useDispatch<AppDispatch>();
  const quantity = useSelector((state: RootState) => selectCartQuantityBySlug(state, slug));

  const handlePlus = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      dispatch(addItem({ slug }));
    },
    [dispatch, slug]
  );

  const handleMinus = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      dispatch(decrementItem({ slug }));
    },
    [dispatch, slug]
  );

  const hasItems = quantity > 0;

  return (
    <ControlWrapper $inline={inline}>
      <ControlBody $hasItems={hasItems}>
        {hasItems ? (
          <>
            <SmallButton type="button" onClick={handleMinus}>
              -
            </SmallButton>
            <Counter>{quantity}</Counter>
            <SmallButton type="button" onClick={handlePlus}>
              +
            </SmallButton>
          </>
        ) : (
          <RoundButton type="button" onClick={handlePlus}>
            +
          </RoundButton>
        )}
      </ControlBody>
    </ControlWrapper>
  );
}

export default AddToCartControl;
