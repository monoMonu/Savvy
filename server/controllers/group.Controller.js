import User from '../models/user.model.js';
import Group from '../models/group.model.js';
import Transaction from '../models/transactions.model.js'; // Correct import for Transaction
import Payables from '../models/payables.model.js';
import Receivables from '../models/receivable.model.js';

// Create a new group
export const createGroup = async (req, res) => {
  const { name, memberIds } = req.body;
  const creatorId = req.user._id; // Access user ID correctly

  if (!name || !memberIds || !Array.isArray(memberIds)) {
    return res.status(400).send({ message: 'Invalid input' });
  }


  try {
    const group = new Group({
      name,
      members: [creatorId, ...memberIds]
    });

    await group.save();
    res.status(201).send({ message: 'Group created successfully', group });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// Record a payment within a group
export const recordPayment = async (req, res) => {
  const { amount, groupId, occasion, receiverId } = req.body;
  const payerId = req.user._id; // Access user ID correctly

  if (!amount || !groupId || !occasion || !receiverId) {
    return res.status(400).send({ message: 'Invalid input' });
  }

  try {
    const group = await Group.findById(groupId).populate('members');
    if (!group) {
      return res.status(404).send({ message: 'Group not found' });
    }

    const splitAmount = amount / group.members.length;

    const payer = await User.findById(payerId);
    const receiver = await User.findById(receiverId);
    if (!payer) {
      return res.status(404).send({ message: 'Payer not found' });
    }
    if (payer.balance < amount) {
      return res.status(400).send({ message: 'Insufficient balance' });
    }

    // Deduct the amount from payer's balance
    payer.balance -= amount;
    receiver.balance = parseFloat(receiver.balance) + parseFloat(amount);
    await payer.save();
    await receiver.save();

    // Record the transaction
    const transaction = new Transaction({
      sender: payerId,
      receiver: receiverId,
      groupId,
      amount,
      occasion // Ensure the Transaction model handles the occasion field
    });
    await transaction.save();

    // Split the amount among group members and create payables and receivables
    for (const member of group.members) {
      if (member._id.toString() !== payerId.toString()) {
          const payable = new Payables({
            to: payerId,
            by: member._id,
            amount: splitAmount,
            occasion
          });
          await payable.save();

          const receivable = new Receivables({
            from: member._id,
            by: payerId,
            amount: splitAmount,
            occasion
          });
          await receivable.save();
      }
    }

    res.status(201).send({ message: 'Payment recorded successfully' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
