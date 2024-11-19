const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        error: 'Validation Error',
        details: Object.values(err.errors).map(e => e.message)
      });
    }
  
    if (err.name === 'CastError') {
      return res.status(400).json({
        error: 'Invalid ID format'
      });
    }
  
    res.status(500).json({
      error: 'Internal Server Error'
    });
  };
  
module.exports = errorHandler;