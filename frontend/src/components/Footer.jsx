import React from "react";
import img from "./../../public/brain-store.png";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-600 text-white flex flex-col md:flex-row items-center justify-evenly p-2">
      <div className="3/12 flex flex-col items-center gap-3 mt-5">
        <img className="h-6 w-48" src={img} alt="logo" />
        <h2>© Brain Store 2024 All rights reserved</h2>
        <div className="flex h-6 justify-center md:justify-start items-center gap-3 ml-4">
          <a
            href="#"
            aria-label="Homepage"
            className="footer-octicon"
            title="GitHub"
          >
            <svg
              aria-hidden="true"
              className="octicon octicon-mark-github"
              height="24"
              version="1.1"
              viewBox="0 0 16 16"
              width="24"
            >
              <path
                fillRule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
              ></path>
            </svg>
          </a>
          <svg
            className="h-6 hover:cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            enableBackground="new 0 0 26 26"
            viewBox="0 0 26 26"
            id="linkedin-logo"
          >
            <path d="M24,0H2C0.9,0,0,0.9,0,2v22c0,1.1,0.9,2,2,2h22c1.1,0,2-0.9,2-2V2C26,0.9,25.1,0,24,0z M7.816,22H4V9.725h3.816V22z M5.878,8.219c-1.349,0-2.25-0.956-2.222-2.138C3.628,4.844,4.529,3.915,5.906,3.915c1.379,0,2.251,0.929,2.279,2.166C8.186,7.263,7.286,8.219,5.878,8.219z M22,22h-3.815v-6.802c0-1.582-0.553-2.661-1.934-2.661c-1.053,0-1.681,0.728-1.932,1.431c-0.1,0.226-0.15,0.603-0.15,0.953V22h-3.816v-8.358c0-1.532-0.05-2.837-0.1-3.916h3.313l0.176,1.682h0.076c0.502-0.779,1.757-1.958,3.79-1.958c2.51,0,4.392,1.656,4.392,5.271V22z"></path>
          </svg>
          <svg
            className="h-6 hover:cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            id="link"
          >
            <path d="M324.958 187.046c58.347 58.407 57.546 152.048.352 209.56a10.76 10.76 0 0 1-.352.361l-65.625 65.625c-57.881 57.881-152.05 57.873-209.922 0-57.881-57.871-57.881-152.05 0-209.921l36.236-36.236c9.609-9.609 26.158-3.223 26.654 10.357.633 17.307 3.736 34.694 9.463 51.485 1.939 5.686.554 11.975-3.694 16.223l-12.78 12.78c-27.369 27.369-28.228 71.933-1.128 99.57 27.367 27.909 72.35 28.075 99.927.498l65.625-65.615c27.53-27.53 27.415-72.028 0-99.443-3.614-3.607-7.255-6.41-10.099-8.368a15.66 15.66 0 0 1-6.784-12.311c-.387-10.319 3.27-20.953 11.424-29.107l20.561-20.561c5.392-5.392 13.85-6.054 20.102-1.69a148.956 148.956 0 0 1 20.04 16.793z"></path>
            <path d="M462.59 49.408c-57.872-57.873-152.041-57.881-209.922 0l-65.625 65.625c-.117.117-.244.244-.352.361-57.193 57.512-57.995 151.153.352 209.56a148.906 148.906 0 0 0 20.04 16.793c6.252 4.363 14.711 3.7 20.102-1.69l20.561-20.561c8.154-8.154 11.811-18.788 11.424-29.107a15.659 15.659 0 0 0-6.784-12.31c-2.844-1.958-6.484-4.761-10.099-8.368-27.415-27.415-27.53-71.913 0-99.443l65.625-65.615c27.577-27.577 72.559-27.411 99.927.498 27.1 27.637 26.242 72.201-1.128 99.57l-12.78 12.78c-4.248 4.248-5.634 10.537-3.694 16.223 5.727 16.791 8.83 34.179 9.463 51.485.497 13.58 17.045 19.967 26.654 10.357l36.236-36.236c57.88-57.872 57.88-152.051 0-209.922z"></path>
          </svg>
        </div>
      </div>
      <div className="w-full text-center md:w-2/12 mt-4 md:mt-0">
        <h1>Company</h1>
        <p>About us</p>
        <p>Blog</p>
        <p>Contact us</p>
        <p>Pricing</p>
        <p>Testimonials</p>
      </div>
      <div className="2/12 md:inline-block hidden">
        <h1>Support</h1>
        <p>Help Center</p>
        <p>Terms of Service</p>
        <p>Legal</p>
        <p>Privacy Policy</p>
        <p>Status</p>
      </div>
      <div className="md:w-3/12 w-11/12 flex md:flex-row flex-col justify-center items-center">
        <h1 className="md:p-2 p-0">Stay up to date</h1>
        <div className="flex">
          <input
            className="p-1 md:m-2 m-1 border border-white rounded-lg"
            type="text"
          />
          <button className="p-1 md:m-2 m-1 bg-red-400 w-12 rounded-lg">
            <EmailOutlinedIcon />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
