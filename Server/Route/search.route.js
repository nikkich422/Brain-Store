import express from 'express';
import { getSearchSuggestions } from '../Controllers/search.controller.js';

const searchRouter = express.Router();

searchRouter.get('/suggestions', getSearchSuggestions);
export default searchRouter;