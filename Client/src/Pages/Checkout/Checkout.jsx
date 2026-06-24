import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddressList from "../../Components/AddressList";
import AddressForm from "../../Components/AddressForm";
import { addAddress, addAddressLocal, deleteAddress, deleteAddressLocal, getAddresses, restoreAddress, updateAddress, updateAddressLocal } from "../../redux/slice/addressSlice";
import toast from "react-hot-toast";
import API from "../../api/api";
import { useNavigate } from 'react-router-dom';
import { clearCart } from "../../redux/slice/cartSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const addresses = useSelector((state) => state?.address?.addresses);
  const cartItems = useSelector((store) => store?.cart?.cartItems);
   
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  useEffect(() => {
    dispatch(getAddresses());
  }, [dispatch]);

  useEffect(() => {
    if(addresses.length === 0){
      setSelectedAddress(null);
      return;
    }

    const defaultAddr = addresses?.find((a) => a.isDefault);
    setSelectedAddress(defaultAddr || (addresses && addresses[0]));
  }, [addresses]);

  const navigate = useNavigate();

  const handleSave = (data) => {
    // add + edit
    if(editingAddress){
        const prevData = editingAddress;

        // Local Update
        dispatch(updateAddressLocal({ id: editingAddress._id, data }));

        // API Call
        dispatch(updateAddress({ id: editingAddress._id, data }))
        .unwrap()
        .catch(() => {
            // Rollback
            dispatch(updateAddressLocal({ id: editingAddress._id, data: prevData }));
        })
    }
    else{
        const tempId = Date.now().toString();

        // Local Add
        dispatch(addAddressLocal({ ...data, _id: tempId }));

        dispatch(addAddress({ ...data }))
        .unwrap()
        .catch(() => {
            // Rollback
            dispatch(deleteAddressLocal(tempId));
        })
    }

    setShowForm(false);
    setEditingAddress(null);
  }

  const handleDelete = (id) => {
    const deltedAddr = addresses.find((add) => add._id === id);
    dispatch(deleteAddressLocal(id));

    dispatch(deleteAddress(id))
    .unwrap()
    .catch(() => {
      // Rollback
      dispatch(restoreAddress(deltedAddr));
      toast.error("Something went wrong !!"); 
    })

    toast.success("Address deleted successfully."); 
  }

  const handleEdit = (addr) => {
    setEditingAddress(addr);
    setShowForm(true);
  }

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const handlePayment = async () => {
    if (!selectedAddress) {
      return toast.error("Please select address");
    }
  
    if (cartItems.length === 0) {
      return toast.error("Cart is empty");
    }

    try {
      // Create DB order
      const orderRes = await API.post(`/api/order/create`, {
        cartItems,
        address: selectedAddress,
        totalAmount,
      });
  
      const dbOrder = orderRes.data.order;
  
      // Create Razorpay order
      const { data } = await API.post(`/api/payment/create-order`, {
        amount: totalAmount,
      });
  
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        order_id: data.order.id,
  
        handler: async function (response) {
          try {
            const verifyRes = await API.post(`/api/order/verify`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: dbOrder._id,
            });
  
            if (verifyRes.data.success) {
              dispatch(clearCart());

              navigate("/order-success", {
                state: { orderId: dbOrder._id }
              });
            }
          } catch (error) {
            toast.error("Payment verification failed");
          }
        },
      };
  
      const rzp = new window.Razorpay(options);

      // payment failed check
      rzp.on("payment.failed", function () {
        toast.error("Payment failed");
      });
      rzp.open();

    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <section className="bg-gray-200 py-10">
      <div className="container flex gap-4 items-start">
        <div className="w-[70%] bg-white border border-gray-200 px-4 py-5">
          <div className="flex justify-between mb-3!">
            <h3 className="font-bold text-lg">Delivery Address</h3>
            <button
              className="text-blue-600 font-semibold cursor-pointer"
              onClick={() => {
                setShowForm(true);
                setEditingAddress(null);
              }}
            >
              + Add New
            </button>
          </div>

          <AddressList
            addresses={addresses}
            selectedAddress={selectedAddress}
            onSelect={setSelectedAddress}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          {showForm && (
            <AddressForm
              key={editingAddress?._id || "new"}
              onClose={() => {
                setShowForm(false);
                setEditingAddress(null);
              }}
              onSave={handleSave}
              editingAddress={editingAddress}
            />
          )}
        </div>
        <div className="w-[33%] bg-white border-gray-200 px-4 py-5">
          {selectedAddress && (
            <div className="text-md">
              <p className="font-semibold">{selectedAddress.fullName}</p>
              <p>{selectedAddress.addressLine1}</p>
              <p>{selectedAddress?.addressLine2}</p>
              <p>{selectedAddress.mobile}</p>
            </div>
          )}
          <h3 className="text-[16px] font-bold mb-2! border-b border-gray-300 pb-2">
            Your Order
          </h3>
          <div className="max-h-50 overflow-auto">
            {cartItems.map((product) => (
              <div className="flex gap-2 mt-1! border-b border-gray-200 mb-2! pr-3  pb-2">
                <div className="w-12 h-12 rounded-md overflow-hidden">
                  <img
                    className="w-full h-full object-cover object-top"
                    src={product?.image}
                  />
                </div>
                <div className="flex items-center gap-2 justify-between flex-1">
                  <div>
                  <p className="font-bold text-[15px]">{product?.title}</p>
                  <div className="text-[13px] text-gray-600 flex gap-3">
                    {product?.size && (
                      <span className="bg-gray-100 px-2 py-0.5 rounded">
                        Size: {product.size}
                      </span>
                    )}

                    <span>Qty: {product?.quantity}</span>
                  </div>
                  </div>
                  <p>₹{product?.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center py-1 border-b border-gray-300 scroll-pr-32">
            <p className="font-bold">Total Products: {cartItems?.length}</p>
            <p className="font-bold">Subtotal: ₹{totalAmount}</p>
          </div>
          <button className="btn-primary mt-2! py-2! w-full font-bold!" onClick={handlePayment}>
            Proceed to Payment
          </button>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
