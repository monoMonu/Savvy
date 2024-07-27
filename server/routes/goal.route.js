import express from 'express';
import { createGoal, getAllGoals, updateGoal } from '../controllers/goal.controller.js';
import { authUser } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', authUser, getAllGoals);
router.post('/create-goal', authUser, createGoal);
router.post('/update-goal', authUser, updateGoal);


export default router;
