const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    tokenId: {
        type: Number,
        required: true,
        unique: true,
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    qrCode: {
        type: String,
        required: true,
        unique: true,
    },
    isUsed: {
        type: Boolean,
        default: false,
    },
    purchaseDate: {
        type: Date,
        default: Date.now,
    },
    transactionHash: String,
});

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;
