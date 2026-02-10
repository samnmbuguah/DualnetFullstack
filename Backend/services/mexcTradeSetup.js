const ccxt = require('ccxt');
const getApiCredentials = require('./getApiCredentials');
const Bots = require('../models/BotsModel.js');
const uuid = require('uuid');

class MexcTradeSetup {
  constructor() {
    this.exchange = null;
  }

  async initializeExchange(userId) {
    try {
      const credentials = await getApiCredentials(userId);
      if (!credentials) {
        throw new Error('Could not fetch API credentials. Aborting trade.');
      }

      // Initialize MEXC exchange with API credentials
      this.exchange = new ccxt.mexc({
        apiKey: credentials.apiKey,
        secret: credentials.apiSecret,
        sandbox: false, // Set to true for testing
        options: {
          defaultType: 'spot', // Default to spot trading
        }
      });

      // Load markets
      await this.exchange.loadMarkets();
      console.log('MEXC exchange initialized successfully');
      return true;
    } catch (error) {
      console.error('Error initializing MEXC exchange:', error);
      throw error;
    }
  }

  async getCurrentPrice(symbol) {
    try {
      const ticker = await this.exchange.fetchTicker(symbol);
      return {
        bid: ticker.bid,
        ask: ticker.ask,
        last: ticker.last,
        timestamp: ticker.timestamp
      };
    } catch (error) {
      console.error('Error fetching current price:', error);
      throw error;
    }
  }

  async createLimitBuyOrder(symbol, amount, price) {
    try {
      console.log(`Creating limit buy order: ${symbol}, amount: ${amount}, price: ${price}`);

      const order = await this.exchange.createLimitBuyOrder(symbol, amount, price);

      console.log('Limit buy order created:', order);
      return order;
    } catch (error) {
      console.error('Error creating limit buy order:', error);
      throw error;
    }
  }

  async createFuturesShortOrder(symbol, size, price) {
    try {
      console.log(`Creating futures short order: ${symbol}, size: ${size}, price: ${price}`);

      // Switch to futures trading
      this.exchange.options.defaultType = 'swap';

      // Create a limit sell order for short position
      const order = await this.exchange.createLimitSellOrder(symbol, size, price, {
        reduceOnly: false,
        close: false
      });

      console.log('Futures short order created:', order);
      return order;
    } catch (error) {
      console.error('Error creating futures short order:', error);
      throw error;
    }
  }

  async executeDualTrade(params) {
    const {
      symbol,
      amount,
      price,
      userId,
      leverage = 1,
      fundingRate = 0,
      closeByProfit = 0,
      closeByDeviation = 0
    } = params;

    let positionId = uuid.v4();
    let spotOrder = null;
    let futuresOrder = null;

    try {
      // Initialize exchange
      await this.initializeExchange(userId);

      // Get current market price for reference
      const currentPrice = await this.getCurrentPrice(symbol);
      console.log('Current market price:', currentPrice);

      // Calculate futures size (negative for short)
      const futuresSize = -(amount / price);

      // Execute both orders simultaneously
      const [spotResult, futuresResult] = await Promise.allSettled([
        this.createLimitBuyOrder(symbol, amount, price),
        this.createFuturesShortOrder(symbol, Math.abs(futuresSize), price)
      ]);

      // Check results
      if (spotResult.status === 'fulfilled') {
        spotOrder = spotResult.value;
        console.log('Spot order successful:', spotOrder);
      } else {
        console.error('Spot order failed:', spotResult.reason);
      }

      if (futuresResult.status === 'fulfilled') {
        futuresOrder = futuresResult.value;
        console.log('Futures order successful:', futuresOrder);
      } else {
        console.error('Futures order failed:', futuresResult.reason);
      }

      // If both orders succeeded, create bot records
      if (spotOrder && futuresOrder) {
        const spotBot = {
          userId: userId,
          matchingPairId: symbol,
          spotSize: amount,
          status: 'Spot Position Opened',
          spotEntryPrice: price,
          futuresEntryPrice: price,
          timestamp: new Date(),
          leverage: leverage,
          tradeType: 'buy',
          orderId: spotOrder.id,
          currentPrice: price,
          isClose: false,
          takerFee: 0, // Will be updated when order fills
          spotValue: amount * price,
          futuresValue: Math.abs(futuresSize) * price,
          amountIncurred: (amount * price) + (Math.abs(futuresSize) * price),
          quantoMultiplier: 1,
          positionId: positionId,
          fundingRate: fundingRate,
          accumulatedFunding: 0,
          openingDifference: 0,
          profitThreshold: closeByProfit,
          closeByDeviation: closeByDeviation,
        };

        const futuresBot = {
          userId: userId,
          matchingPairId: symbol,
          futuresSize: futuresSize,
          spotSize: amount,
          status: 'Futures Position Opened',
          spotEntryPrice: price,
          futuresEntryPrice: price,
          timestamp: new Date(),
          leverage: leverage,
          tradeType: 'short',
          orderId: futuresOrder.id,
          currentPrice: price,
          isClose: false,
          takerFee: 0, // Will be updated when order fills
          spotValue: amount * price,
          futuresValue: Math.abs(futuresSize) * price,
          amountIncurred: (amount * price) + (Math.abs(futuresSize) * price),
          quantoMultiplier: 1,
          positionId: positionId,
          fundingRate: fundingRate,
          accumulatedFunding: 0,
          openingDifference: 0,
          profitThreshold: closeByProfit,
          closeByDeviation: closeByDeviation,
        };

        await Bots.create(spotBot);
        await Bots.create(futuresBot);

        console.log('Bot records created successfully');
        return {
          success: true,
          positionId: positionId,
          spotOrder: spotOrder,
          futuresOrder: futuresOrder,
          message: 'Dual trade setup executed successfully'
        };
      } else {
        // Handle partial success or failure
        let errorMessage = 'Trade setup failed: ';
        if (!spotOrder) errorMessage += 'Spot order failed. ';
        if (!futuresOrder) errorMessage += 'Futures order failed. ';

        // If spot order succeeded but futures failed, we might want to cancel the spot order
        if (spotOrder && !futuresOrder) {
          try {
            await this.exchange.cancelOrder(spotOrder.id, symbol);
            console.log('Cancelled spot order due to futures order failure');
          } catch (cancelError) {
            console.error('Error cancelling spot order:', cancelError);
          }
        }

        return {
          success: false,
          error: errorMessage,
          spotOrder: spotOrder,
          futuresOrder: futuresOrder
        };
      }

    } catch (error) {
      console.error('Error in executeDualTrade:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async checkOrderStatus(symbol, orderId, orderType = 'spot') {
    try {
      if (orderType === 'futures') {
        this.exchange.options.defaultType = 'swap';
      } else {
        this.exchange.options.defaultType = 'spot';
      }

      const order = await this.exchange.fetchOrder(orderId, symbol);
      return {
        id: order.id,
        status: order.status,
        filled: order.filled,
        remaining: order.remaining,
        average: order.average,
        cost: order.cost,
        fee: order.fee
      };
    } catch (error) {
      console.error('Error checking order status:', error);
      throw error;
    }
  }

  async cancelOrder(symbol, orderId, orderType = 'spot') {
    try {
      if (orderType === 'futures') {
        this.exchange.options.defaultType = 'swap';
      } else {
        this.exchange.options.defaultType = 'spot';
      }

      const result = await this.exchange.cancelOrder(orderId, symbol);
      console.log('Order cancelled:', result);
      return result;
    } catch (error) {
      console.error('Error cancelling order:', error);
      throw error;
    }
  }

  async getBalance(userId, currency = 'USDT') {
    try {
      await this.initializeExchange(userId);
      const balance = await this.exchange.fetchBalance();
      return balance[currency];
    } catch (error) {
      console.error('Error fetching balance:', error);
      throw error;
    }
  }

  async getFuturesBalance(userId, currency = 'USDT') {
    try {
      await this.initializeExchange(userId);
      this.exchange.options.defaultType = 'swap';
      const balance = await this.exchange.fetchBalance();
      return balance[currency];
    } catch (error) {
      console.error('Error fetching futures balance:', error);
      throw error;
    }
  }
}

module.exports = MexcTradeSetup; 