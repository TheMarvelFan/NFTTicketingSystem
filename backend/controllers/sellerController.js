const Event = require('../models/Event');
const Web3 = require('web3');

const sellerController = {
    async createEvent(req, res) {
        try {
            const {
                name,
                description,
                date,
                venue,
                totalTickets,
                priceETH
            } = req.body;

            const event = new Event({
                name,
                description,
                date,
                venue,
                totalTickets,
                availableTickets: totalTickets,
                priceETH,
                seller: req.user._id
            });

            await event.save();
            res.status(201).json(event);
        } catch (error) {
            res.status(500).json({ message: 'Error creating event', error: error.message });
        }
    },

    async getSellerEvents(req, res) {
        try {
            const events = await Event.find({ seller: req.user._id });
            res.json(events);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching events', error: error.message });
        }
    },

    async updateEvent(req, res) {
        try {
            const { eventId } = req.params;
            const event = await Event.findOne({ _id: eventId, seller: req.user._id });

            if (!event) {
                return res.status(404).json({ message: 'Event not found' });
            }

            Object.assign(event, req.body);
            await event.save();

            res.json(event);
        } catch (error) {
            res.status(500).json({ message: 'Error updating event', error: error.message });
        }
    }
};

module.exports = sellerController;
