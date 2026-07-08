import express from 'express';
import {isAuthenticated } from '../middleware/isAuthenticated.js';
import { addToCart, getCart, removeCart, updateQuantity } from '../controllers/cartController.js';


const router = express.Router();

router.get('/', isAuthenticated, getCart );
router.post('/add', isAuthenticated, addToCart)
router.put('/update',isAuthenticated, updateQuantity)
router.delete("/remove", isAuthenticated, removeCart)


export default router;