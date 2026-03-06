# Wallet Transaction API

This project implements a simple wallet transaction system.

## Features
- Admin can credit wallet balance
- Admin can debit wallet balance
- Clients can create orders
- Wallet balance validation before order creation
- Fulfillment API integration
- Ledger tracking for transactions

## Setup

Install dependencies

npm install

Seed initial data

npm run seed

Start server

npm start

Server runs on:
http://localhost:3000

## APIs

POST /admin/wallet/credit  
POST /admin/wallet/debit  
POST /orders  
GET /orders/:order_id  
GET /wallet/balance

## Tech Stack
Node.js  
Express.js  
Sequelize ORM  
SQLite
