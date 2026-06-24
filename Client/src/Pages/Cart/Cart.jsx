import { Rating } from "@mui/material";
import { MdOutlineArrowDropDown } from "react-icons/md";

const Cart = () => {
  return (
    <section className="bg-gray-200 py-10">
      <div className="container flex gap-4 items-start">
        <div className="w-[70%] bg-white border border-gray-200 px-4 py-5">
            <h3 className="text-[16px] font-bold mb-2!">Your Cart</h3>
            <p className="mb-3!">There are <span className="text-primary">2</span> products in your cart.</p>

            <div className="flex gap-8 border-b border-gray-300 pb-2 mt-2! mb-3!">
                <div className="w-30 h-30 rounded-md overflow-hidden">
                    <img className="w-full h-full object-cover object-top" src="https://api.spicezgold.com/download/file_1734529297930_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-1-202307260626.jpg" />
                </div>
                <div>
                    <p className="text-gray-500 font-medium text-[13px]">Sangaria</p>
                    <h3 className="font-bold">A-Line Kurti With Sharana & Dupatta</h3>
                    <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                    <div className="flex gap-4 items-center">
                        <span className="flex gap-1 items-center bg-gray-200 rounded-md py-1 px-2 text-[13px] font-medium">Size: S <MdOutlineArrowDropDown /></span>
                        <span className="flex gap-1 items-center bg-gray-200 rounded-md py-1 px-2 text-[13px] font-medium">Qty: 1 <MdOutlineArrowDropDown /></span>
                    </div>
                    <div className="flex gap-3 items-center font-bold">
                        <span>$58.00</span>
                        <span className="line-through">$58.00</span>
                        <span className="text-primary">20% OFF</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-8 border-b border-gray-300 pb-2 mt-2! mb-3!">
                <div className="w-30 h-30 rounded-md overflow-hidden">
                    <img className="w-full h-full object-cover object-top" src="https://api.spicezgold.com/download/file_1734529297930_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-1-202307260626.jpg" />
                </div>
                <div>
                    <p className="text-gray-500 font-medium text-[13px]">Sangaria</p>
                    <h3 className="font-bold">A-Line Kurti With Sharana & Dupatta</h3>
                    <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                    <div className="flex gap-4 items-center">
                        <span className="flex gap-1 items-center bg-gray-200 rounded-md py-1 px-2 text-[13px] font-medium">Size: S <MdOutlineArrowDropDown /></span>
                        <span className="flex gap-1 items-center bg-gray-200 rounded-md py-1 px-2 text-[13px] font-medium">Qty: 1 <MdOutlineArrowDropDown /></span>
                    </div>
                    <div className="flex gap-3 items-center font-bold">
                        <span>$58.00</span>
                        <span className="line-through">$58.00</span>
                        <span className="text-primary">20% OFF</span>
                    </div>
                </div>
            </div>
            <div className="flex gap-8 border-b border-gray-300 pb-2 mt-2! mb-3!">
                <div className="w-30 h-30 rounded-md overflow-hidden">
                    <img className="w-full h-full object-cover object-top" src="https://api.spicezgold.com/download/file_1734529297930_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-1-202307260626.jpg" />
                </div>
                <div>
                    <p className="text-gray-500 font-medium text-[13px]">Sangaria</p>
                    <h3 className="font-bold">A-Line Kurti With Sharana & Dupatta</h3>
                    <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                    <div className="flex gap-4 items-center">
                        <span className="flex gap-1 items-center bg-gray-200 rounded-md py-1 px-2 text-[13px] font-medium">Size: S <MdOutlineArrowDropDown /></span>
                        <span className="flex gap-1 items-center bg-gray-200 rounded-md py-1 px-2 text-[13px] font-medium">Qty: 1 <MdOutlineArrowDropDown /></span>
                    </div>
                    <div className="flex gap-3 items-center font-bold">
                        <span>$58.00</span>
                        <span className="line-through">$58.00</span>
                        <span className="text-primary">20% OFF</span>
                    </div>
                </div>
            </div>
            <div className="flex gap-8 border-b border-gray-300 pb-2 mt-2! mb-3!">
                <div className="w-30 h-30 rounded-md overflow-hidden">
                    <img className="w-full h-full object-cover object-top" src="https://api.spicezgold.com/download/file_1734529297930_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-1-202307260626.jpg" />
                </div>
                <div>
                    <p className="text-gray-500 font-medium text-[13px]">Sangaria</p>
                    <h3 className="font-bold">A-Line Kurti With Sharana & Dupatta</h3>
                    <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                    <div className="flex gap-4 items-center">
                        <span className="flex gap-1 items-center bg-gray-200 rounded-md py-1 px-2 text-[13px] font-medium">Size: S <MdOutlineArrowDropDown /></span>
                        <span className="flex gap-1 items-center bg-gray-200 rounded-md py-1 px-2 text-[13px] font-medium">Qty: 1 <MdOutlineArrowDropDown /></span>
                    </div>
                    <div className="flex gap-3 items-center font-bold">
                        <span>$58.00</span>
                        <span className="line-through">$58.00</span>
                        <span className="text-primary">20% OFF</span>
                    </div>
                </div>
            </div>
            <div className="flex gap-8 border-b border-gray-300 pb-2 mt-2! mb-3!">
                <div className="w-30 h-30 rounded-md overflow-hidden">
                    <img className="w-full h-full object-cover object-top" src="https://api.spicezgold.com/download/file_1734529297930_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-1-202307260626.jpg" />
                </div>
                <div>
                    <p className="text-gray-500 font-medium text-[13px]">Sangaria</p>
                    <h3 className="font-bold">A-Line Kurti With Sharana & Dupatta</h3>
                    <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                    <div className="flex gap-4 items-center">
                        <span className="flex gap-1 items-center bg-gray-200 rounded-md py-1 px-2 text-[13px] font-medium">Size: S <MdOutlineArrowDropDown /></span>
                        <span className="flex gap-1 items-center bg-gray-200 rounded-md py-1 px-2 text-[13px] font-medium">Qty: 1 <MdOutlineArrowDropDown /></span>
                    </div>
                    <div className="flex gap-3 items-center font-bold">
                        <span>$58.00</span>
                        <span className="line-through">$58.00</span>
                        <span className="text-primary">20% OFF</span>
                    </div>
                </div>
            </div>
            <div className="flex gap-8 border-b border-gray-300 pb-2 mt-2! mb-3!">
                <div className="w-30 h-30 rounded-md overflow-hidden">
                    <img className="w-full h-full object-cover object-top" src="https://api.spicezgold.com/download/file_1734529297930_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-1-202307260626.jpg" />
                </div>
                <div>
                    <p className="text-gray-500 font-medium text-[13px]">Sangaria</p>
                    <h3 className="font-bold">A-Line Kurti With Sharana & Dupatta</h3>
                    <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                    <div className="flex gap-4 items-center">
                        <span className="flex gap-1 items-center bg-gray-200 rounded-md py-1 px-2 text-[13px] font-medium">Size: S <MdOutlineArrowDropDown /></span>
                        <span className="flex gap-1 items-center bg-gray-200 rounded-md py-1 px-2 text-[13px] font-medium">Qty: 1 <MdOutlineArrowDropDown /></span>
                    </div>
                    <div className="flex gap-3 items-center font-bold">
                        <span>$58.00</span>
                        <span className="line-through">$58.00</span>
                        <span className="text-primary">20% OFF</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="w-[30%] bg-white border-gray-200 px-4 py-5">
            <h3 className="text-[16px] font-bold mb-2! border-b border-gray-300 pb-2">Cart Totals</h3>
            <div className="flex justify-between items-center py-1">
                <p className="font-bold">Subtotal</p>
                <p className="font-bold text-primary">$1300.00</p>
            </div>
            <div className="flex justify-between items-center py-1">
                <p className="font-bold">Shipping</p>
                <p className="font-bold text-primary">Free</p>
            </div>
            <div className="flex justify-between items-center py-1">
                <p className="font-bold">Estimate for</p>
                <p className="font-bold">United Kingdom</p>
            </div>
            <div className="flex justify-between items-center py-1">
                <p className="font-bold">Total</p>
                <p className="font-bold text-primary">$1300.00</p>
            </div>
            <button className="btn-primary mt-2! py-2! w-full font-bold!">CHECKOUT</button>
        </div>
      </div>
    </section>
  )
}

export default Cart;
