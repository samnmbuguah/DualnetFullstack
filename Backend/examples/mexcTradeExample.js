const MexcTradeSetup = require('../services/mexcTradeSetup.js');

// Example usage of MEXC Trade Setup
async function exampleMexcTrade() {
  try {
    // Initialize the MEXC trade setup
    const mexcTradeSetup = new MexcTradeSetup();
    
    // Example parameters for a dual trade setup
    const tradeParams = {
      symbol: 'BTC/USDT',        // Trading pair
      amount: 0.001,             // Amount to buy (in BTC)
      price: 45000,              // Limit price for both orders
      userId: 123,               // User ID (will be used to fetch API credentials)
      leverage: 1,               // Leverage for futures
      fundingRate: 0.0001,       // Funding rate
      closeByProfit: 100,        // Close by profit threshold (in USDT)
      closeByDeviation: 0.02     // Close by deviation (2%)
    };

    console.log('Executing MEXC dual trade setup...');
    console.log('Parameters:', tradeParams);

    // Execute the dual trade
    const result = await mexcTradeSetup.executeDualTrade(tradeParams);

    if (result.success) {
      console.log('✅ Trade setup successful!');
      console.log('Position ID:', result.positionId);
      console.log('Spot Order:', result.spotOrder);
      console.log('Futures Order:', result.futuresOrder);
      console.log('Message:', result.message);
    } else {
      console.log('❌ Trade setup failed!');
      console.log('Error:', result.error);
      console.log('Spot Order:', result.spotOrder);
      console.log('Futures Order:', result.futuresOrder);
    }

  } catch (error) {
    console.error('Error in example:', error);
  }
}

// Example function to check order status
async function checkOrderStatus() {
  try {
    const mexcTradeSetup = new MexcTradeSetup();
    
    // Initialize exchange first
    await mexcTradeSetup.initializeExchange(123);
    
    // Check spot order status
    const spotStatus = await mexcTradeSetup.checkOrderStatus(
      'BTC/USDT', 
      'order_id_here', 
      'spot'
    );
    console.log('Spot Order Status:', spotStatus);
    
    // Check futures order status
    const futuresStatus = await mexcTradeSetup.checkOrderStatus(
      'BTC/USDT', 
      'order_id_here', 
      'futures'
    );
    console.log('Futures Order Status:', futuresStatus);
    
  } catch (error) {
    console.error('Error checking order status:', error);
  }
}

// Example function to cancel orders
async function cancelOrders() {
  try {
    const mexcTradeSetup = new MexcTradeSetup();
    
    // Initialize exchange first
    await mexcTradeSetup.initializeExchange(123);
    
    // Cancel spot order
    const spotCancel = await mexcTradeSetup.cancelOrder(
      'BTC/USDT', 
      'order_id_here', 
      'spot'
    );
    console.log('Spot Order Cancelled:', spotCancel);
    
    // Cancel futures order
    const futuresCancel = await mexcTradeSetup.cancelOrder(
      'BTC/USDT', 
      'order_id_here', 
      'futures'
    );
    console.log('Futures Order Cancelled:', futuresCancel);
    
  } catch (error) {
    console.error('Error cancelling orders:', error);
  }
}

// Example function to check balances
async function checkBalances() {
  try {
    const mexcTradeSetup = new MexcTradeSetup();
    
    // Check spot balance
    const spotBalance = await mexcTradeSetup.getBalance(123, 'USDT');
    console.log('Spot USDT Balance:', spotBalance);
    
    // Check futures balance
    const futuresBalance = await mexcTradeSetup.getFuturesBalance(123, 'USDT');
    console.log('Futures USDT Balance:', futuresBalance);
    
  } catch (error) {
    console.error('Error checking balances:', error);
  }
}

// Export functions for use in other files
module.exports = {
  exampleMexcTrade,
  checkOrderStatus,
  cancelOrders,
  checkBalances
};

// Run example if this file is executed directly
if (require.main === module) {
  console.log('Running MEXC Trade Setup Example...');
  exampleMexcTrade();
} 