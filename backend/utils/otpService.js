const twilio = require('twilio');
require('dotenv').config();
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_TOKEN);

class OTPService {
    static async generateOTP() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    static async sendOTP(phoneNumber, otp) {
        try {
            await client.messages.create({
                body: `Your verification code is: ${otp}`,
                to: phoneNumber,
                from: process.env.TWILIO_PHONE_NUMBER,
            });
            return true;
        } catch (error) {
            console.error('Error sending OTP:', error);
            return false;
        }
    }
}

module.exports = OTPService;
