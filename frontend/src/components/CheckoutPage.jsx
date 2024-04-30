import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const isUserLogin = useSelector((store) => store?.data?.userLogin);
  console.log(isUserLogin);

  const [checkout, setCheckOut] = useState(false);

  const fullName = useRef();
  const mobileNo = useRef("");
  const houseNo = useRef("");
  const roadName = useRef("");
  const pincode = useRef("");

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

  if (!isUserLogin) {
    navigate("/login");
  }

  const handleAdressData = () => {
    console.log(fullName.current.value);
    console.log(mobileNo.current.value);
    console.log(houseNo.current.value);
    console.log(roadName.current.value);
    console.log(pincode.current.value);
    if (
      fullName.current.value &&
      mobileNo.current.value &&
      houseNo.current.value &&
      roadName.current.value &&
      pincode.current.value
    ) {
      setCheckOut(true);
    }
  };

  return (
    <div className="flex items-center flex-col gap-4 my-5">
      <LoadingBar
        color="#7DF9FF"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <h1 className="font-bold text-2xl">Address</h1>
      <div className="w-10/12 md:w-2/3 border border-gray-600 rounded-xl ">
        <form
          className="flex flex-col p-4 gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className="p-2 n-2 border border-black w-3/5 md:w-1/4 rounded-md"
            type="text"
            required
            ref={fullName}
            placeholder="Enter Full Name"
          />
          <input
            className="p-2 n-2 border border-black w-3/5 md:w-1/4 rounded-md"
            type="text"
            required
            placeholder="Mobile Number"
            ref={mobileNo}
          />
          <input
            className="p-2 n-2 border border-black w-full md:w-2/3 rounded-md"
            type="text"
            required
            placeholder="House No. , Building Name"
            ref={houseNo}
          />
          <input
            className="p-2 n-2 border border-black w-full md:w-2/3 rounded-md"
            type="text"
            required
            placeholder="Road Name, Area, Colony"
            ref={roadName}
          />
          <input
            className="p-2 n-2 border border-black w-2/5 md:w-1/6 rounded-md"
            type="text"
            required
            placeholder="Pincode"
            ref={pincode}
          />
          <button
            onClick={handleAdressData}
            type="submit"
            className="p-2 m-2 bg-blue-600 rounded-lg text-white px-6 w-36"
          >
            Save Address
          </button>
        </form>
      </div>

      <div className="flex gap-4 items-center flex-col md:flex-row">
        <h1 className="font-semibold text-xl px-5 md:px-0 text-center md:text-start">
          Please select Payment Mode of your order
        </h1>
         {" "}
        <input
          type="radio"
          id="cod"
          name="payment-option"
          defaultChecked
          value="cod"
        />
         {" "}
        <label defaultChecked htmlFor="cod">
          COD
        </label>
         {" "}
        <input
          type="radio"
          disabled
          id="pod"
          name="payment-option"
          value="pod"
        />
         {" "}
        <label readOnly htmlFor="pod">
          Pay Online
        </label>
         {" "}
        <input
          disabled
          type="radio"
          id="pod2"
          name="payment-option"
          value="pod2"
        />
         {" "}
        <label readOnly htmlFor="pod">
          Credit Card
        </label>
      </div>
      {checkout && (
        <Link to="/ordersuccessful">
          <button className="p-2 m-2 bg-blue-600 rounded-lg text-white px-6">
            Complete your Order
          </button>
        </Link>
      )}
    </div>
  );
};

export default CheckoutPage;
