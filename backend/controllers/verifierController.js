const Ticket = require('../models/Ticket');
const QRService = require('../utils/qrService');
const OTPService = require('../utils/otpService');

const verifierController = {
    async scanTicket(req, res) {
        try {
            const { qrData } = req.body;
            const ticket = await Ticket.findOne({ qrCode: qrData.uniqueString })
                .populate('owner')
                .populate('event');

            if (!ticket) {
                return res.status(404).json({ message: 'Invalid ticket' });
            }

            if (ticket.isUsed) {
                return res.status(400).json({ message: 'Ticket already used' });
            }

            // Generate and send OTP
            const otp = await OTPService.generateOTP();
            const otpSent = await OTPService.sendOTP(ticket.owner.phoneNumber, otp);

            if (!otpSent) {
                return res.status(500).json({ message: 'Error sending OTP' });
            }

            // Store OTP temporarily (you might want to use Redis for this)
            // For demo, we'll store it in the ticket document
            ticket.tempOTP = otp;
            ticket.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes
            await ticket.save();

            res.json({ message: 'OTP sent for verification' });
        } catch (error) {
            res.status(500).json({ message: 'Error scanning ticket', error: error.message });
        }
    },

    async verifyOTP(req, res) {
        try {
            const { qrData, otp } = req.body;
            const ticket = await Ticket.findOne({ qrCode: qrData.uniqueString });

            if (!ticket || ticket.isUsed) {
                return res.status(400).json({ message: 'Invalid ticket' });
            }

            if (ticket.tempOTP !== otp || Date.now() > ticket.otpExpiry) {
                return res.status(400).json({ message: 'Invalid or expired OTP' });
            }

            // Mark ticket as used
            ticket.isUsed = true;
            ticket.tempOTP = undefined;
            ticket.otpExpiry = undefined;
            await ticket.save();

            res.json({ message: 'Ticket verified successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error verifying OTP', error: error.message });
        }
    }
};

module.exports = verifierController;
