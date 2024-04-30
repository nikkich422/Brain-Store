import React, { useEffect, useState } from "react";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteAll } from "../Utils/cartSlice";
import LoadingBar from "react-top-loading-bar";

const SuccessOrder = () => {
  const randomNum = (Math.random() * 10000000000000).toFixed(0);
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    dispatch(deleteAll());
    setProgress(progress + 10);
    setTimeout(() => {
      setProgress(progress + 20);
    }, 1000);
    setTimeout(() => {
      setProgress(100);
    }, 2000);
  }, []);

  return (
    <>
      <LoadingBar
        color="#7DF9FF"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="h-[20vh]"></div>
      <Result
        status="success"
        title="Order Successfully Placed"
        subTitle={
          "Order number is " + randomNum + " it may takes upto 1-5 days"
        }
        extra={[
          <Link to="/cart" key={"1"}>
            <Button type="primary" key="console">
              Go To Cart
            </Button>
          </Link>,
          <Link to="/" key={"2"}>
            <Button key="buy">Buy Again</Button>
          </Link>,
        ]}
      />
      <div className="h-[30vh]"></div>
    </>
  );
};
export default SuccessOrder;
