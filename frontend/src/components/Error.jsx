import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useRouteError, Link } from "react-router-dom";

const Error = () => {
  const err = useRouteError();

  return (
    <div className="flex flex-col justify-center items-center m-4 gap-2 md:gap-4">
      <button className="m-2 px-4 py-2 bg-blue-500 text-white z-20 rounded-lg ">
        <Link to="/"> Back To Home</Link>
      </button>
      <h1 className="font-semibold md:font-bold text-3xl">OOPS!!!</h1>
      <h2 className="text-2xl md:text-3xl ">Something went wrong!!</h2>
      <h3 className="text-red-500 font-semibold">
        {err.status} : {err.statusText}
      </h3>
      <h2 className="text-red-500 font-semibold">{err.data}</h2>
      <Player
        src="https://lottie.host/dea776f6-1f66-4314-9e53-36072113ca77/npYGeEGLPP.json"
        className="Player md:h-[880px] md:w-[1200px] w-[310px] h-[650px] absolute top-[1%] left-[9%]"
        loop
        autoplay
      />
    </div>
  );
};

export default Error;
