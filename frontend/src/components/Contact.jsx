import { useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";

const Contact = () => {
  const [progress, setProgress] = useState(0);
  const toast = useToast();

  useEffect(() => {
    setProgress(progress + 10);
    setTimeout(() => {
      setProgress(progress + 20);
    }, 1000);
    setTimeout(() => {
      setProgress(100);
    }, 2000);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const examplePromise = new Promise((resolve, reject) => {
      setTimeout(() => resolve(200), 5000);
    });

    // Will display the loading toast until the promise is either resolved
    // or rejected.
    toast.promise(examplePromise, {
      success: { title: "Message Sent...", description: "Thank you" },
      error: { title: "Error Occured...", description: "Something wrong" },
      loading: { title: "Sending message...", description: "Please wait" },
    });
  }

  return (
    <div className="bg-gray-200 flex flex-col items-center justify-center">
      <LoadingBar
        color="#7DF9FF"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="flex w-11/12 md:w-5/6 justify-evenly py-7 absolute top-20 flex-wrap md:flex-nowrap bg-white shadow-lg">
        <div className="w-36 md:w-64 bg-white flex flex-col justify-center items-center py-4">
          <span>
            <svg
              className="w-20 md:w-40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </span>
          <h1>OUR MAIN OFFICE</h1>
          <p>Bhopal MP</p>
        </div>
        <div className="w-36 md:w-64 bg-white flex flex-col justify-center items-center py-4">
          <span>
            <svg
              className="w-20 md:w-40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M3 5.5C3 14.0604 9.93959 21 18.5 21C18.8862 21 19.2691 20.9859 19.6483 20.9581C20.0834 20.9262 20.3009 20.9103 20.499 20.7963C20.663 20.7019 20.8185 20.5345 20.9007 20.364C21 20.1582 21 19.9181 21 19.438V16.6207C21 16.2169 21 16.015 20.9335 15.842C20.8749 15.6891 20.7795 15.553 20.6559 15.4456C20.516 15.324 20.3262 15.255 19.9468 15.117L16.74 13.9509C16.2985 13.7904 16.0777 13.7101 15.8683 13.7237C15.6836 13.7357 15.5059 13.7988 15.3549 13.9058C15.1837 14.0271 15.0629 14.2285 14.8212 14.6314L14 16C11.3501 14.7999 9.2019 12.6489 8 10L9.36863 9.17882C9.77145 8.93713 9.97286 8.81628 10.0942 8.64506C10.2012 8.49408 10.2643 8.31637 10.2763 8.1317C10.2899 7.92227 10.2096 7.70153 10.0491 7.26005L8.88299 4.05321C8.745 3.67376 8.67601 3.48403 8.55442 3.3441C8.44701 3.22049 8.31089 3.12515 8.15802 3.06645C7.98496 3 7.78308 3 7.37932 3H4.56201C4.08188 3 3.84181 3 3.63598 3.09925C3.4655 3.18146 3.29814 3.33701 3.2037 3.50103C3.08968 3.69907 3.07375 3.91662 3.04189 4.35173C3.01413 4.73086 3 5.11378 3 5.5Z"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </span>
          <h1>PHONE NUMBER</h1>
          <p>888-0123-4567</p>
          <p>(Toll Free)</p>
        </div>
        <div className="w-36 md:w-64 bg-white flex flex-col justify-center items-center py-4">
          <span>
            <svg
              className="w-20 md:w-40"
              fill="#000000"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 32.001 29.001"
              xmlSpace="preserve"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g id="fax">
                  {" "}
                  <path d="M12.141,0H7.861c-1.027,0-1.86,0.833-1.86,1.86v18.28c0,1.027,0.833,1.86,1.86,1.86H9v0.001H8.001v1.999 c0,0.553,0.447,0.999,0.999,1v1c0,0.552-0.448,1-1,1H6c-0.552,0-1-0.448-1-1v-1c0-1.654-1.346-3-3-3H1c-0.553,0-1,0.447-1,1 s0.447,1,1,1h1c0.552,0,1,0.448,1,1v1c0,1.654,1.346,3,3,3h2c1.654,0,3-1.346,3-3v-1h0.001c0.553,0,1-0.447,1-1v-1.999H11v-0.001 h1.141c1.027,0,1.86-0.833,1.86-1.86V1.86C14.001,0.833,13.168,0,12.141,0z"></path>{" "}
                  <path d="M30.001,0.001h-13c-1.104,0-2,0.896-2,2v21c0,1.104,0.896,2,2,2h13c1.104,0,2-0.896,2-2v-21 C32.001,0.896,31.105,0.001,30.001,0.001z M20.001,22.001c0,0.553-0.447,1-1,1h-1c-0.553,0-1-0.447-1-1v-1c0-0.553,0.447-1,1-1h1 c0.553,0,1,0.447,1,1V22.001z M20.001,17.001c0,0.553-0.447,1-1,1h-1c-0.553,0-1-0.447-1-1v-1c0-0.553,0.447-1,1-1h1 c0.553,0,1,0.447,1,1V17.001z M20.001,12.001c0,0.553-0.447,1-1,1h-1c-0.553,0-1-0.447-1-1v-1c0-0.553,0.447-1,1-1h1 c0.553,0,1,0.447,1,1V12.001z M25.001,22.001c0,0.553-0.447,1-1,1h-1c-0.553,0-1-0.447-1-1v-1c0-0.553,0.447-1,1-1h1 c0.553,0,1,0.447,1,1V22.001z M25.001,17.001c0,0.553-0.447,1-1,1h-1c-0.553,0-1-0.447-1-1v-1c0-0.553,0.447-1,1-1h1 c0.553,0,1,0.447,1,1V17.001z M25.001,12.001c0,0.553-0.447,1-1,1h-1c-0.553,0-1-0.447-1-1v-1c0-0.553,0.447-1,1-1h1 c0.553,0,1,0.447,1,1V12.001z M30.001,22.001c0,0.553-0.447,1-1,1h-1c-0.553,0-1-0.447-1-1v-1c0-0.553,0.447-1,1-1h1 c0.553,0,1,0.447,1,1V22.001z M30.001,17.001c0,0.553-0.447,1-1,1h-1c-0.553,0-1-0.447-1-1v-1c0-0.553,0.447-1,1-1h1 c0.553,0,1,0.447,1,1V17.001z M30.001,12.001c0,0.553-0.447,1-1,1h-1c-0.553,0-1-0.447-1-1v-1c0-0.553,0.447-1,1-1h1 c0.553,0,1,0.447,1,1V12.001z M30.001,6.001c0,1.104-0.896,2-2,2h-9c-1.104,0-2-0.896-2-2v-2c0-1.104,0.896-2,2-2h9 c1.104,0,2,0.896,2,2V6.001z"></path>{" "}
                </g>{" "}
                <g id="Layer_1"> </g>{" "}
              </g>
            </svg>
          </span>
          <h1>FAX</h1>
          <p>1-234-567-8900</p>
        </div>
        <div className="w-36 md:w-64 bg-white flex flex-col justify-center items-center py-4">
          <span>
            <svg
              className="w-20 md:w-40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="2"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                ></rect>{" "}
              </g>
            </svg>
          </span>
          <h1>EMAIL</h1>
          <p>contact@developer.com</p>
        </div>
      </div>
      <div className="w-full md:w-3/5 bg-[#89d8e3] px-6 md:px-28 py-4 flex flex-col gap-4 mb-0 md:mb-10 mt-[400px] md:mt-[320px]">
        <h1 className="font-bold text-5xl mt-10 ">Contact Us</h1>
        <form className="flex flex-col gap-4">
          <input
            className="w-full p-2 m-2"
            placeholder="Enter your name"
            type="text"
            required
          />
          <input
            className="w-full p-2 m-2"
            placeholder="Enter valid email address"
            type="email"
            required
          />
          <textarea
            className="w-full h-36 p-2 m-2"
            name="message"
            id=""
            cols="30"
            rows="2"
            required
          ></textarea>
          <button
            onClick={(e) => handleSubmit(e)}
            className="border-[2px] border-white font-bold px-6 py-2 my-2 mx-auto hover:bg-white"
            type="submit"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
