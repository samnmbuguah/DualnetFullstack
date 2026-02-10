# MEXC Trade Setup Guide

This guide explains how to use the MEXC trade setup functionality to create a dual trade where you buy a coin with a limit order and simultaneously create a short position at the same price.

## Overview

The MEXC trade setup allows you to:
- Place a limit buy order for spot trading
- Simultaneously create a short position in futures at the same price
- Manage both positions together with a unique position ID
- Monitor order status and cancel orders if needed

## Prerequisites

1. **MEXC API Credentials**: You need valid MEXC API key and secret
2. **Account Setup**: Ensure your MEXC account has both spot and futures trading enabled
3. **Sufficient Balance**: Have enough USDT in both spot and futures accounts
4. **CCXT Library**: The system uses CCXT for MEXC API integration

## API Endpoints

### 1. Create Dual Trade Setup

**Endpoint**: `POST /mexc-trade-setup`

**Headers**: 
```
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

**Request Body**:
```json
{
  "symbol": "BTC/USDT",
  "amount": 0.001,
  "price": 45000,
  "userId": 123,
  "leverage": 1,
  "fundingRate": 0.0001,
  "closeByProfit": 100,
  "closeByDeviation": 0.02
}
```

**Parameters**:
- `symbol` (required): Trading pair (e.g., "BTC/USDT", "ETH/USDT")
- `amount` (required): Amount to buy in base currency (e.g., BTC amount)
- `price` (required): Limit price for both spot buy and futures short
- `userId` (required): User ID to fetch API credentials
- `leverage` (optional): Leverage for futures position (default: 1)
- `fundingRate` (optional): Funding rate (default: 0)
- `closeByProfit` (optional): Profit threshold to close position (default: 0)
- `closeByDeviation` (optional): Deviation threshold to close position (default: 0)

**Response**:
```json
{
  "message": "Dual trade setup executed successfully",
  "positionId": "uuid-here",
  "spotOrder": {
    "id": "spot_order_id",
    "status": "open",
    "amount": 0.001,
    "price": 45000
  },
  "futuresOrder": {
    "id": "futures_order_id", 
    "status": "open",
    "size": 0.001,
    "price": 45000
  }
}
```

### 2. Check Order Status

**Endpoint**: `GET /mexc-order-status`

**Query Parameters**:
- `symbol`: Trading pair
- `orderId`: Order ID to check
- `orderType`: "spot" or "futures" (default: "spot")
- `userId`: User ID

**Response**:
```json
{
  "id": "order_id",
  "status": "closed",
  "filled": 0.001,
  "remaining": 0,
  "average": 45000,
  "cost": 45,
  "fee": 0.045
}
```

### 3. Cancel Order

**Endpoint**: `POST /mexc-cancel-order`

**Request Body**:
```json
{
  "symbol": "BTC/USDT",
  "orderId": "order_id_here",
  "orderType": "spot",
  "userId": 123
}
```

### 4. Check Balance

**Endpoint**: `GET /mexc-balance`

**Query Parameters**:
- `userId`: User ID
- `currency`: Currency to check (default: "USDT")
- `type`: "spot" or "futures" (default: "spot")

## Usage Examples

### JavaScript/Node.js Example

```javascript
const axios = require('axios');

// Create dual trade setup
async function createDualTrade() {
  try {
    const response = await axios.post('http://localhost:3000/mexc-trade-setup', {
      symbol: 'BTC/USDT',
      amount: 0.001,
      price: 45000,
      userId: 123,
      leverage: 1,
      closeByProfit: 100
    }, {
      headers: {
        'Authorization': 'Bearer your_jwt_token',
        'Content-Type': 'application/json'
      }
    });

    console.log('Trade setup successful:', response.data);
    return response.data.positionId;
  } catch (error) {
    console.error('Trade setup failed:', error.response.data);
  }
}

// Check order status
async function checkOrderStatus(symbol, orderId, orderType, userId) {
  try {
    const response = await axios.get(`http://localhost:3000/mexc-order-status`, {
      params: { symbol, orderId, orderType, userId },
      headers: { 'Authorization': 'Bearer your_jwt_token' }
    });
    
    console.log('Order status:', response.data);
  } catch (error) {
    console.error('Error checking order status:', error.response.data);
  }
}

// Cancel order
async function cancelOrder(symbol, orderId, orderType, userId) {
  try {
    const response = await axios.post('http://localhost:3000/mexc-cancel-order', {
      symbol, orderId, orderType, userId
    }, {
      headers: { 'Authorization': 'Bearer your_jwt_token' }
    });
    
    console.log('Order cancelled:', response.data);
  } catch (error) {
    console.error('Error cancelling order:', error.response.data);
  }
}
```

### cURL Examples

```bash
# Create dual trade setup
curl -X POST http://localhost:3000/mexc-trade-setup \
  -H "Authorization: Bearer your_jwt_token" \
  -H "Content-Type: application/json" \
  -d '{
    "symbol": "BTC/USDT",
    "amount": 0.001,
    "price": 45000,
    "userId": 123,
    "leverage": 1
  }'

# Check order status
curl -X GET "http://localhost:3000/mexc-order-status?symbol=BTC/USDT&orderId=order_id&orderType=spot&userId=123" \
  -H "Authorization: Bearer your_jwt_token"

# Cancel order
curl -X POST http://localhost:3000/mexc-cancel-order \
  -H "Authorization: Bearer your_jwt_token" \
  -H "Content-Type: application/json" \
  -d '{
    "symbol": "BTC/USDT",
    "orderId": "order_id_here",
    "orderType": "spot",
    "userId": 123
  }'
```

## How It Works

1. **Initialization**: The system initializes MEXC exchange connection using your API credentials
2. **Price Check**: Gets current market price for reference
3. **Simultaneous Orders**: Places both spot buy and futures short orders at the same limit price
4. **Position Tracking**: Creates bot records in the database to track both positions
5. **Error Handling**: If one order fails, the system attempts to cancel the other order

## Risk Management

- **Partial Fills**: The system handles partial fills and updates position sizes accordingly
- **Order Cancellation**: If one order fails, the other is automatically cancelled
- **Balance Checks**: Ensure sufficient balance before placing orders
- **Position Monitoring**: Use the position ID to track and manage both positions together

## Error Handling

Common errors and solutions:

1. **Insufficient Balance**: Ensure you have enough USDT in both spot and futures accounts
2. **Invalid Symbol**: Use correct trading pair format (e.g., "BTC/USDT")
3. **API Credentials**: Verify your MEXC API key and secret are correct
4. **Market Closed**: Check if the market is open for trading
5. **Price Out of Range**: Ensure your limit price is within acceptable range

## Testing

Use the example script to test the functionality:

```bash
cd Backend
node examples/mexcTradeExample.js
```

## Security Notes

- Store API credentials securely
- Use environment variables for sensitive data
- Implement proper authentication and authorization
- Monitor API usage and implement rate limiting
- Regularly rotate API keys

## Support

For issues or questions:
1. Check the logs for detailed error messages
2. Verify your MEXC API credentials
3. Ensure sufficient account balance
4. Check MEXC API documentation for any changes 