const GateApi = require('gate-api');
const getApiCredentials = require('../getApiCredentials');

// Fetch spot account balances
async function fetchSpotBalances(subClientId, cryptoCurrency) {
    try {
        console.log('Fetching spot account balances...');
        const credentials = await getApiCredentials(subClientId);
        if (credentials) {
            const client = new GateApi.ApiClient();
            client.setApiKeySecret(credentials.apiKey, credentials.apiSecret);
            const spotApi = new GateApi.SpotApi(client);

            const response = await spotApi.listSpotAccounts();

            // Initialize balances
            let usdtBalance = 0;
            let cryptoBalance = 0;

            // Filter and map the response
            response.body.forEach(account => {
                if (account.currency === 'USDT') {
                    usdtBalance = parseFloat(account.available);
                }
                if (account.currency === cryptoCurrency) {
                    cryptoBalance = parseFloat(account.available);
                }
            });

            return [usdtBalance, cryptoBalance];
        } else {
            console.error('API credentials not found');
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports = fetchSpotBalances;

// fetchSpotBalances(1, "DHX");
