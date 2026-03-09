import {
  useState,
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
import type { CarouselOrientation } from "./Carousel.types";
import { cn } from "../../utils/cn";

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

interface CarouselNativeProps extends ViewProps {
  orientation?: CarouselOrientation;
  children?: React.ReactNode;
}

function Carousel({
  orientation = "horizontal",
  children,
  onLayout,
  ...props
}: CarouselNativeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const scrollViewRef = useRef<ScrollView | null>(null);

  const canScrollPrevious = currentIndex > 0;
  const canScrollNext = currentIndex < totalItems - 1;

  const handleLayout = useCallback(
    (e: LayoutChangeEvent) => {
      setItemWidth(e.nativeEvent.layout.width);
      onLayout?.(e);
    },
    [onLayout],
  );

  const scrollPrevious = useCallback(() => {
    const newIndex = Math.max(0, currentIndex - 1);
    setCurrentIndex(newIndex);
    scrollViewRef.current?.scrollTo({
      x: orientation === "horizontal" ? newIndex * itemWidth : 0,
      y: orientation === "vertical" ? newIndex * itemWidth : 0,
      animated: true,
    });
  }, [currentIndex, itemWidth, orientation]);

  const scrollNext = useCallback(() => {
    const newIndex = Math.min(totalItems - 1, currentIndex + 1);
    setCurrentIndex(newIndex);
    scrollViewRef.current?.scrollTo({
      x: orientation === "horizontal" ? newIndex * itemWidth : 0,
      y: orientation === "vertical" ? newIndex * itemWidth : 0,
      animated: true,
    });
  }, [currentIndex, totalItems, itemWidth, orientation]);

  return (
    <CarouselContext.Provider
      value={{
        orientation,
        currentIndex,
        totalItems,
        scrollPrevious,
        scrollNext,
        canScrollPrevious,
        canScrollNext,
        scrollViewRef,
        itemWidth,
        setTotalItems,
      }}
    >
      <View onLayout={handleLayout} {...props}>{children}</View>
    </CarouselContext.Provider>
  );
}
Carousel.displayName = "Carousel";

interface CarouselContentNativeProps extends ViewProps {
  children?: React.ReactNode;
}

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

interface CarouselItemNativeProps extends ViewProps {
  children?: React.ReactNode;
}

function CarouselItem({ children, style, ...props }: CarouselItemNativeProps) {
  const { itemWidth } = useCarousel();

  return (
    <View style={{ width: itemWidth }} {...props}>
      {children}
    </View>
  );
}
CarouselItem.displayName = "CarouselItem";

interface CarouselButtonNativeProps extends ViewProps {
  children?: React.ReactNode;
  onPress?: () => void;
}

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
        "items-center justify-center h-8 w-8 rounded-md border border-border bg-background",
        !canScrollPrevious && "opacity-50",
      )}
      {...props}
    >
      {children ?? <Text className="text-base">{"<"}</Text>}
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
        "items-center justify-center h-8 w-8 rounded-md border border-border bg-background",
        !canScrollNext && "opacity-50",
      )}
      {...props}
    >
      {children ?? <Text className="text-base">{">"}</Text>}
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
