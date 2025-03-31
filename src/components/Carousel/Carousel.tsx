import React, { JSX, useCallback } from "react";
import * as S from "./carousel.style.ts";
import useEmblaCarousel from "embla-carousel-react";

interface CarouselProps {
  children: JSX.Element;
}

const Carousel = ({ children }: CarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    slidesToScroll: 1,
    startIndex: 0,
    align: "start",
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
      <S.EmblaControls>
        <S.EmblaButtons>
          <button className="embla__prev" onClick={scrollPrev}>
            Prev
          </button>
          <button className="embla__next" onClick={scrollNext}>
            Next
          </button>
        </S.EmblaButtons>
      </S.EmblaControls>
    </S.Embla>
  );
};

export default Carousel;
