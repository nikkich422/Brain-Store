import React from 'react'
import { FaPinterestP } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaRegMessage } from "react-icons/fa6";
import FooterShippingRow from '../FooterShippingRow/FooterShippingRow';

const Footer = () => {
  return (
    <footer>
        <FooterShippingRow />
        <div className='flex container py-10'>
            <div className='border-e border-gray-300 w-[30%]'>
                <h2 className='font-bold text-xl mb-3!'>Contact Us</h2>
                <p className='mb-0! text-[14px] font-medium text-gray-600'>Brain Store - Classic shop</p>
                <p className='mb-3! text-[14px] font-medium text-gray-600'>507 Union Trade Centre France</p>
                <p className='mb-4! text-[14px] font-medium text-gray-600'>Sales@yourcompany.com</p>
                <h1 className='text-[#e06213] font-bold text-2xl mb-2!'>(91)-9876-543-210</h1>
                <div className='flex items-center gap-4 mb-4!'>
                    <FaRegMessage className='text-[#e06213] text-3xl' />
                    <div>
                        <h3 className='font-bold'>Online Chat</h3>
                        <h3 className='font-bold'>Call Expert Help</h3>
                    </div>
                </div>
            </div>
            <div className='flex w-[70%]'>
                <div className='w-[30%] pl-3'>
                    <h3 className='font-bold text-xl mb-3!'>Products</h3>
                    <p className='mb-2! text-[14px] font-medium text-gray-600'>Price Drop</p>
                    <p className='mb-2! text-[14px] font-medium text-gray-600'>New Products</p>
                    <p className='mb-2! text-[14px] font-medium text-gray-600'>Best Sales</p>
                    <p className='mb-2! text-[14px] font-medium text-gray-600'>Contact Us</p>
                    <p className='mb-2! text-[14px] font-medium text-gray-600'>Sitemap</p>
                    <p className='mb-2! text-[14px] font-medium text-gray-600'>Store</p>
                </div>
                <div className='w-[30%]'>
                    <h3 className='font-bold text-xl mb-3!'>Our Company</h3>
                    <p className='mb-2! text-[14px] font-medium text-gray-600'>Delivery</p>
                    <p className='mb-2! text-[14px] font-medium text-gray-600'>Legal Notice</p>
                    <p className='mb-2! text-[14px] font-medium text-gray-600'>Terms and Conditions of use</p>
                    <p className='mb-2! text-[14px] font-medium text-gray-600'>About Us</p>
                    <p className='mb-2! text-[14px] font-medium text-gray-600'>Secure Payment</p>
                    <p className='mb-2! text-[14px] font-medium text-gray-600'>Login</p>
                </div>
                <div className='w-[40%]'>
                    <h3 className='font-bold text-xl mb-3!'>Subscribe to Newsletter</h3>
                    <p className='mb-4! text-[14px] font-medium text-gray-600'>Subscribe to our newsletter to get news about special discounts.</p>
                    <div>
                        <input className='w-full border border-gray-300 focus:outline-none focus:border-[#e06213]! rounded-md px-2 py-1.25 transition-all mb-3!' type='text' placeholder='Your Email Address' />
                        <button className='btn-primary mb-4!'>SUBSCRIBE</button>
                    </div>
                    <div>
                        <input className='relative top-0.5 mr-1 checked:bg-[#e06213] inline-block cursor-pointer' type="checkbox" id="subscribe" name="subscribe" value="yes" />
                        <label htmlFor="subscribe" className='mb-2! text-[14px] font-medium text-gray-600 ml-1! cursor-pointer'>I agree to the terms and conditions and privacy policy.</label>
                    </div>
                </div>
            </div>
        </div>
      <div className='border-t border-gray-200 container flex justify-between p-2 items-center'>
        <div className='flex gap-1 items-center text-gray-600'>
            <FaFacebook className='border border-gray-300 rounded-full p-1.25 w-8.75 h-8.75 text-gray-600 cursor-pointer hover:border-[#ffbb90] hover:text-[#e06213] transition-all delay-50' />
            <FaLinkedin className='border border-gray-300 rounded-full p-1.25 w-8.75 h-8.75 text-gray-600 cursor-pointer hover:border-[#ffbb90] hover:text-[#e06213] transition-all delay-50' />
            <FaPinterestP className='border border-gray-300 rounded-full p-1.25 w-8.75 h-8.75 text-gray-600 cursor-pointer hover:border-[#ffbb90] hover:text-[#e06213] transition-all delay-50' />
            <FaYoutube className='border border-gray-300 rounded-full p-1.25 w-8.75 h-8.75 text-gray-600 cursor-pointer hover:border-[#ffbb90] hover:text-[#e06213] transition-all delay-50' />
        </div>
        <div className='font-bold text-gray-600'>© 2026- Ecommerce Template</div>
      </div>
    </footer>
  )
}

export default Footer;