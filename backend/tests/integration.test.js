const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const Web3 = require('web3');
const { jwt } = require("twilio");
const User = require("../models/User");
const expect = chai.expect;

chai.use(chaiHttp);

describe('Integration Tests', () => {
    let buyer, seller, verifier;
    let event, ticket;

    before(async () => {
        // Set up test users
        buyer = await createTestUser('buyer');
        seller = await createTestUser('seller');
        verifier = await createTestUser('verifier');
    });

    it('should complete full ticket lifecycle', async () => {
        // 1. Seller creates event
        const eventRes = await chai
            .request(app)
            .post('/api/seller/create-event')
            .set('Authorization', `Bearer ${seller.token}`)
            .send({
                name: 'Integration Test Event',
                description: 'Test Description',
                date: new Date(Date.now() + 86400000),
                venue: 'Test Venue',
                totalTickets: 100,
                priceETH: 0.1
            });

        expect(eventRes).to.have.status(201);
        event = eventRes.body;

        // 2. Buyer purchases ticket
        const purchaseRes = await chai
            .request(app)
            .post('/api/buyer/buy-ticket')
            .set('Authorization', `Bearer ${buyer.token}`)
            .send({
                eventId: event._id,
                paymentMethod: 'fiat',
                currency: 'USD'
            });

        expect(purchaseRes).to.have.status(200);
        ticket = purchaseRes.body.ticket;

        // 3. Verifier scans and validates ticket
        const scanRes = await chai
            .request(app)
            .post('/api/verifier/scan-ticket')
            .set('Authorization', `Bearer ${verifier.token}`)
            .send({
                qrData: {
                    uniqueString: ticket.qrCode
                }
            });

        expect(scanRes).to.have.status(200);

        // 4. Verify OTP
        const verifyRes = await chai
            .request(app)
            .post('/api/verifier/verify-otp')
            .set('Authorization', `Bearer ${verifier.token}`)
            .send({
                qrData: {
                    uniqueString: ticket.qrCode
                },
                otp: ticket.tempOTP // In real scenario, this would come from user's phone
            });

        expect(verifyRes).to.have.status(200);
    });

    async function createTestUser(role) {
        const user = await User.create({
            email: `test@${role}.com`,
            password: 'password123',
            role: role,
            walletAddress: role !== 'verifier' ? `0x${role}123...` : undefined,
            phoneNumber: '+1234567890'
        });

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET
        );

        return { user, token };
    }
});
