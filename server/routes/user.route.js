import { Router } from 'express';
import {
  changePassword,
  getUserDetails,
  logInUser,
  logOutUser,
  registerUser,
  updateAvatar,
  updateUserDetails,
  getUserIdByEmail // Make sure this function is defined in your controller
} from '../controllers/user.controller.js';
import { authUser } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';

const router = Router();

// User routes
router.post('/register', upload.single('avatar'), registerUser);
router.post('/login', logInUser);
router.get('/logout', authUser, logOutUser);
router.get('/getuserdetails', authUser, getUserDetails);
router.put('/updateuserdetails', authUser, updateUserDetails);
router.patch('/update-avatar', authUser, upload.single('avatar'), updateAvatar);
router.put('/changepassword', authUser, changePassword);

// Route to get user ID by email
router.get('/get-user-id',authUser, getUserIdByEmail);

export default router;
