import express from 'express';

import * as adminControllers from '../controllers/adminControllers.js';
import * as customerControllers from '../controllers/customerControllers.js';

const router = express.Router();

router.get('/', adminControllers.getAllCustomers);
router.get('/get-all-users', adminControllers.getAllUsers);
router.delete('/delete-user', adminControllers.deleteUser);
router.delete('/delete-customer',adminControllers.deleteCustomer);
router.put('delete-bill', adminControllers.deleteBill);
router.post('/create-customer', adminControllers.createCustomer);
router.put('/update-bill', adminControllers.upadteBill);
router.put('/update-customer', adminControllers.updateCustomer);
router.get('/get-customer', customerControllers.getCustomer);
router.get('/get-bill', customerControllers.getBill);

export default router;

