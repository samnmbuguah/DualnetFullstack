const GateApi = require('gate-api');
const client = new GateApi.ApiClient();
const getApiCredentials = require('./getApiCredentials');

async function fetchPosition(settle, contract, subClientId) {
    const credentials = await getApiCredentials(subClientId);
    if (!credentials) {
        throw new Error('Could not fetch API credentials. Aborting trade.');
    }
    
    client.setApiKeySecret(credentials.apiKey, credentials.apiSecret);
    const api = new GateApi.FuturesApi(client);
    return api.getPosition(settle, contract)
        .then(response => {
            // console.log('Futures position fetched. Size', response.body);
            return response.body;
        })
        .catch(error => console.error(error.response));
}

module.exports = fetchPosition;

// // Call the function inside an async function
// (async () => {
//     try {
//         const position = await fetchPosition('usdt', 'ETH_USDT', 1);
//         console.log(position);
//     } catch (error) {
//         console.error('Error fetching position:', error);
//     }
// })();