# 💰 Wallet Transaction API

A backend system for managing client wallets, transactions, and order processing with external fulfillment integration.

## 🚀 Features

- JWT Authentication
- Wallet Credit/Debit System
- Ledger Tracking for Transactions
- Order Creation with Atomic Transactions
- External Fulfillment API Integration
- Error Handling & Validation

## 🛠 Tech Stack

- Node.js
- Express.js
- Sequelize ORM
- SQLite
- JWT Authentication

## 📌 API Endpoints

### Auth
POST /auth/login

### Wallet
POST /admin/wallet/credit  
POST /admin/wallet/debit  
GET /wallet/balance  

### Orders
POST /orders  
GET /orders/:order_id  

## ⚙️ Setup

```bash
npm install
npm start
