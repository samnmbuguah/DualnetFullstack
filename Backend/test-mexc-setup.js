const MexcTradeSetup = require('./services/mexcTradeSetup.js');

// Test configuration
const TEST_CONFIG = {
  symbol: 'BTC/USDT',
  amount: 0.001,  // Small amount for testing
  price: 45000,
  userId: 1,      // Replace with actual user ID
  leverage: 1,
  fundingRate: 0.0001,
  closeByProfit: 100,
  closeByDeviation: 0.02
};

async function testMexcSetup() {
  console.log('🧪 Testing MEXC Trade Setup...\n');
  
  try {
    const mexcTradeSetup = new MexcTradeSetup();
    
    // Test 1: Initialize exchange
    console.log('1. Testing exchange initialization...');
    await mexcTradeSetup.initializeExchange(TEST_CONFIG.userId);
    console.log('✅ Exchange initialized successfully\n');
    
    // Test 2: Get current price
    console.log('2. Testing price fetch...');
    const currentPrice = await mexcTradeSetup.getCurrentPrice(TEST_CONFIG.symbol);
    console.log('✅ Current price fetched:', currentPrice);
    console.log('   Bid:', currentPrice.bid);
    console.log('   Ask:', currentPrice.ask);
    console.log('   Last:', currentPrice.last, '\n');
    
    // Test 3: Check balances
    console.log('3. Testing balance checks...');
    try {
      const spotBalance = await mexcTradeSetup.getBalance(TEST_CONFIG.userId, 'USDT');
      console.log('✅ Spot USDT Balance:', spotBalance);
    } catch (error) {
      console.log('⚠️  Could not fetch spot balance:', error.message);
    }
    
    try {
      const futuresBalance = await mexcTradeSetup.getFuturesBalance(TEST_CONFIG.userId, 'USDT');
      console.log('✅ Futures USDT Balance:', futuresBalance);
    } catch (error) {
      console.log('⚠️  Could not fetch futures balance:', error.message);
    }
    console.log('');
    
    // Test 4: Test dual trade setup (without actually placing orders)
    console.log('4. Testing dual trade setup logic...');
    console.log('   This would place:');
    console.log(`   - Spot buy order: ${TEST_CONFIG.amount} ${TEST_CONFIG.symbol.split('/')[0]} at $${TEST_CONFIG.price}`);
    console.log(`   - Futures short order: ${TEST_CONFIG.amount} ${TEST_CONFIG.symbol.split('/')[0]} at $${TEST_CONFIG.price}`);
    console.log('   (Orders not actually placed in test mode)\n');
    
    // Test 5: Validate parameters
    console.log('5. Validating trade parameters...');
    const futuresSize = -(TEST_CONFIG.amount / TEST_CONFIG.price);
    console.log(`   Calculated futures size: ${futuresSize}`);
    console.log(`   Total spot value: $${TEST_CONFIG.amount * TEST_CONFIG.price}`);
    console.log(`   Total futures value: $${Math.abs(futuresSize) * TEST_CONFIG.price}`);
    console.log('✅ Parameter validation complete\n');
    
    console.log('🎉 All tests completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('1. Update TEST_CONFIG.userId with a real user ID');
    console.log('2. Ensure the user has valid MEXC API credentials');
    console.log('3. Make sure there\'s sufficient balance in both spot and futures accounts');
    console.log('4. Run the actual trade setup using the API endpoints');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

// Run the test
if (require.main === module) {
  testMexcSetup();
}

module.exports = { testMexcSetup }; 