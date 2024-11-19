// controllers/transactionController.js
const Transaction = require('../model/transaction');
const mongoose = require('mongoose');

const createTransaction = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.body.user)) {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }

    const transaction = new Transaction({
      ...req.body,
      status: 'PENDING'
    });

    const savedTransaction = await transaction.save();
    
    res.status(201).json({
      transaction_id: savedTransaction._id,
      amount: savedTransaction.amount,
      transaction_type: savedTransaction.transaction_type,
      status: savedTransaction.status,
      user: savedTransaction.user,
      timestamp: savedTransaction.timestamp
    });
  } catch (error) {
    console.error('Transaction creation error:', error);
    res.status(400).json({ 
      error: error.message || 'Error creating transaction',
      details: error.errors
    });
  }
};

const getTransactions = async (req, res) => {
  try {
    const { user_id } = req.query;
    
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }

    const transactions = await Transaction.find({ user: user_id });
    
    res.json({
      transactions: transactions.map(t => ({
        transaction_id: t._id,
        amount: t.amount,
        transaction_type: t.transaction_type,
        status: t.status,
        timestamp: t.timestamp,
        user: t.user
      }))
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTransaction = async (req, res) => {
  try {
    const { transaction_id } = req.params;

    // Validate transaction ID format
    if (!mongoose.Types.ObjectId.isValid(transaction_id)) {
      return res.status(400).json({ error: 'Invalid transaction ID format' });
    }

    const transaction = await Transaction.findById(transaction_id);
    
    if (!transaction) {
      return res.status(404).json({ 
        error: 'Transaction not found',
        message: `No transaction found with ID: ${transaction_id}`
      });
    }

    res.json({
      transaction_id: transaction._id,
      amount: transaction.amount,
      transaction_type: transaction.transaction_type,
      status: transaction.status,
      timestamp: transaction.timestamp,
      user: transaction.user
    });
  } catch (error) {
    console.error('Error fetching transaction:', error);
    res.status(400).json({ error: error.message });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const { transaction_id } = req.params;
    const { status } = req.body;

    // Validate transaction ID format
    if (!mongoose.Types.ObjectId.isValid(transaction_id)) {
      return res.status(400).json({ error: 'Invalid transaction ID format' });
    }

    // Validate status
    if (!['COMPLETED', 'FAILED'].includes(status)) {
      return res.status(400).json({ 
        error: 'Invalid status',
        message: 'Status must be either COMPLETED or FAILED'
      });
    }

    const transaction = await Transaction.findByIdAndUpdate(
      transaction_id,
      { status },
      { new: true, runValidators: true }
    );

    if (!transaction) {
      return res.status(404).json({ 
        error: 'Transaction not found',
        message: `No transaction found with ID: ${transaction_id}`
      });
    }

    res.json({
      transaction_id: transaction._id,
      amount: transaction.amount,
      transaction_type: transaction.transaction_type,
      status: transaction.status,
      timestamp: transaction.timestamp,
      user: transaction.user
    });
  } catch (error) {
    console.error('Error updating transaction:', error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createTransaction,
  getTransactions,
  updateTransaction,
  getTransaction
};