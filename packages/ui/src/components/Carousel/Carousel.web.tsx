import {
  forwardRef,
  createContext,
  useContext,
  useState,
  useCallback,
  Children,
} from "react";
import { cn } from "../../utils/cn";
import type {
  CarouselProps,
  CarouselContentProps,
  CarouselItemProps,
  CarouselOrientation,
} from "./Carousel.types";

interface CarouselContextValue {
  orientation: CarouselOrientation;
  currentIndex: number;
  totalItems: number;
  scrollPrevious: () => void;
  scrollNext: () => void;
  canScrollPrevious: boolean;
  canScrollNext: boolean;
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

const Carousel = forwardRef<
  HTMLDivElement,
  CarouselProps & React.HTMLAttributes<HTMLDivElement>
>(({ className, orientation = "horizontal", children, ...props }, ref) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const canScrollPrevious = currentIndex > 0;
  const canScrollNext = currentIndex < totalItems - 1;

  const scrollPrevious = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const scrollNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(totalItems - 1, prev + 1));
  }, [totalItems]);

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
        setTotalItems,
      }}
    >
      <div
        ref={ref}
        role="region"
        aria-roledescription="carousel"
        className={cn("relative", className)}
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
});
Carousel.displayName = "Carousel";

const CarouselContent = forwardRef<
  HTMLDivElement,
  CarouselContentProps & React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { orientation, currentIndex, setTotalItems } = useCarousel();
  const items = Children.toArray(children);

  // Update total items count
  if (items.length !== 0) {
    // Using a ref-like pattern to avoid re-render loops
    queueMicrotask(() => setTotalItems(items.length));
  }

  const isHorizontal = orientation === "horizontal";

  return (
    <div className="overflow-hidden" ref={ref}>
      <div
        className={cn(
          "flex transition-transform duration-300 ease-in-out",
          isHorizontal ? "-ml-4" : "-mt-4 flex-col",
          className,
        )}
        style={{
          transform: isHorizontal
            ? `translateX(-${currentIndex * 100}%)`
            : `translateY(-${currentIndex * 100}%)`,
        }}
        {...props}
      >
        {children}
      </div>
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = forwardRef<
  HTMLDivElement,
  CarouselItemProps & React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className,
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const { orientation, scrollPrevious, canScrollPrevious } = useCarousel();

  return (
    <button
      ref={ref}
      className={cn(
        "absolute inline-flex h-8 w-8 items-center justify-center rounded-full border border-input bg-background shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollPrevious}
      onClick={scrollPrevious}
      aria-label="Previous slide"
      {...props}
    >
      {children ?? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      )}
      <span className="sr-only">Previous slide</span>
    </button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <button
      ref={ref}
      className={cn(
        "absolute inline-flex h-8 w-8 items-center justify-center rounded-full border border-input bg-background shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      aria-label="Next slide"
      {...props}
    >
      {children ?? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      )}
      <span className="sr-only">Next slide</span>
    </button>
  );
});
CarouselNext.displayName = "CarouselNext";

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};
