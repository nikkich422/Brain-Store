import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import toast from "react-hot-toast";

const AddressForm = ({ onClose, onSave, editingAddress }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
    isDefault: false,
  });

  // EDIT MODE
  useEffect(() => {
    if (editingAddress) {
      setFormData({
        fullName: editingAddress.fullName || "",
        addressLine1: editingAddress.addressLine1 || "",
        addressLine2: editingAddress.addressLine2 || "",
        city: editingAddress.city || "",
        state: editingAddress.state || "",
        pincode: editingAddress.pincode || "",
        country: editingAddress.country || "",
        mobile: editingAddress.mobile || "",
        isDefault: editingAddress.isDefault || false,
      });
    }
  }, [editingAddress]);

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {

    if(formData.fullName === "") return toast.error("Please Enter Full Name");
    if(formData.addressLine1 === "") return toast.error("Please Enter Adreess");
    if(formData.city === "") return toast.error("Please Enter City");
    if(formData.state === "") return toast.error("Please Enter State");
    if(formData.pincode === "") return toast.error("Please Enter Pincode");
    if(formData.country === "") return toast.error("Please Enter Country");
    if(formData.mobile === "") return toast.error("Please Enter Mobile Number");
    if (!/^[0-9]{6}$/.test(formData.pincode)) return toast.error("Pincode must be exactly 6 digits");
    if (!/^[0-9]{10}$/.test(formData.mobile)) return toast.error("Mobile number must be exactly 10 digits");

    setFormData({
        fullName: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        mobile: "",
        isDefault: false,
    });

    toast.success(`Address ${editingAddress ? "Updated" : "saved"} successfully.`);
    onSave(formData);
  };

  return (
    <div className="bg-white p-4 rounded-md mt-3! border border-gray-200! space-y-3">

      <h3 className="font-semibold text-xl">
        {editingAddress ? "Edit Address" : "Add New Address"}
      </h3>
      <h3 className="text-[16px] font-bold mb-2!">Billing Details</h3>
        <div className="flex gap-2">
            <TextField
            className="w-[33%]"
            size="small"
            label="Full Name *"
            variant="outlined"
            name="fullName"
            value={formData.fullName}
            onChange={handleFormChange}
            />
        </div>
        <h6 className="text-[13px] font-bold mt-4! text-gray-800">
            Street Address *
        </h6>
            <TextField
            className="w-full mt-1!"
            size="small"
            label="House No. & Street Name *"
            variant="outlined"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleFormChange}
            />
            <TextField
            className="w-full mt-2!"
            size="small"
            label="Apartment, suite, unit, etc. (Optional)"
            variant="outlined"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleFormChange}
            />
        <div className="flex gap-1.5 mt-2!">
            <TextField
            className="w-[33%]"
            size="small"
            label="Town / City *"
            variant="outlined"
            name="city"
            value={formData.city}
            onChange={handleFormChange}
            />
            <TextField
            className="w-[33%]"
            size="small"
            label="State*"
            variant="outlined"
            name="state"
            value={formData.state}
            onChange={handleFormChange}
            />
            <TextField
            className="w-[33%]"
            size="small"
            label="Country *"
            variant="outlined"
            name="country"
            value={formData.country}
            onChange={handleFormChange}
            />
        </div>
        <h6 className="text-[13px] font-bold mt-4! text-gray-800">
            Pincode / ZIP *
        </h6>
        <div className="flex gap-1.5 mt-2!">
            <TextField
            className="w-[33%]"
            size="small"
            label="Pincode *"
            variant="outlined"
            name="pincode"
            value={formData.pincode}
            inputProps={{
              maxLength: 6,
              inputMode: "numeric",
              pattern: "[0-9]"
            }}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setFormData((prev) => ({ ...prev, pincode: value }));
            }}
            />
            <TextField
            className="w-[33%]"
            size="small"
            label="Phone Number *"
            variant="outlined"
            name="mobile"
            value={formData.mobile}
            onChange={handleFormChange}
            inputProps={{
              maxLength: 10,
              inputMode: "numeric",
              pattern: "[0-9]*",
            }}
            onKeyDown={(e) => {
              if (
                !/[0-9]/.test(e.key) &&
                e.key !== "Backspace" &&
                e.key !== "ArrowLeft" &&
                e.key !== "ArrowRight"
              ) {
                e.preventDefault();
              }
            }}
            />
        </div>

      <div className="flex items-center gap-2 mt-2!">
        <input type="checkbox" name="isDefault" id="isDefault" checked={formData.isDefault} onChange={handleFormChange} />
        <label htmlFor="isDefault" className="cursor-pointer">Set as default</label>
      </div>

      <div className="flex gap-3 font-bold mt-2!">
        <button className="btn-primary px-4 py-2" onClick={handleSubmit}>
          {editingAddress ? "Update" : "Save"}
        </button>
        <button className="btn-secondary border px-4 py-2 rounded" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddressForm;