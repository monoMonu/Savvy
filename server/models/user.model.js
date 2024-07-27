import { Schema, model } from "mongoose";

const goalSchema = new Schema({
   title: String,
   targetAmount: Number,
   savedAmount: { type: Number, default: 0 },
   frequency: String, // daily, weekly, monthly
   amountPerFrequency: Number
});

const userSchema = new Schema({
   fullname: { 
      type: String,
      required: true
   },
   email: { 
      type: String, 
      required: true, 
      unique: true 
   },
   password: { 
      type: String, 
      required: true 
   },
   balance: { 
      type: Number, 
      default: 0 
   },
   debts: { 
      type: Map, 
      of: Number, 
      default: {} 
   },
   goals: [goalSchema]
},
{
   timestamps: true
});

const User = model('User', userSchema);
export default User;