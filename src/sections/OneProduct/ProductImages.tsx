import { MutableRefObject, useLayoutEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
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
}: {
  oneProdImgs: Laptop["images"];
  slug: string | undefined;
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const swiper1Ref = useRef<MutableRefObject<null>>(null);
  const swiper2Ref = useRef();

  useLayoutEffect(() => {
    if (swiper1Ref.current !== null) {
      swiper1Ref.current.controller.control = swiper2Ref.current;
    }
  }, []);
  return (
    <section className={sass.ProductImages}>
      <Swiper
        className={`mySwiper2 ${sass.Swiper1}`}
        spaceBetween={20}
        onSwiper={(swiper) => {
          if (swiper1Ref.current !== null) {
            swiper1Ref.current = swiper;
          }
        }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs, Navigation]}
        slideToClickedSlide={true}
        grabCursor={true}
        loop={false}
        >
        <SwiperSlide>
          <img
            src={oneProdImgs.primary.img_url}
            alt={oneProdImgs.primary.metadata.alt}
            style={{
              viewTransitionName: slug,
            }}
            />
        </SwiperSlide>
        {oneProdImgs.all.length !== 0 && oneProdImgs.all.map((img) => (
          <SwiperSlide>
            <img src={img.img_url} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
            <Swiper
              onSwiper={setThumbsSwiper}
              className={`mySwiper ${sass.Swiper2}`}
              spaceBetween={10}
              slidesPerView={3}
              // direction="vertical"
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Thumbs, Navigation]}
              slideToClickedSlide={true}
              loop={false}
            >
              <SwiperSlide className={sass.ThumbSlides}>
                <img
                  src={oneProdImgs.primary.img_url}
                  alt={oneProdImgs.primary.metadata.alt}
                />
              </SwiperSlide>
              {oneProdImgs.all.length !== 0 && oneProdImgs.all.map((img) => (
                <SwiperSlide className={sass.ThumbSlides}>
                  <img src={img.img_url} alt={img.metadata.alt} />
                </SwiperSlide>
              ))}
            </Swiper>
    </section>
  );
};

export default ProductImages;
