import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const AddressList = ({
  addresses = [],
  selectedAddress,
  onSelect,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="space-y-3">
      {addresses.map((addr) => {
        const isSelected = selectedAddress?._id === addr._id;

        return (
          <div
            key={addr._id}
            className={`border rounded-md p-4 cursor-pointer transition mb-2! ${
              isSelected
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-400"
            }`}
            onClick={() => onSelect(addr)}
          >
            {/* Top */}
            <div className="flex justify-between items-start">

              {/* Left */}
              <div className="flex items-start gap-2">
                <input
                  type="radio"
                  checked={isSelected}
                  onChange={() => onSelect(addr)}
                  className="mt-1"
                />

                <div>
                  <p className="font-semibold flex items-center gap-2">
                    {addr.fullName}

                    {addr.isDefault && (
                      <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded">
                        Default
                      </span>
                    )}
                  </p>
                  
                  <p className="text-sm text-gray-600 mt-1">
                    {[addr.addressLine1, addr.addressLine2, addr.city, addr.state]
                      .filter(Boolean)
                      .join(", ")}
                    - {addr.pincode}
                  </p>

                  <p className="text-sm text-gray-600">
                    Phone: {addr.mobile}
                  </p>
                </div>
              </div>

              {/* Right */}
              <div className="flex gap-3 text-gray-600">
                <FaEdit
                  className="cursor-pointer hover:text-blue-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(addr);
                  }}
                />
                <FaTrash
                  className="cursor-pointer hover:text-red-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(addr._id);
                  }}
                />
              </div>
            </div>

            {/* CTA */}
            {isSelected && (
              <button className="mt-3! btn-primary px-4 py-1 text-sm font-bold">
                Deliver Here
              </button>
            )}
          </div>
        );
      })}

      {addresses.length === 0 && (
        <p className="text-gray-500 text-sm">No addresses found</p>
      )}
    </div>
  );
};

export default AddressList;