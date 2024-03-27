import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
// styles
import sass from "../../assets/styles/sections/HomePage/HeroSlider.module.scss";
import { Autoplay, EffectFade } from "swiper/modules";
import { useEffect, useRef } from "react";

const HeroVideos = [
  "https://firebasestorage.googleapis.com/v0/b/liontech-ecommerce.appspot.com/o/HeroVideos%2FHeroVideos%202F1.webm?alt=media&token=03387378-30ca-4192-93ce-79b37f57dfe5",
  "https://firebasestorage.googleapis.com/v0/b/liontech-ecommerce.appspot.com/o/HeroVideos%2FHeroVideos%202F2.webm?alt=media&token=d575776e-4098-4ebf-a072-dd77cee99516",
  "https://firebasestorage.googleapis.com/v0/b/liontech-ecommerce.appspot.com/o/HeroVideos%2FHeroVideos%202F3.webm?alt=media&token=ede03097-0eb7-4b67-bbaf-1b9173eb80c7",
];

const HeroSlider = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const VideoController = () => {
    const video = videoRef.current;
    if (video !== null) {
      video.load();
    }
  };
  useEffect(() => {
    VideoController();
  });
  return (
    <SwiperComponent
      className={`mySwiper ${sass.Swiper}`}
      modules={[Autoplay, EffectFade]}
      spaceBetween={10}
      loop={true}
      effect="fade"
      autoplay={{
        delay: 4750,
        disableOnInteraction: false,
      }}
      onSlideChange={VideoController}
    >
      {HeroVideos.map((video, index) => (
        <SwiperSlide className={sass.SwiperSlide} key={index}>
          <video
            autoPlay={true}
            src={video}
            loop
            muted
            className={sass.Img}
            ref={videoRef}
          />
        </SwiperSlide>
      ))}
    </SwiperComponent>
  );
};

export default HeroSlider;
