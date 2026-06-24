import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Navigation } from "swiper/modules";

export default function HomeAdsSlider({setSwiperRef}) {

  return (
    <>
      <Swiper
        onSwiper={setSwiperRef}
        loop={true}
        slidesPerView={4}
        spaceBetween={30}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper ads_swiper"
      >
        <SwiperSlide>
        <div className="card w-74 h-44 overflow-hidden rounded-xl cursor-pointer">
            <img className="h-full w-full object-cover" src="https://www.jiomart.com/images/cms/aw_rbslider/slides/1775561742_37_Spring_Summer_Looks.jpg?im=Resize=(768,448)" alt="img" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card w-74 h-44 overflow-hidden rounded-xl cursor-pointer">
            <img className="h-full w-full object-cover" src="https://www.jiomart.com/images/cms/aw_rbslider/slides/1775586086_BAU_HPMC_Beat_The_Heat_Keep_The_Glow.jpg?im=Resize=(768,448)" alt="img" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card w-74 h-44 overflow-hidden rounded-xl cursor-pointer">
            <img className="h-full w-full object-cover" src="https://www.jiomart.com/images/cms/aw_rbslider/slides/1775585220_BAU_Daily_Essentials_632X638px.jpg.jpeg?im=Resize=(768,448)" alt="img" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card w-74 h-44 overflow-hidden rounded-xl cursor-pointer">
            <img className="h-full w-full object-cover" src="https://www.jiomart.com/images/cms/aw_rbslider/slides/1774979364_Summer_Electronics-10.jpg?im=Resize=(768,448)" alt="img" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card w-74 h-44 overflow-hidden rounded-xl cursor-pointer">
            <img className="h-full w-full object-cover" src="https://www.jiomart.com/images/cms/aw_rbslider/slides/1775586214_39_Crazy_Deals_on_Kitchen_and_Dining.jpg?im=Resize=(768,448)" alt="img" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card w-74 h-44 overflow-hidden rounded-xl cursor-pointer">
            <img className="h-full w-full object-cover" src="https://www.jiomart.com/images/cms/aw_rbslider/slides/1775586086_BAU_HPMC_Beat_The_Heat_Keep_The_Glow.jpg?im=Resize=(768,448)" alt="img" />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
