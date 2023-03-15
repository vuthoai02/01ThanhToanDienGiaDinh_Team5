import express from 'express';
import { getCustomer, getBill, payment } from '../controllers/customerControllers.js';

const router = express.Router();

router.get('/', getCustomer);
router.get('/get-bill', getBill);
router.put('/payment', payment);

export default router;