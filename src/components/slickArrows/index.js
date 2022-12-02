import { chevronLeft, chevronRight } from "../../assets/svgs";

export const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
  <button
    {...props}
    className={
      "slick-prev slick-arrow" + (currentSlide === 0 ? " slick-disabled" : "")
    }
    aria-hidden="true"
    aria-disabled={currentSlide === 0 ? true : false}
    type="button"
  >
    {chevronRight}
  </button>
);
export const SlickArrowRight = ({
  slideCount,
  currentSlide,
  slidesToShow,
  slidesToScroll,
  ...props
}) => {
  console.log(slideCount);
  console.log(currentSlide);
  return (
    <button
      {...props}
      className={
        "slick-next slick-arrow" +
        (slideCount <= slidesToShow + currentSlide * slidesToScroll
          ? " slick-disabled"
          : "")
      }
      aria-hidden="true"
      aria-disabled={
        slideCount <= slidesToShow + currentSlide * slidesToScroll
          ? true
          : false
      }
      type="button"
    >
      {chevronLeft}
    </button>
  );
};
