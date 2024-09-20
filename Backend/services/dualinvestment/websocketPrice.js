const WebSocket = require('ws');
const crypto = require('crypto');
const logger = require('winston');

// Configure logger
logger.configure({
  level: 'info',
  format: logger.format.combine(
    logger.format.colorize(),
    logger.format.simple()
  ),
  transports: [
    new logger.transports.Console()
  ]
});

const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;
const url = 'wss://api.gateio.ws/ws/v4/';

class GateWebSocketApp {
  constructor(url, apiKey, apiSecret, interval, contract) {
    this.url = url;
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.interval = interval;
    this.contract = contract;
    this.ws = null;
    this.reconnectInterval = 5000; // 5 seconds
  }

  connect() {
    this.ws = new WebSocket(this.url);

    this.ws.on('open', () => {
      logger.info('WebSocket connected');
      this.subscribe('futures.candlesticks', [this.interval, this.contract], false);
    });

    this.ws.on('message', (message) => {
      this.onMessage(message);
    });

    this.ws.on('ping', () => {
      this.ws.pong();
    });

    this.ws.on('close', () => {
      logger.info('WebSocket disconnected');
      setTimeout(() => this.connect(), this.reconnectInterval);
    });

    this.ws.on('error', (error) => {
      logger.error('WebSocket error:', error);
      this.ws.close();
    });
  }

  getSign(message) {
    return crypto.createHmac('sha512', this.apiSecret).update(message).digest('hex');
  }

  request(channel, event = null, payload = null, authRequired = true) {
    const currentTime = Math.floor(Date.now() / 1000);
    const data = {
      time: currentTime,
      channel: channel,
      event: event,
      payload: payload,
    };

    if (authRequired) {
      const message = `channel=${channel}&event=${event}&time=${currentTime}`;
      data.auth = {
        method: 'api_key',
        KEY: this.apiKey,
        SIGN: this.getSign(message),
      };
    }

    const jsonData = JSON.stringify(data);
    logger.info('Request:', jsonData);
    this.ws.send(jsonData);
  }

  subscribe(channel, payload = null, authRequired = true) {
    this.request(channel, 'subscribe', payload, authRequired);
  }

  unsubscribe(channel, payload = null, authRequired = true) {
    this.request(channel, 'unsubscribe', payload, authRequired);
  }

  onMessage(message) {
    logger.info('Message received from server:', message);
    const data = JSON.parse(message);
    if (data.event === 'update' && data.channel === 'futures.candlesticks') {
      data.result.forEach(candlestick => {
        logger.info(`Candlestick: ${candlestick.n} - Open: ${candlestick.o}, Close: ${candlestick.c}, High: ${candlestick.h}, Low: ${candlestick.l}, Volume: ${candlestick.v}, Time: ${candlestick.t}`);
      });
    }
  }
}

// Example usage
const interval = '10s'; // Change this to the desired interval
const contract = 'BTC_USD'; // Change this to the desired futures contract

const app = new GateWebSocketApp(url, apiKey, apiSecret, interval, contract);
// app.connect();