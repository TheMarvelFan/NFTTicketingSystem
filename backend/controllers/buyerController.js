const Web3 = require('web3');
const Event = require('../models/Event');
const Ticket = require('../models/Ticket');
const PaymentService = require('../utils/paymentService');
const QRService = require('../utils/qrService');
const TicketNFT = require('../artifacts/contracts/TicketNFT.sol/TicketNFT.json');

const buyerController = {
    async getEvents(req, res) {
        try {
            const events = await Event.find({
                date: { $gte: new Date() },
                availableTickets: { $gt: 0 }
            }).populate('seller', 'email');
            res.json(events);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching events', error: error.message });
        }
    },

    async buyTicket(req, res) {
        try {
            const { eventId, paymentMethod, currency } = req.body;
            const event = await Event.findById(eventId);

            if (!event || event.availableTickets < 1) {
                return res.status(400).json({ message: 'Tickets not available' });
            }

            const paymentService = new PaymentService();
            let paymentResult;

            if (paymentMethod === 'fiat') {
                // Handle fiat payment through Razorpay
                const order = await paymentService.createFiatPayment(event.priceETH, currency);
                paymentResult = { orderId: order.id, amount: order.amount };
            } else {
                // Handle direct ETH payment
                const web3 = new Web3(process.env.ETHEREUM_NETWORK);
                const contract = new web3.eth.Contract(TicketNFT.abi, process.env.CONTRACT_ADDRESS);

                // Now you can interact with your contract
                const price = await contract.methods.events(eventId).call();
            }

            // Generate QR code for the ticket
            const qrData = await QRService.generateQR({
                eventId: event._id,
                buyerId: req.user._id,
                timestamp: Date.now()
            });

            // Create ticket in database
            const ticket = new Ticket({
                event: event._id,
                owner: req.user._id,
                qrCode: qrData.uniqueString,
                transactionHash: paymentResult.transactionHash
            });

            await ticket.save();

            // Update event availability
            event.availableTickets -= 1;
            await event.save();

            res.json({ ticket, paymentResult });
        } catch (error) {
            res.status(500).json({ message: 'Error purchasing ticket', error: error.message });
        }
    },

    async reportEvent(req, res) {
        try {
            const { eventId, reason } = req.body;
            const event = await Event.findById(eventId);

            if (!event) {
                return res.status(404).json({ message: 'Event not found' });
            }

            event.reportCount += 1;
            if (event.reportCount >= 5) {  // Threshold for flagging
                event.isFlagged = true;
            }

            await event.save();

            res.json({ message: 'Event reported successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error reporting event', error: error.message });
        }
    }
};

module.exports = buyerController;
