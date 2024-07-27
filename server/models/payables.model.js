import { model, Schema } from "mongoose";

const payablesSchema = new Schema({
   by: {
      type: Schema.Types.ObjectId,
      required: true
   },
   to: {
      type: Schema.Types.ObjectId,
      required: true
   },
   amount: {
      type: Number,
      required: true
   },
   occasion: {
      type: String,
      required: true
   }
})


const Payables = model('Payables', payablesSchema);
export default Payables;