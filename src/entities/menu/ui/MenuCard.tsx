import styled from 'styled-components';
import type { MenuDish } from '../model';

interface MenuCardProps {
  dish: MenuDish;
  onClick?: () => void;
}

const CardRoot = styled.article`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  background-color: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  cursor: pointer;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
    transition:
      box-shadow 0.15s ease,
      transform 0.15s ease;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const CardBody = styled.div`
  padding: 8px 10px 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 10px;
`;

const Price = styled.span`
  font-size: 13px;
  color: #666666;
`;

export function MenuCard({ dish, onClick }: MenuCardProps) {
  return (
    <CardRoot onClick={onClick}>
      <ImageWrapper>
        <img src={dish.image} alt={dish.title} />
      </ImageWrapper>
      <CardBody>
        <Title>{dish.title}</Title>
        <Price>{dish.price} ₽</Price>
      </CardBody>
    </CardRoot>
  );
}
