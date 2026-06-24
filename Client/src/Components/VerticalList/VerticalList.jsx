import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Navigation } from "swiper/modules";

export default function VerticalList() {
  const [swiperRef, setSwiperRef] = useState(null);

  return (
    <>
      <Swiper
        direction={'vertical'}
        onSwiper={setSwiperRef}
        loop={true}
        slidesPerView={4}
        spaceBetween={5}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper vertical-product-details"
      >
        <SwiperSlide>
        <div className="card  h-24 overflow-hidden rounded-xl cursor-pointer">
            <img className="h-full w-full object-cover" src="images/homeSlider/slideBanner1.jpg" alt="img" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card  h-24 overflow-hidden rounded-xl cursor-pointer">
            <img className="h-full w-full object-cover" src="images/homeSlider/slideBanner2.jpg" alt="img" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card  h-24 overflow-hidden rounded-xl cursor-pointer">
            <img className="h-full w-full object-cover" src="images/homeSlider/slideBanner3.jpg" alt="img" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card  h-24 overflow-hidden rounded-xl cursor-pointer">
            <img className="h-full w-full object-cover" src="images/homeSlider/slideBanner4.jpg" alt="img" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="card  h-24 overflow-hidden rounded-xl cursor-pointer">
            <img className="h-full w-full object-cover" src="images/homeSlider/slideBanner1.jpg" alt="img" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card  h-24 overflow-hidden rounded-xl cursor-pointer">
            <img className="h-full w-full object-cover" src="images/homeSlider/slideBanner2.jpg" alt="img" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card  h-24 overflow-hidden rounded-xl cursor-pointer">
            <img className="h-full w-full object-cover" src="images/homeSlider/slideBanner3.jpg" alt="img" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card  h-24 overflow-hidden rounded-xl cursor-pointer">
            <img className="h-full w-full object-cover" src="images/homeSlider/slideBanner4.jpg" alt="img" />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
