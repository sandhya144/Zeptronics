import express from "express";
import { createOrder } from "../controllers/orderController";
import { isAuthenticated } from "../middleware/isAuthenticated";


const router = express.Router()

router.post("/create-order", isAuthenticated , createOrder)
router.post("/create-order", isAuthenticated , createOrder)

export default router