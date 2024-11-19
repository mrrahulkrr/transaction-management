# Transaction Management API

A RESTful API built with Node.js, Express, and MongoDB for managing financial transactions. This API allows you to create users, manage transactions (deposits and withdrawals), and track transaction statuses.

## Prerequisites

Before you begin, ensure you have installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Postman](https://www.postman.com/downloads/) (recommended for API testing)

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd transaction-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Create a `.env` file in the root directory
   - Add the following configurations:
   ```env
   MONGODB_URI=mongodb://localhost:27017/transaction-management
   PORT=5000
   ```

4. **Start MongoDB**
   - Make sure MongoDB is running on your system
   - For Windows: MongoDB service should be running
   - For Mac/Linux: Run `mongod` in terminal

5. **Start the application**
   ```bash
   # Development mode with auto-reload
   npm run dev

   # Production mode
   npm start
   ```

## API Testing Guide

### 1. Create a User
First, create a user to associate with transactions.

**Endpoint:** `POST http://localhost:5000/api/users`

**Request Body:**
```json
{
    "name": "John Doe",
    "email": "john@example.com"
}
```

**Expected Response:**
```json
{
    "_id": "user_id_here",
    "name": "John Doe",
    "email": "john@example.com"
}
```

### 2. Create a Transaction
Create a new transaction using the user ID received from the previous step.

**Endpoint:** `POST http://localhost:5000/api/transactions`

**Request Body:**
```json
{
    "amount": 100.00,
    "transaction_type": "DEPOSIT",
    "user": "user_id_from_step_1"
}
```

**Expected Response:**
```json
{
    "transaction_id": "transaction_id_here",
    "amount": 100.00,
    "transaction_type": "DEPOSIT",
    "status": "PENDING",
    "user": "user_id_here",
    "timestamp": "2024-11-19T10:30:00Z"
}
```

### 3. Get All Transactions for a User
Retrieve all transactions for a specific user.

**Endpoint:** `GET http://localhost:5000/api/transactions?user_id=user_id_here`

**Expected Response:**
```json
{
    "transactions": [
        {
            "transaction_id": "transaction_id_here",
            "amount": 100.00,
            "transaction_type": "DEPOSIT",
            "status": "PENDING",
            "timestamp": "2024-11-19T10:30:00Z"
        }
    ]
}
```

### 4. Get Specific Transaction
Get details of a specific transaction.

**Endpoint:** `GET http://localhost:5000/api/transactions/transaction_id_here`

**Expected Response:**
```json
{
    "transaction_id": "transaction_id_here",
    "amount": 100.00,
    "transaction_type": "DEPOSIT",
    "status": "PENDING",
    "timestamp": "2024-11-19T10:30:00Z"
}
```

### 5. Update Transaction Status
Update the status of an existing transaction.

**Endpoint:** `PUT http://localhost:5000/api/transactions/transaction_id_here`

**Request Body:**
```json
{
    "status": "COMPLETED"
}
```

**Expected Response:**
```json
{
    "transaction_id": "transaction_id_here",
    "amount": 100.00,
    "transaction_type": "DEPOSIT",
    "status": "COMPLETED",
    "timestamp": "2024-11-19T10:30:00Z"
}
```



## API Validation Rules

1. **Transaction Types:**
   - Valid values: `DEPOSIT`, `WITHDRAWAL`

2. **Transaction Status:**
   - Valid values: `PENDING`, `COMPLETED`, `FAILED`
   - Default value: `PENDING`
   - Can only be updated to `COMPLETED` or `FAILED`

3. **Amount:**
   - Must be a positive number
   - Required field

4. **User ID:**
   - Must be a valid MongoDB ObjectId
   - Required field
   - Must exist in the users collection

## Error Handling

The API includes comprehensive error handling for:
- Invalid input validation
- Invalid IDs (user_id, transaction_id)
- Non-existent resources
- Database connection errors
- Invalid status transitions
