import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./CarouselHome.css";
import API from "../../api/api";

const CarouselHome = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBanners = async () => {
    try {
      const { data } = await API.get("/api/banner");
      setBanners(data.banners.filter((b) => b.isActive));
    } catch (error) {
      // ✅ FIX: Removed toast.error — don't alarm users if banners fail to load
      // ✅ FIX: Removed console.log(bannersData) debug log
      console.error("Failed to fetch banners:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // Skeleton while loading
  if (loading) {
    return (
      <div className="w-[95%] mx-auto mt-6 rounded-2xl overflow-hidden">
        <div className="w-full h-64 md:h-80 bg-gray-200 animate-pulse rounded-2xl" />
      </div>
    );
  }

  if (banners.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-[95%] mx-auto mt-6"
    >
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        navigation
        pagination={{ clickable: true }}
        loop={banners.length > 1}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        className="rounded-2xl overflow-hidden shadow-md"
      >
        {/* ✅ FIX: Added key prop to SwiperSlide (was missing — causes React warning) */}
        {banners.map((b, i) => (
          <SwiperSlide key={b._id || i}>
            <div className="relative overflow-hidden rounded-2xl bg-gray-100">
              <img
                className="w-full object-cover max-h-[420px]"
                loading={i === 0 ? "eager" : "lazy"}
                src={b.image}
                alt={b.title || `Banner ${i + 1}`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* ✅ FIX: Removed invalid <style> tag with a wrong CSS selector that was doing nothing */}
    </motion.div>
  );
};

export default CarouselHome;
