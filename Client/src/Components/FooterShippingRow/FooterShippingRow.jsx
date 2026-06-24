import React from 'react'
import { BiSupport } from "react-icons/bi";
import { GoGift } from "react-icons/go";
import { MdOutlinePayment } from "react-icons/md";
import { PiKeyReturn } from "react-icons/pi";
import { MdOutlineLocalShipping } from "react-icons/md";

const FooterShippingRow = () => {
  return (
    <div className='container flex justify-between py-12 border-b border-gray-200'>
      <div className='flex flex-col items-center gap-1'>
        <MdOutlineLocalShipping className='text-6xl text-gray-700' />
        <h3 className='font-bold text-gray-700'>Free Shipping</h3>
        <p className='text-[12px] text-gray-600 font-medium'>For all Orders above ₹499</p>
      </div>

      <div className='flex flex-col items-center gap-1'>
        <PiKeyReturn className='text-6xl text-gray-700' />
        <h3 className='font-bold text-gray-700'>30 Days Returns</h3>
        <p className='text-[12px] text-gray-600 font-medium'>For an Exchange Product</p>
      </div>

      <div className='flex flex-col items-center gap-1'>
        <MdOutlinePayment className='text-6xl text-gray-700' />
        <h3 className='font-bold text-gray-700'>Secure Payment</h3>
        <p className='text-[12px] text-gray-600 font-medium'>Payments Cards Accepted</p>
      </div>

      <div className='flex flex-col items-center gap-1'>
        <GoGift className='text-6xl text-gray-700' />
        <h3 className='font-bold text-gray-700'>Special Gifts</h3>
        <p className='text-[12px] text-gray-600 font-medium'>Our First Product Order</p>
      </div>

      <div className='flex flex-col items-center gap-1'>
        <BiSupport className='text-6xl text-gray-700' />
        <h3 className='font-bold text-gray-700'>Support 24/7</h3>
        <p className='text-[12px] text-gray-600 font-medium'>Contact us Anytime</p>
      </div>
      
    </div>
  )
}

export default FooterShippingRow
