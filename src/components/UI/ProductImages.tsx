import { useLayoutEffect, useRef, useState } from "react";
import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { Laptop } from "../../types/records";
import sass from "../../assets/styles/sections/OneProductPage/ProductImages.module.scss";
const ProductImages = ({
  oneProdImgs,
  slug,
  className,
  isInAdminPage,
}: {
  oneProdImgs: Laptop["images"];
  slug?: string | undefined;
  className?: string | undefined;
  isInAdminPage?: boolean | undefined;
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  const swiper1Ref = useRef<SwiperRef>(null);
  const swiper2Ref = useRef<SwiperRef>(null);

  useLayoutEffect(() => {
    let swipRef = swiper1Ref.current;
    if (swipRef !== null) {
      swipRef = swiper2Ref.current;
    }
  });
  return (
    <section className={`${sass.ProductImages} ${className}`}>
      <Swiper
        className={`mySwiper2 ${sass.Swiper1}`}
        autoHeight={true}
        spaceBetween={20}
        onSwiper={(swiper) => {
          if (swiper1Ref.current !== null) swiper1Ref.current.swiper = swiper;
        }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs, Navigation]}
        slideToClickedSlide={true}
        grabCursor={true}
        loop={false}
      >
        {oneProdImgs.primary && oneProdImgs.all.length !== 0 ? (
          <SwiperSlide>
            <img
              src={oneProdImgs.primary.img_url}
              alt={oneProdImgs.primary.metadata.alt}
              style={{
                viewTransitionName: slug,
              }}
            />
          </SwiperSlide>
        ) : (
          <h1>no images</h1>
        )}
        {oneProdImgs.all.length !== 0 &&
          oneProdImgs.all.map((img) => (
            <SwiperSlide key={img.img_url}>
              <img src={img.img_url} alt="" />
            </SwiperSlide>
          ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        className={`mySwiper ${sass.Swiper2}`}
        spaceBetween={10}
        slidesPerView={3}
        autoHeight={true}
        // direction="vertical"
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs, Navigation]}
        slideToClickedSlide={true}
        loop={false}
      >
        {oneProdImgs.primary && !isInAdminPage ? (
          <SwiperSlide>
            <img
              src={oneProdImgs.primary.img_url}
              alt={oneProdImgs.primary.metadata.alt}
            />
          </SwiperSlide>
        ) : null}
        {oneProdImgs.all.length !== 0 &&
          oneProdImgs.all.map((img) => (
            <SwiperSlide className={sass.ThumbSlides} key={img.img_url}>
              <img src={img.img_url} alt={img.metadata.alt} />
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

export default ProductImages;
