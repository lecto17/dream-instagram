import { ComponentProps, PropsWithChildren } from 'react';
import Carousel from 'react-multi-carousel';

const responsive = {
  desktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 567 },
    items: 6,
  },
  mobile: {
    breakpoint: { max: 567, min: 0 },
    items: 3,
  },
};

type ScrollableBarProps = PropsWithChildren &
  Omit<ComponentProps<typeof Carousel>, 'responsive'>;

const ScrollableBar = ({ children, ...props }: ScrollableBarProps) => {
  return (
    <Carousel
      infinite={true}
      containerClass="w-full flex gap-2"
      swipeable={true}
      draggable={true}
      {...props}
      responsive={responsive}
    >
      {children}
    </Carousel>
  );
};

export default ScrollableBar;
