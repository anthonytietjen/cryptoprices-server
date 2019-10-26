const axios = require('axios')

module.exports.hello = async event => {
  const [btcResponse, ltcResponse, etcReponse] = await Promise.all([
    axios.get('https://api.coinbase.com/v2/prices/BTC-USD/buy'),
    axios.get('https://api.coinbase.com/v2/prices/LTC-USD/buy'),
    axios.get('https://api.coinbase.com/v2/prices/ETH-USD/buy')
  ])

  const cryptos = [
    {
      id: 'btc',
      name: 'Bitcoin',
      price: btcResponse.data.data.amount
    },
    {
      id: 'ltc',
      name: 'Litecoin',
      price: ltcResponse.data.data.amount
    },
    {
      id: 'eth',
      name: 'Ethereum',
      price: etcReponse.data.data.amount
    }
  ]

  const body = {
    cryptos
  }

  return {
    statusCode: 200,
    headers: {
      "Access-control-allow-origin": "*"
    },
    body: JSON.stringify(body),
  }
};
