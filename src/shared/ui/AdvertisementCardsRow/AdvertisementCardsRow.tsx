import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

type CardsSize = 'small' | 'medium' | 'big';

interface AdvertisementCardsRowProps {
  cardsSize: CardsSize;
  images: string[];
}

interface SizeConfig {
  maxCards: number;
  height: number;
  maxWidth?: number;
  scrollEnabled: boolean;
}

const getSizeConfig = (size: CardsSize, viewportWidth: number, imagesCount: number): SizeConfig => {
  switch (size) {
    case 'medium': {
      let config: SizeConfig = { maxCards: 3, height: 280, scrollEnabled: true };

      if (viewportWidth < 320) {
        config = { maxCards: 4, height: 50, scrollEnabled: true };
      } else if (viewportWidth < 800) {
        config = { maxCards: 2, height: 280, maxWidth: 264, scrollEnabled: true };
      } else if (viewportWidth < 1000) {
        config = { maxCards: 2, height: 240, scrollEnabled: true };
      } else if (viewportWidth < 1200) {
        config = { maxCards: 2, height: 240, scrollEnabled: true };
      }

      return config;
    }

    case 'big': {
      let config: SizeConfig = { maxCards: 1, height: 317, scrollEnabled: true };

      if (viewportWidth < 300) {
        config = { maxCards: 1, height: 80, scrollEnabled: false };
      } else if (viewportWidth < 350) {
        config = { maxCards: 1, height: 100, scrollEnabled: true };
      } else if (viewportWidth < 400) {
        config = { maxCards: 1, height: 120, scrollEnabled: true };
      } else if (viewportWidth < 500) {
        config = { maxCards: 1, height: 140, scrollEnabled: true };
      } else if (viewportWidth < 600) {
        config = { maxCards: 1, height: 180, scrollEnabled: true };
      } else if (viewportWidth < 800) {
        config = { maxCards: 1, height: 220, scrollEnabled: true };
      }

      return config;
    }

    case 'small': {
      let config: SizeConfig = { maxCards: 3, height: 160, scrollEnabled: true };

      if (viewportWidth < 300) {
        config = { maxCards: imagesCount, height: 60, scrollEnabled: false };
      } else if (viewportWidth < 400) {
        config = { maxCards: imagesCount, height: 80, scrollEnabled: false };
      } else if (viewportWidth < 500) {
        config = { maxCards: imagesCount, height: 100, scrollEnabled: false };
      } else if (viewportWidth < 600) {
        config = { maxCards: imagesCount, height: 120, scrollEnabled: false };
      } else if (viewportWidth < 800) {
        config = { maxCards: imagesCount, height: 140, scrollEnabled: false };
      }
      return config;
    }
  }
};

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
`;

const CardsWrapper = styled.div<{
  $isScrolling: boolean;
  $maxCards: number;
  $vertical: boolean;
  $isGrid: boolean;
}>`
  display: ${(props) => (props.$isGrid ? 'grid' : 'flex')};
  flex-direction: ${(props) => (props.$vertical ? 'column' : 'row')};
  grid-template-columns: ${(props) => (props.$isGrid ? 'repeat(2, 1fr)' : 'none')};
  gap: ${(props) => (props.$maxCards === 1 ? 0 : 16)}px;
  align-items: center;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  scroll-snap-type: ${(props) => (props.$isGrid ? 'none' : 'x mandatory')};
  transition: ${(props) => (props.$isScrolling ? 'none' : 'transform 0.4s ease-in-out')};

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CardItem = styled.div<{ $height: number; $isGrid: boolean }>`
  flex-shrink: 0;
  height: ${(props) => props.$height}px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  scroll-snap-align: start;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ArrowButton = styled.button<{ $position: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => (props.$position === 'left' ? 'left: 8px;' : 'right: 8px;')}
  width: 32px;
  height: 32px;
  background-color: rgba(255, 255, 255, 0.9);
  color: #333;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 999px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  z-index: 10;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  transition:
    background-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.1s ease;

  &:hover {
    background-color: #ffffff;
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.16);
    transform: translateY(-50%) scale(1.05);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const ScrollContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

const CardsContent = styled.div<{ $maxCards: number; $height: number; $isGrid: boolean }>`
  flex: 1;
  overflow: hidden;
  display: flex;
  gap: 16px;
  ${CardsWrapper} {
    justify-content: space-between;
    width: 100%;
    scroll-behavior: smooth;
  }

  ${CardItem} {
    width: ${(props) =>
      props.$isGrid
        ? '100%'
        : `calc((100% - ${(props.$maxCards - 1) * 16}px) / ${props.$maxCards})`};
  }
`;

const DotsContainer = styled.div<{ $size: CardsSize }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  pointer-events: none;

  ${(props) =>
    props.$size === 'big'
      ? `
    position: absolute;
    left: 50%;
    bottom: 16px;
    transform: translateX(-50%);
  `
      : `
    position: relative;
    margin-top: 10px;
  `}
`;

const Dot = styled.div<{ $active: boolean; $size: CardsSize }>`
  border-radius: 50%;
  transition: all 0.2s ease;

  ${(props) => {
    if (props.$size === 'big') {
      return `
        width: ${props.$active ? 9 : 7}px;
        height: ${props.$active ? 9 : 7}px;
        background-color: ${props.$active ? '#FFFFFF' : 'transparent'};
        border: 1px solid rgba(255, 255, 255, ${props.$active ? 1 : 0.8});
      `;
    }

    // small / medium
    return `
      width: ${props.$active ? 9 : 7}px;
      height: ${props.$active ? 9 : 7}px;
      background-color: ${props.$active ? '#333333' : 'transparent'};
      border: 1px solid #333333;
    `;
  }}
`;

const AdvertisementCardsRow: React.FC<AdvertisementCardsRowProps> = ({ cardsSize, images }) => {
  const [viewportWidth, setViewportWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );
  const { maxCards, height, maxWidth, scrollEnabled } = getSizeConfig(
    cardsSize,
    viewportWidth,
    images.length
  );
  const isSmallGrid = cardsSize === 'small' && !scrollEnabled;
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(scrollEnabled && images.length > maxCards);
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);
  const [visibleEndIndex, setVisibleEndIndex] = useState(
    scrollEnabled
      ? Math.min(maxCards - 1, Math.max(0, images.length - 1))
      : Math.max(0, images.length - 1)
  );
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const updateScrollState = () => {
    const container = scrollContainerRef.current;

    if (!scrollEnabled || !container) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
      setVisibleStartIndex(0);
      setVisibleEndIndex(Math.max(0, images.length - 1));
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);

    const gapsCount = maxCards > 1 ? maxCards - 1 : 0;
    const totalGapsWidth = gapsCount * 16;
    const cardWidth = (clientWidth - totalGapsWidth) / maxCards;
    const step = cardWidth + (maxCards > 1 ? 16 : 0);

    const approxIndex = step > 0 ? Math.round(scrollLeft / step) : 0;
    const start = Math.max(0, Math.min(images.length - 1, approxIndex));
    const end = Math.max(start, Math.min(images.length - 1, start + maxCards - 1));

    setVisibleStartIndex(start);
    setVisibleEndIndex(end);
  };

  useEffect(() => {
    if (!scrollEnabled) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
      setVisibleStartIndex(0);
      setVisibleEndIndex(Math.max(0, images.length - 1));
      return;
    }

    updateScrollState();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollState);
      window.addEventListener('resize', updateScrollState);

      return () => {
        container.removeEventListener('scroll', updateScrollState);
        window.removeEventListener('resize', updateScrollState);
      };
    }
  }, [images.length, scrollEnabled, viewportWidth, maxCards]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollEnabled || !scrollContainerRef.current) return;

    const scrollAmount = scrollContainerRef.current.clientWidth;
    const targetScroll =
      direction === 'left'
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;

    scrollContainerRef.current.scrollTo({
      left: targetScroll,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (!scrollEnabled) {
      setVisibleStartIndex(0);
      setVisibleEndIndex(Math.max(0, images.length - 1));
    } else {
      setVisibleStartIndex(0);
      setVisibleEndIndex(Math.min(maxCards - 1, Math.max(0, images.length - 1)));
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ left: 0 });
      }
    }
  }, [scrollEnabled, images.length, maxCards]);

  const showArrows = scrollEnabled && images.length > maxCards && viewportWidth > 1500;
  const showDots = scrollEnabled && images.length > maxCards;

  return (
    <Container>
      <ScrollContainer>
        {showArrows && (
          <ArrowButton
            $position="left"
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
          >
            &#10094;
          </ArrowButton>
        )}

        <CardsContent $maxCards={maxCards} $height={height} $isGrid={isSmallGrid}>
          <CardsWrapper
            ref={scrollContainerRef}
            $isScrolling={false}
            $maxCards={maxCards}
            $vertical={cardsSize === 'small' && !scrollEnabled && !isSmallGrid}
            $isGrid={isSmallGrid}
          >
            {images.map((image, index) => (
              <CardItem
                key={index}
                $height={height}
                $isGrid={isSmallGrid}
                style={{
                  ...(cardsSize === 'small' && !scrollEnabled ? { width: '100%' } : {}),
                  ...(maxWidth ? { maxWidth: `${maxWidth}px` } : {}),
                }}
              >
                <img src={image} alt={`Card ${index + 1}`} />
              </CardItem>
            ))}
          </CardsWrapper>
        </CardsContent>

        {showArrows && (
          <ArrowButton
            $position="right"
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            aria-label="Scroll right"
          >
            &#10095;
          </ArrowButton>
        )}
      </ScrollContainer>

      {showDots && (
        <DotsContainer $size={cardsSize}>
          {images.map((_, index) => (
            <Dot
              key={index}
              $active={index >= visibleStartIndex && index <= visibleEndIndex}
              $size={cardsSize}
            />
          ))}
        </DotsContainer>
      )}
    </Container>
  );
};

export default AdvertisementCardsRow;
