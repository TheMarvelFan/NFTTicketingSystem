const Razorpay = require('razorpay');
const Web3 = require('web3');

class PaymentService {
    constructor() {
        this.razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });

        this.web3 = new Web3(process.env.ETHEREUM_NETWORK);
    }

    async createFiatPayment(amount, currency) {
        const options = {
            amount: amount * 100, // Razorpay expects amount in smallest currency unit
            currency: currency,
            receipt: `receipt_${Date.now()}`
        };

        try {
            return await this.razorpay.orders.create(options);
        } catch (error) {
            throw new Error('Payment creation failed');
        }
    }

    async verifyFiatPayment(paymentId, orderId, signature) {
        const digest = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(`${orderId}|${paymentId}`)
            .digest('hex');

        return digest === signature;
    }

    async convertToETH(amount, currency) {
        // This would typically involve calling an exchange rate API
        // For demo purposes, using a fixed rate
        const rates = {
            USD: 0.0005, // 1 USD = 0.0005 ETH
            EUR: 0.0006,
            // Add more currencies as needed
        };

        return amount * (rates[currency] || rates.USD);
    }
}

module.exports = PaymentService;
