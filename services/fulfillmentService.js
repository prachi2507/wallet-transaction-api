const axios = require('axios');

exports.callFulfillment = async (clientId, orderId) => {
  const res = await axios.post('https://jsonplaceholder.typicode.com/posts', {
    userId: clientId,
    title: orderId
  });

  return res.data.id;
};