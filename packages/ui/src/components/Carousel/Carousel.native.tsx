import {
  useRef,
  createContext,
  useContext,
  useCallback,
  Children,
} from "react";
import {
  View,
  ScrollView,
  Pressable,
  Text,
  type LayoutChangeEvent,
  type ViewProps,
} from "react-native";
import type { CarouselOrientation, CarouselProps, CarouselContentProps, CarouselItemProps, CarouselPreviousProps, CarouselNextProps } from "./Carousel.types";
import { cn } from "../../utils/cn";
import { useCarouselState } from "./useCarousel";

interface CarouselContextValue {
  orientation: CarouselOrientation;
  currentIndex: number;
  totalItems: number;
  scrollPrevious: () => void;
  scrollNext: () => void;
  canScrollPrevious: boolean;
  canScrollNext: boolean;
  scrollViewRef: React.RefObject<ScrollView | null>;
  itemWidth: number;
  setTotalItems: (count: number) => void;
}

const CarouselContext = createContext<CarouselContextValue | null>(null);

function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

interface CarouselNativeProps extends CarouselProps, ViewProps {}

function Carousel({
  orientation = "horizontal",
  children,
  onLayout,
  ...props
}: CarouselNativeProps) {
  const carouselState = useCarouselState({ orientation });
  const { setItemWidth, scrollPrevious: corePrev, scrollNext: coreNext } = carouselState;
  const scrollViewRef = useRef<ScrollView | null>(null);

  const handleLayout = useCallback(
    (e: LayoutChangeEvent) => {
      setItemWidth(e.nativeEvent.layout.width);
      onLayout?.(e);
    },
    [onLayout, setItemWidth],
  );

  const scrollPrevious = useCallback(() => {
    const pos = corePrev();
    scrollViewRef.current?.scrollTo({ x: pos.x, y: pos.y, animated: true });
  }, [corePrev]);

  const scrollNext = useCallback(() => {
    const pos = coreNext();
    scrollViewRef.current?.scrollTo({ x: pos.x, y: pos.y, animated: true });
  }, [coreNext]);

  return (
    <CarouselContext.Provider
      value={{
        orientation: carouselState.orientation,
        currentIndex: carouselState.currentIndex,
        totalItems: carouselState.totalItems,
        scrollPrevious,
        scrollNext,
        canScrollPrevious: carouselState.canScrollPrevious,
        canScrollNext: carouselState.canScrollNext,
        scrollViewRef,
        itemWidth: carouselState.itemWidth,
        setTotalItems: carouselState.setTotalItems,
      }}
    >
      <View onLayout={handleLayout} {...props}>{children}</View>
    </CarouselContext.Provider>
  );
}
Carousel.displayName = "Carousel";

interface CarouselContentNativeProps extends CarouselContentProps, ViewProps {}

function CarouselContent({ children, ...props }: CarouselContentNativeProps) {
  const { orientation, scrollViewRef, itemWidth, setTotalItems } =
    useCarousel();
  const items = Children.toArray(children);
  const countRef = useRef(0);

  if (items.length !== countRef.current) {
    countRef.current = items.length;
    setTimeout(() => setTotalItems(items.length), 0);
  }

  const isHorizontal = orientation === "horizontal";

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal={isHorizontal}
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      decelerationRate="fast"
      snapToInterval={itemWidth}
      snapToAlignment="start"
      {...props}
    >
      {children}
    </ScrollView>
  );
}
CarouselContent.displayName = "CarouselContent";

interface CarouselItemNativeProps extends CarouselItemProps, ViewProps {}

function CarouselItem({ children, style, ...props }: CarouselItemNativeProps) {
  const { itemWidth } = useCarousel();

  return (
    <View style={{ width: itemWidth }} {...props}>
      {children}
    </View>
  );
}
CarouselItem.displayName = "CarouselItem";

interface CarouselButtonNativeProps extends CarouselPreviousProps, ViewProps {}

function CarouselPrevious({
  children,
  ...props
}: CarouselButtonNativeProps) {
  const { scrollPrevious, canScrollPrevious } = useCarousel();

  return (
    <Pressable
      onPress={scrollPrevious}
      disabled={!canScrollPrevious}
      className={cn(
        "items-center justify-center h-8 w-8 rounded-md border border-border bg-background shadow-sm elevation-1",
        !canScrollPrevious && "opacity-50",
      )}
      {...props}
    >
      {children ?? <Text className="text-base text-foreground">{"\u2039"}</Text>}
    </Pressable>
  );
}
CarouselPrevious.displayName = "CarouselPrevious";

function CarouselNext({
  children,
  ...props
}: CarouselButtonNativeProps) {
  const { scrollNext, canScrollNext } = useCarousel();

  return (
    <Pressable
      onPress={scrollNext}
      disabled={!canScrollNext}
      className={cn(
        "items-center justify-center h-8 w-8 rounded-md border border-border bg-background shadow-sm elevation-1",
        !canScrollNext && "opacity-50",
      )}
      {...props}
    >
      {children ?? <Text className="text-base text-foreground">{"\u203A"}</Text>}
    </Pressable>
  );
}
CarouselNext.displayName = "CarouselNext";

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};
export type { CarouselNativeProps, CarouselContentNativeProps, CarouselItemNativeProps, CarouselButtonNativeProps };
