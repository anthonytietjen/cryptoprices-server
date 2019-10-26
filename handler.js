'use strict';
const axios = require('axios')

module.exports.hello = async event => {
  const response = await axios.get('https://api.coinbase.com/v2/prices/spot?currency=USD')
  const prices = response.data
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(
      {
        prices
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
