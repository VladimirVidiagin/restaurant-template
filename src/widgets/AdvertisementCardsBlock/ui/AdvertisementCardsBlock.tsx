import styled from 'styled-components';
import AdvertisementCardsRow from '@/shared/ui/AdvertisementCardsRow';
import smallImg1 from '@/shared/assets/images/advertisement/small 1.jpg';
import smallImg2 from '@/shared/assets/images/advertisement/small 2.jpg';
import smallImg3 from '@/shared/assets/images/advertisement/small 3.jpg';
import smallImg4 from '@/shared/assets/images/advertisement/small 4.jpg';
// import mediumImg1 from '@/shared/assets/images/advertisement/medium 1.jpg';
// import mediumImg2 from '@/shared/assets/images/advertisement/medium 2.jpg';
// import mediumImg3 from '@/shared/assets/images/advertisement/medium 3.jpg';
// import mediumImg4 from '@/shared/assets/images/advertisement/medium 4.jpg';
import bigImg1 from '@/shared/assets/images/advertisement/big 1.jpg';
import bigImg2 from '@/shared/assets/images/advertisement/big 2.jpg';

const smallImages = [smallImg1, smallImg2, smallImg3, smallImg4];
// const mediumImages = [mediumImg1, mediumImg2, mediumImg3, mediumImg4];
const bigImages = [bigImg1, bigImg2];

const AdvertisementCardsBlockRoot = styled.section`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

function AdvertisementCardsBlock() {
  return (
    <AdvertisementCardsBlockRoot>
      {/* <AdvertisementCardsRow cardsSize="medium" images={mediumImages} /> */}
      <AdvertisementCardsRow cardsSize="big" images={bigImages} />
      <AdvertisementCardsRow cardsSize="small" images={smallImages} />
    </AdvertisementCardsBlockRoot>
  );
}

export default AdvertisementCardsBlock;
