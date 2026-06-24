import React, { useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const QtyBox = ({quantity, setQuantity}) => {

    function increment(){
        console.log("inc");
        setQuantity(quantity + 1);
    }
    function decrement(){
        if(quantity > 1){
            setQuantity(quantity - 1);
        }
    }

  return (
    <div className='flex w-20 border border-gray-300 rounded-sm'>
        <input className='w-[50%] px-2' type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
        <div className='flex w-[50%] flex-col'>
            <span className='border-l border-b border-gray-300 flex justify-center cursor-pointer' onClick={increment}>
                <IoIosArrowUp />
            </span>
            <span className='border-l border-gray-300 flex justify-center cursor-pointer' onClick={decrement}>
                <IoIosArrowDown />
            </span>
        </div>
    </div>
  )
}

export default QtyBox
