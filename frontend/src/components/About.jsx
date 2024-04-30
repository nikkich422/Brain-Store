import React, { useEffect, useState } from "react";
import img from "./../../public/about-page-pic.jpg";
import { Player } from "@lottiefiles/react-lottie-player";
import LoadingBar from "react-top-loading-bar";

const About = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setProgress(progress + 10);
    setTimeout(() => {
      setProgress(progress + 20);
    }, 1000);
    setTimeout(() => {
      setProgress(100);
    }, 2000);
  }, []);

  return (
    <div className="w-full flex flex-col md:flex-row my-10">
      <LoadingBar
        color="#7DF9FF"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="w-3/12 md:flex justify-center items-center hidden">
        <img className="h-[600px]" src={img} alt="about-pic-img" />
      </div>
      <div className="w-full md:w-5/12 flex flex-col gap-4 items-center">
        <h1 className="text-4xl md:text-7xl font-thin">
          YOUR <span className="font-bold text-4xl md:text-7xl">TRUSTED</span>
        </h1>
        <h1 className="font-bold md:text-7xl text-5xl">E-COMMERCE </h1>
        <p className="md:text-7xl text-4xl font-thin">PLATFORM</p>
        <p className="text-center mt-5 md:mt-10 text-gray-600 px-5 md:px-0">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci
          quas debitis nemo porro labore suscipit facilis nisi. Autem, labore
          ipsum debitis nemo porro labore suscipit facilis nisi!
        </p>
        <div className="flex justify-around gap-2 md:gap-16">
          <button className="m-2 px-6 md:px-8 py-2 bg-red-600 text-white">
            Get Started{" "}
          </button>
          <button className="m-2 px-8 md:px-10 py-2 bg-blue-600 text-white">
            Read More
          </button>
        </div>
        <p className="text-2xl font-thin">SPECIAL DISCOUNT</p>
        <p className="text-2xl font-bold text-center">
          UP TO 50 % OFF FOR ALL ITEMS
        </p>
      </div>
      <div className="w-full flex flex-col md:w-4/12">
        <Player
          src="https://lottie.host/02c7225a-15b7-4410-960f-b81d3fda7efe/nbTMpf2cni.json"
          className="Player h-[300px]"
          loop
          autoplay
        />
        <Player
          src="https://lottie.host/b3a51c8b-af8b-49da-a2e6-9b7298f51dbc/8gvl1B3bFT.json"
          className="Player h-[300px] md:h-[600px] hidden md:inline-block absolute top-[25%] w-[350px] md:w-[600px] left-[60%]"
          loop
          autoplay
        />
      </div>
    </div>
  );
};

export default About;
