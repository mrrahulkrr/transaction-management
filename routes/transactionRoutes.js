const express = require('express');
const router = express.Router();
const { validateTransaction } = require('../middleware/validate');
const {
  createTransaction,
  getTransactions,
  updateTransaction,
  getTransaction
} = require('../controllers/transactionController');

router.post('/', validateTransaction, createTransaction);
router.get('/', getTransactions);
router.put('/:transaction_id', updateTransaction);
router.get('/:transaction_id', getTransaction);

module.exports = router;