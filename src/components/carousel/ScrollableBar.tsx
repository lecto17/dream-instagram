import Carousel from "react-multi-carousel";

const responsive = {
  desktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 567 },
    items: 6,
  },
  mobile: {
    breakpoint: { max: 567, min: 0 },
    items: 4,
  },
};

const ScrollableBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <Carousel
      responsive={responsive}
      infinite={true}
      containerClass="w-full flex gap-2"
    >
      {children}
    </Carousel>
  );
};

export default ScrollableBar;
