"use client"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const CarouselComponent = ({newsData}) => {

  const settings = {
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
  };

  return (
    <div className="h-full overflow-hidden rounded-xl dark-card">
      <Slider {...settings} className="h-full">
        {newsData?.map((txt, i) => {
          return (
            <div className="h-full" key={i}>
              <div className="h-full flex flex-col rounded-xl p-[clamp(0.5rem,0.8vw,1.4rem)]">
                <h3 className="t-small font-bold text-cyan-300 uppercase tracking-wide mb-1 shrink-0">News {i + 1}</h3>
                <div className="flex-1 overflow-hidden t-body text-strong leading-snug">
                  {txt?.title}
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default CarouselComponent;
