import User from '../models/user.model.js';
import asyncHandler from '../utils/asyncHandler.js'
import ApiError from '../utils/apiError.js';

export const getAllGoals = async (req, res) => {
  try {
      // Assuming req.user contains the authenticated user
      const userId = req.user._id;

      // Find the user by ID
      const user = await User.findById(userId);

      // Check if the user exists
      if (!user) throw new ApiError(404, 'User not found');
        

      // Get the user's goals
      const userGoals = user.goals;

      res.status(200).json({
          success: true,
          count: userGoals.length,
          goals: userGoals
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          message: error.message
      });
  }
};

export const createGoal = asyncHandler(async (req, res) => {
   const { title, targetAmount, frequency, amountPerFrequency } = req.body;
   const user = await User.findById(req.user._id);

   const newGoal = { title, targetAmount, frequency, amountPerFrequency };
   user.goals.push(newGoal);
   await user.save();

   res.status(201).json({ message: 'Goal created successfully', goals: user.goals });
});

export const updateGoal = asyncHandler(async (req, res) => {
   const { goalId, savedAmount } = req.body;
   const user = await User.findById(req.user._id);

   const goal = user.goals.id(goalId);
   if (!goal) throw new ApiError(404, 'Goal not found');

   if (user.bankBalance < savedAmount) throw new ApiError(400, 'Insufficient funds');

   goal.savedAmount = parseFloat(goal.savedAmount) + parseFloat(savedAmount);
   user.bankBalance -= savedAmount;

   await user.save();

   res.status(200).json({ message: 'Goal updated successfully', goals: user.goals });
});
