import express from 'express';

import * as adminControllers from '../controllers/adminControllers.js';
import * as customerControllers from '../controllers/customerControllers.js';
import * as userControllers from '../controllers/usersControllers.js';

const router = express.Router();

router.get('/', adminControllers.getAllCustomers);
router.get('/get-all-users', adminControllers.getAllUsers);
router.post('/delete-user', adminControllers.deleteUser);
router.post('/delete-customer',adminControllers.deleteCustomer);
router.put('delete-bill', adminControllers.deleteBill);
router.post('/create-customer', adminControllers.createCustomer);
router.put('/update-bill', adminControllers.upadteBill);
router.put('/update-customer', adminControllers.updateCustomer);
router.get('/get-customer', customerControllers.getCustomer);
router.get('/get-bill-by-code', customerControllers.getBillsByCustomerCode);
router.get('/get-user',userControllers.getUserByEmail);
router.put('/change-auth',adminControllers.changeAuth);
router.post('/create-bill', adminControllers.createBill);
router.get('/get-bills',adminControllers.getBills);
router.post('/delete-bill',adminControllers.deleteBill);


export default router;

