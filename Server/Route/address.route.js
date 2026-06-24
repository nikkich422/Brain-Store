import express from "express";
import auth from "../Middleware/auth.js";
import { addAddress, deleteAddress, getAddresses, updateAddress } from "../Controllers/address.controller.js";

const addressRouter = express.Router();

addressRouter.get('/', auth, getAddresses);
addressRouter.post('/', auth, addAddress);
addressRouter.put('/:id', auth, updateAddress);
addressRouter.delete('/:id', auth, deleteAddress);

export default addressRouter;