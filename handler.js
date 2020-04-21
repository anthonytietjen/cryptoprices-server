const axios = require('axios')

module.exports.hello = async event => {
  switch (event.resource) {
    case "/v1/prices": return await getPrices(event)
    case "/v1/savePricePoints": return await savePricePoints(event)
  }
};

const getPrices = async (event) => {
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

  const pricePoints = {
    btcSaved: 1,
    btcBuffer: 2,
    ltcSaved: 3,
    ltcBuffer: 4,
    ethSaved: 5,
    ethBuffer: 6,
  }

  const body = {
    cryptos,
    pricePoints
  }

  return {
    statusCode: 200,
    headers: {
      "Access-control-allow-origin": "*"
    },
    body: JSON.stringify(body),
  }
}

const savePricePoints = async (event) => {
  return {
    statusCode: 200,
    headers: {
      "Access-control-allow-origin": "*"
    },
    body: JSON.stringify({ "success": true }),
  }
}