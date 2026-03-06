const axios = require("axios");

async function callFulfillment(clientId, orderId) {
  try {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      {
        userId: clientId,
        title: orderId
      }
    );

    return response.data.id;
  } catch (error) {
    throw new Error("Fulfillment API failed");
  }
}

module.exports = { callFulfillment };