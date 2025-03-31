import React, { JSX, useCallback } from "react";
import * as S from "./carousel.style.ts";
import useEmblaCarousel from "embla-carousel-react";
import Button from "../Button/Button.tsx";

interface CarouselProps {
  children: JSX.Element;
  showBtn?: boolean;
}

const Carousel = ({ children, showBtn = false }: CarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    slidesToScroll: 1,
    startIndex: 0,
    align: "start",
    inViewThreshold: 1,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <S.Embla>
      <S.EmblaViewport ref={emblaRef}>
        <S.EmblaContainer>{children}</S.EmblaContainer>
      </S.EmblaViewport>
      {showBtn && (
        <S.EmblaControls>
          <S.EmblaButtons>
            <Button
              buttonSize="small"
              handleClick={scrollPrev}
              classType="register"
            >
              Prev
            </Button>
            <Button
              buttonSize="small"
              handleClick={scrollNext}
              classType="register"
            >
              Next
            </Button>
          </S.EmblaButtons>
        </S.EmblaControls>
      )}
    </S.Embla>
  );
};

export default Carousel;
