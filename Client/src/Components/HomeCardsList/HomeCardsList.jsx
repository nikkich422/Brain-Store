import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ProductListingCard from "../ProductListingCard";
import { fetchProductsByCategory } from "../../api/productApi";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

export default function HomeCardsList({ type }) {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", type],
    queryFn: () => fetchProductsByCategory(type),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  // Skeleton — ✅ FIX: Removed broken navigate/item reference that was in the loading state
  if (isLoading) {
    return (
      <div className="flex gap-4 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          // Render skeleton via the card itself (loading prop)
          <div key={i} className="min-w-[200px] w-[200px]">
            <ProductListingCard loading={true} item={null} />
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <p className="text-gray-400 text-sm py-4">
        No products available in this category.
      </p>
    );
  }

  return (
    <Swiper
      modules={[Navigation]}
      navigation
      spaceBetween={16}
      slidesPerView={2}
      breakpoints={{
        640:  { slidesPerView: 3 },
        768:  { slidesPerView: 4 },
        1024: { slidesPerView: 5 },
      }}
      className="card_swiper"
    >
      {products.map((item, i) => (
        // ✅ IMPROVEMENT: Stagger animation on each card
        <SwiperSlide key={item._id}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
          >
            <ProductListingCard item={item} />
          </motion.div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
