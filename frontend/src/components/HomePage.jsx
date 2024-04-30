import React, { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import ContainerHome from "./ContainerHome";

const HomePage = () => {
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
    <div className="bg-gray-100 ">
      <LoadingBar
        color="#7DF9FF"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <ContainerHome />
    </div>
  );
};

export default HomePage;
