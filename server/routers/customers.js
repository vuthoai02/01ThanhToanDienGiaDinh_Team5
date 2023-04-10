import express from 'express';
import { getCustomer, getBillsByCustomerCode,payment } from '../controllers/customerControllers.js';

const router = express.Router();

router.get('/', getCustomer);
router.get('/get-bills', getBillsByCustomerCode);
router.put('/payment', payment);

export default router;