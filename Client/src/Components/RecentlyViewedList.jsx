import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation, Autoplay } from "swiper/modules";
import { getRecentProducts } from "../Utils/recentlyViewed";
import ProductListingCard from "./ProductListingCard";

export default function RecentlyViewedList() {
  
  const recentProducts = getRecentProducts();

  if (!recentProducts || recentProducts.length === 0) {
    return (
      <div className="flex gap-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            onClick={() => navigate(`/product/${item.slug}`)}
            className="w-full sm:w-56 border border-gray-200 rounded-xl p-3 cursor-pointer hover:shadow-lg transition bg-white relative"
          >
            <div className="animate-pulse">
              {/* Image Skeleton */}
              <div className="h-44 w-full bg-gray-200 rounded-md"></div>

              {/* Title */}
              <div className="mt-3 space-y-2">
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>

              {/* Rating */}
              <div className="mt-2 flex items-center gap-2">
                <div className="h-3 w-20 bg-gray-200 rounded"></div>
                <div className="h-3 w-10 bg-gray-200 rounded"></div>
              </div>

              {/* Price */}
              <div className="mt-3 flex items-center gap-2">
                <div className="h-4 w-16 bg-gray-300 rounded"></div>
                <div className="h-3 w-12 bg-gray-200 rounded"></div>
                <div className="h-3 w-10 bg-gray-200 rounded"></div>
              </div>

              {/* Button / delivery */}
              <div className="mt-3 h-3 w-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <Swiper
      spaceBetween={20}
      loop={recentProducts.length > 5}
      navigation={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      speed={900}
      modules={[Navigation, Autoplay]}
      breakpoints={{
        320: { slidesPerView: 1 },
        480: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
        1280: { slidesPerView: 5 },
      }}
      className="card_swiper"
    >
      {recentProducts.map((product) => (
        <SwiperSlide key={product._id}>
          <div className="slide-inner">
            <ProductListingCard item={product} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}