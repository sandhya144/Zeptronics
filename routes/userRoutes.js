import express from 'express';
import { register, verify } from '../controllers/usercontroller.js';

const router = express.Router();

router.post('/register',register);
router.post('/verify',verify);

export default router;