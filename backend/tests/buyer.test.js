const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const User = require('../models/User');
const Event = require('../models/Event');
const { jwt } = require("twilio");
const expect = chai.expect;

chai.use(chaiHttp);

describe('Buyer Module Tests', () => {
    let buyerToken;
    let testEvent;

    before(async () => {
        // Create test buyer
        const buyer = await User.create({
            email: 'test@buyer.com',
            password: 'password123',
            role: 'buyer',
            walletAddress: '0x123...',
            phoneNumber: '+1234567890'
        });

        // Generate token
        buyerToken = jwt.sign(
            { userId: buyer._id, role: buyer.role },
            process.env.JWT_SECRET
        );

        // Create test event
        testEvent = await Event.create({
            name: 'Test Concert',
            description: 'Test Description',
            date: new Date(Date.now() + 86400000),
            venue: 'Test Venue',
            totalTickets: 100,
            availableTickets: 100,
            priceETH: 0.1,
            seller: this.seller._id
        });
    });

    describe('GET /api/buyer/events', () => {
        it('should return all available events', async () => {
            const res = await chai
                .request(app)
                .get('/api/buyer/events')
                .set('Authorization', `Bearer ${buyerToken}`);

            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body[0]).to.have.property('name');
        });
    });

    describe('POST /api/buyer/buy-ticket', () => {
        it('should successfully purchase a ticket', async () => {
            const res = await chai
                .request(app)
                .post('/api/buyer/buy-ticket')
                .set('Authorization', `Bearer ${buyerToken}`)
                .send({
                    eventId: testEvent._id,
                    paymentMethod: 'fiat',
                    currency: 'USD'
                });

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('ticket');
            expect(res.body).to.have.property('paymentResult');
        });
    });
});
