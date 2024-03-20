import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import sliderImg1 from "../../assets/images/slider1.png";
import sliderImg2 from "../../assets/images/slider2.png";
import sliderImg3 from "../../assets/images/slider3.png";
// styles
import sass from "../../assets/styles/sections/HomePage/HeroSlider.module.scss";
import { Pagination, Autoplay } from "swiper/modules";

const HeroSlider = () => {
  return (
    <Swiper
      className={`mySwiper ${sass.Swiper}`}
      pagination={true}
      modules={[Pagination, Autoplay]}
      spaceBetween={10}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
    >
      <SwiperSlide className={sass.SwiperSlide}>
        <img src={sliderImg2} alt="" className={sass.Img} />
      </SwiperSlide>
      <SwiperSlide className={sass.SwiperSlide}>
        <img src={sliderImg1} alt="" className={sass.Img} />
      </SwiperSlide>
      <SwiperSlide className={sass.SwiperSlide}>
        <img src={sliderImg3} alt="" className={sass.Img} />
      </SwiperSlide>
    </Swiper>
  );
};

export default HeroSlider;
