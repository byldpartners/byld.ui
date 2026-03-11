import { useState, useCallback } from "react";
import type { CarouselOrientation } from "./Carousel.types";

interface UseCarouselProps {
  orientation?: CarouselOrientation;
}

export function useCarouselState({ orientation = "horizontal" }: UseCarouselProps = {}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);

  const canScrollPrevious = currentIndex > 0;
  const canScrollNext = currentIndex < totalItems - 1;

  const scrollPrevious = useCallback(() => {
    const newIndex = Math.max(0, currentIndex - 1);
    setCurrentIndex(newIndex);
    return {
      index: newIndex,
      x: orientation === "horizontal" ? newIndex * itemWidth : 0,
      y: orientation === "vertical" ? newIndex * itemWidth : 0,
    };
  }, [currentIndex, itemWidth, orientation]);

  const scrollNext = useCallback(() => {
    const newIndex = Math.min(totalItems - 1, currentIndex + 1);
    setCurrentIndex(newIndex);
    return {
      index: newIndex,
      x: orientation === "horizontal" ? newIndex * itemWidth : 0,
      y: orientation === "vertical" ? newIndex * itemWidth : 0,
    };
  }, [currentIndex, totalItems, itemWidth, orientation]);

  return {
    orientation,
    currentIndex,
    totalItems,
    setTotalItems,
    itemWidth,
    setItemWidth,
    canScrollPrevious,
    canScrollNext,
    scrollPrevious,
    scrollNext,
  };
}
