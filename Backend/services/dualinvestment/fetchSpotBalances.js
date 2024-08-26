const GateApi = require('gate-api');
const getApiCredentials = require('../getApiCredentials');

// Fetch spot account balances
async function fetchSpotBalances(subClientId) {
    try {
        console.log('Fetching spot account balances...');
        const credentials = await getApiCredentials(subClientId);
        if (credentials) {
            const client = new GateApi.ApiClient();
            client.setApiKeySecret(credentials.apiKey, credentials.apiSecret);
            const spotApi = new GateApi.SpotApi(client);

            const response = await spotApi.listSpotAccounts();
            console.log('Fetched spot account balances', response.body);
            return response.body;
        } else {
            console.error('API credentials not found');
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports = fetchSpotBalances;

fetchSpotBalances(1);