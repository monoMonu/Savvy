import express from 'express';
import { createGroup, recordPayment } from '../controllers/group.controller.js';
import { authUser } from '../middlewares/auth.middleware.js'; // Importing named export

const router = express.Router();

router.post('/create-group', authUser, createGroup); // Using the correct middleware
router.post('/record-payment', authUser, recordPayment); // Using the correct middleware

export default router;
// payments.route.js
