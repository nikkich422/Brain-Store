import express from "express";
import { getFavorites, toggleFavorite } from "../Controllers/wishlist.controller.js";
import auth from "../Middleware/auth.js";

const wishlistRouter = express.Router();

wishlistRouter.get('/', auth, getFavorites);
wishlistRouter.post('/', auth, toggleFavorite);

export default wishlistRouter;