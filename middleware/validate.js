const validateTransaction = (req, res, next) => {
    const { amount, transaction_type, user } = req.body;
    
    if (!amount || !transaction_type || !user) {
      return res.status(400).json({ 
        error: 'Missing required fields' 
      });
    }
  
    if (!['DEPOSIT', 'WITHDRAWAL'].includes(transaction_type)) {
      return res.status(400).json({
        error: 'Invalid transaction type'
      });
    }
  
    if (amount <= 0) {
      return res.status(400).json({ 
        error: 'Amount must be greater than 0' 
      });
    }
  
    next();
  };
  
  module.exports = { validateTransaction };