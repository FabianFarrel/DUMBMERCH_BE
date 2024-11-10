const { MidtransClient } = require("midtrans-node-client");

const midtrans = new MidtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MT_SERVER_KEY,
  clientKey: process.env.MT_CLIENT_KEY,
});

midtrans.getTransactionStatus = async (orderId: any) => {
  try {
    const statusResponse = await midtrans.transaction.status(orderId);
    return statusResponse;
  } catch (error) {
    console.error("Error fetching transaction status from Midtrans:", error);
    throw new Error("Failed to fetch transaction status");
  }
};

export default midtrans;
