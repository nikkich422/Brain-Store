import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
// import required modules
import { Pagination, Navigation } from "swiper/modules";
import { AiOutlineFullscreen } from "react-icons/ai";
import { IoGitCompareOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { MdOutlineTimer } from "react-icons/md";

export default function HomeBlogCardsList() {
  const [swiperRef, setSwiperRef] = useState(null);

  return (
    <>
      <Swiper
        onSwiper={setSwiperRef}
        slidesPerView={4}
        spaceBetween={30}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper card_blog_swiper"
      >
        <SwiperSlide>
          <div className="card w-74 border border-gray-300 shadow-md rounded-xl overflow-hidden relative cursor-pointer">
              <div className="img-container h-60 relative">
                <img className="h-full m-auto" src="https://thumbs.dreamstime.com/b/blog-information-website-concept-workplace-background-text-view-above-blog-information-website-concept-118021391.jpg" alt="img" />
                <span className="bg-red-400 text-white px-2 py-1 rounded-md absolute bottom-2 right-1 flex gap-1 text-[12px] items-center"><MdOutlineTimer /> 5, APRIL 2023</span>
              </div>
              <div className="p-2">
                <h3 className="title font-bold text-2xl mb-2">Blog Title</h3>
                <p className="description text-[14px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ab non, quia sequi aspernatur neque totam eaque accusamus, ipsum harum, itaque accusantium nam iure officia nisi quo. Aspernatur debitis dolorum sunt fugit laudantium aut pariatur, cum eius esse magni magnam tenetur, ipsa neque illum quam vel? Similique asperiores quibusdam ab.</p>
              </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card w-74 border border-gray-300 shadow-md rounded-xl overflow-hidden relative cursor-pointer">
              <div className="img-container h-60 relative">
                <img className="h-full m-auto" src="https://thumbs.dreamstime.com/b/blog-information-website-concept-workplace-background-text-view-above-blog-information-website-concept-118021391.jpg" alt="img" />
                <span className="bg-red-400 text-white px-2 py-1 rounded-md absolute bottom-2 right-1 flex gap-1 text-[12px] items-center"><MdOutlineTimer /> 5, APRIL 2023</span>
              </div>
              <div className="p-2">
                <h3 className="title font-bold text-2xl mb-2">Blog Title</h3>
                <p className="description text-[14px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ab non, quia sequi aspernatur neque totam eaque accusamus, ipsum harum, itaque accusantium nam iure officia nisi quo. Aspernatur debitis dolorum sunt fugit laudantium aut pariatur, cum eius esse magni magnam tenetur, ipsa neque illum quam vel? Similique asperiores quibusdam ab.</p>
              </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card w-74 border border-gray-300 shadow-md rounded-xl overflow-hidden relative cursor-pointer">
              <div className="img-container h-60 relative">
                <img className="h-full m-auto" src="https://thumbs.dreamstime.com/b/blog-information-website-concept-workplace-background-text-view-above-blog-information-website-concept-118021391.jpg" alt="img" />
                <span className="bg-red-400 text-white px-2 py-1 rounded-md absolute bottom-2 right-1 flex gap-1 text-[12px] items-center"><MdOutlineTimer /> 5, APRIL 2023</span>
              </div>
              <div className="p-2">
                <h3 className="title font-bold text-2xl mb-2">Blog Title</h3>
                <p className="description text-[14px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ab non, quia sequi aspernatur neque totam eaque accusamus, ipsum harum, itaque accusantium nam iure officia nisi quo. Aspernatur debitis dolorum sunt fugit laudantium aut pariatur, cum eius esse magni magnam tenetur, ipsa neque illum quam vel? Similique asperiores quibusdam ab.</p>
              </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card w-74 border border-gray-300 shadow-md rounded-xl overflow-hidden relative cursor-pointer">
              <div className="img-container h-60 relative">
                <img className="h-full m-auto" src="https://thumbs.dreamstime.com/b/blog-information-website-concept-workplace-background-text-view-above-blog-information-website-concept-118021391.jpg" alt="img" />
                <span className="bg-red-400 text-white px-2 py-1 rounded-md absolute bottom-2 right-1 flex gap-1 text-[12px] items-center"><MdOutlineTimer /> 5, APRIL 2023</span>
              </div>
              <div className="p-2">
                <h3 className="title font-bold text-2xl mb-2">Blog Title</h3>
                <p className="description text-[14px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ab non, quia sequi aspernatur neque totam eaque accusamus, ipsum harum, itaque accusantium nam iure officia nisi quo. Aspernatur debitis dolorum sunt fugit laudantium aut pariatur, cum eius esse magni magnam tenetur, ipsa neque illum quam vel? Similique asperiores quibusdam ab.</p>
              </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card w-74 border border-gray-300 shadow-md rounded-xl overflow-hidden relative cursor-pointer">
              <div className="img-container h-60 relative">
                <img className="h-full m-auto" src="https://thumbs.dreamstime.com/b/blog-information-website-concept-workplace-background-text-view-above-blog-information-website-concept-118021391.jpg" alt="img" />
                <span className="bg-red-400 text-white px-2 py-1 rounded-md absolute bottom-2 right-1 flex gap-1 text-[12px] items-center"><MdOutlineTimer /> 5, APRIL 2023</span>
              </div>
              <div className="p-2">
                <h3 className="title font-bold text-2xl mb-2">Blog Title</h3>
                <p className="description text-[14px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ab non, quia sequi aspernatur neque totam eaque accusamus, ipsum harum, itaque accusantium nam iure officia nisi quo. Aspernatur debitis dolorum sunt fugit laudantium aut pariatur, cum eius esse magni magnam tenetur, ipsa neque illum quam vel? Similique asperiores quibusdam ab.</p>
              </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card w-74 border border-gray-300 shadow-md rounded-xl overflow-hidden relative cursor-pointer">
              <div className="img-container h-60 relative">
                <img className="h-full m-auto" src="https://thumbs.dreamstime.com/b/blog-information-website-concept-workplace-background-text-view-above-blog-information-website-concept-118021391.jpg" alt="img" />
                <span className="bg-red-400 text-white px-2 py-1 rounded-md absolute bottom-2 right-1 flex gap-1 text-[12px] items-center"><MdOutlineTimer /> 5, APRIL 2023</span>
              </div>
              <div className="p-2">
                <h3 className="title font-bold text-2xl mb-2">Blog Title</h3>
                <p className="description text-[14px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ab non, quia sequi aspernatur neque totam eaque accusamus, ipsum harum, itaque accusantium nam iure officia nisi quo. Aspernatur debitis dolorum sunt fugit laudantium aut pariatur, cum eius esse magni magnam tenetur, ipsa neque illum quam vel? Similique asperiores quibusdam ab.</p>
              </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card w-74 border border-gray-300 shadow-md rounded-xl overflow-hidden relative cursor-pointer">
              <div className="img-container h-60 relative">
                <img className="h-full m-auto" src="https://thumbs.dreamstime.com/b/blog-information-website-concept-workplace-background-text-view-above-blog-information-website-concept-118021391.jpg" alt="img" />
                <span className="bg-red-400 text-white px-2 py-1 rounded-md absolute bottom-2 right-1 flex gap-1 text-[12px] items-center"><MdOutlineTimer /> 5, APRIL 2023</span>
              </div>
              <div className="p-2">
                <h3 className="title font-bold text-2xl mb-2">Blog Title</h3>
                <p className="description text-[14px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ab non, quia sequi aspernatur neque totam eaque accusamus, ipsum harum, itaque accusantium nam iure officia nisi quo. Aspernatur debitis dolorum sunt fugit laudantium aut pariatur, cum eius esse magni magnam tenetur, ipsa neque illum quam vel? Similique asperiores quibusdam ab.</p>
              </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="card w-74 border border-gray-300 shadow-md rounded-xl overflow-hidden relative cursor-pointer">
              <div className="img-container h-60 relative">
                <img className="h-full m-auto" src="https://thumbs.dreamstime.com/b/blog-information-website-concept-workplace-background-text-view-above-blog-information-website-concept-118021391.jpg" alt="img" />
                <span className="bg-red-400 text-white px-2 py-1 rounded-md absolute bottom-2 right-1 flex gap-1 text-[12px] items-center"><MdOutlineTimer /> 5, APRIL 2023</span>
              </div>
              <div className="p-2">
                <h3 className="title font-bold text-2xl mb-2">Blog Title</h3>
                <p className="description text-[14px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ab non, quia sequi aspernatur neque totam eaque accusamus, ipsum harum, itaque accusantium nam iure officia nisi quo. Aspernatur debitis dolorum sunt fugit laudantium aut pariatur, cum eius esse magni magnam tenetur, ipsa neque illum quam vel? Similique asperiores quibusdam ab.</p>
              </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
