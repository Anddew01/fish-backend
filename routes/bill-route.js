// bills-route.js
const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const billsController = require('../controllers/bill-controller'); 

router.get('/bills', authenticate, billsController.getBills);
router.get('/bills/:billId', authenticate, billsController.getBillById);
router.post('/bills', authenticate, billsController.createBill);
router.put('/bills/:billId/return', authenticate, billsController.returnBill);  // แก้ไขในบรรทัดนี้
router.put('/bills/:billId', authenticate, billsController.updateBill);
router.delete('/bills/:billId', authenticate, billsController.deleteBill);

module.exports = router;
