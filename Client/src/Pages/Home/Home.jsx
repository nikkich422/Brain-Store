import { useState } from "react";
import { motion } from "framer-motion";
import CarouselHome from "../../Components/CarouselHome/CarouselHome";
import HomeTabs from "../../Components/HomeTabs/HomeTabs";
import HomeCardsList from "../../Components/HomeCardsList/HomeCardsList";
import HomeBlogCardsList from "../../Components/HomeBlogCardsList/HomeBlogCardsList";
import HomeAdsSlider from "../../Components/HomeAdsSlider/HomeAdsSlider";
import CategoryList from "../../Components/CategoryList";
import RecentlyViewedList from "../../Components/RecentlyViewedList";
import PageTransition from "../../Components/PageTransition/PageTransition";
import { LiaShippingFastSolid } from "react-icons/lia";

// Reusable section header
const SectionHeader = ({ title, subtitle }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
    className="mb-4!"
  >
    <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
    {subtitle && <p className="text-gray-400 text-sm mt-1">{subtitle}</p>}
  </motion.div>
);

const Home = () => {
  const [category, setCategory] = useState("clothing");

  return (
    <PageTransition>
      {/* Hero Carousel */}
      <CarouselHome />

      {/* Featured Categories */}
      <section className="container mt-16!">
        <SectionHeader title="Featured Categories" subtitle="Shop by what you love" />
        <CategoryList />
      </section>

      {/* Popular Products */}
      <section className="container mt-16!">
        <div className="flex justify-between items-start mb-4 flex-wrap gap-3">
          <SectionHeader
            title="Popular Products"
            subtitle="Don't miss the current offers until the end of March."
          />
          <HomeTabs setCategory={setCategory} />
        </div>
        <HomeCardsList type={category} />
      </section>

      {/* Free Shipping Banner */}
      <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="container mt-16!"
      >
        <div className="border-2 border-orange-500 bg-orange-50 flex items-center justify-between px-6 py-5 rounded-2xl flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <LiaShippingFastSolid className="text-5xl text-orange-500" />
            <div>
              <h2 className="text-xl font-bold text-gray-800">FREE SHIPPING</h2>
              <p className="text-sm text-gray-500">On your first order and orders above ₹499</p>
            </div>
          </div>
          <div className="font-bold text-2xl text-orange-500">Only ₹499*</div>
        </div>
      </motion.section>

      {/* Ads Slider */}
      {/* <section className="container mt-16">
        <HomeAdsSlider />
      </section> */}

      {/* Food Products */}
      <section className="container mt-16!">
        <SectionHeader title="Food Products" subtitle="Fresh picks for your kitchen" />
        <HomeCardsList type="food_products" />
      </section>

      {/* Second Ads Slider */}
      {/* <section className="container mt-16">
        <HomeAdsSlider />
      </section> */}

      {/* Recently Viewed */}
      <section className="container mt-16!">
        <SectionHeader title="Recently Viewed" />
        <RecentlyViewedList />
      </section>

      {/* Blog */}
      <section className="container mt-16! mb-10!">
        <SectionHeader title="From the Blog" subtitle="Tips, trends and stories" />
        <HomeBlogCardsList />
      </section>
    </PageTransition>
  );
};

export default Home;
