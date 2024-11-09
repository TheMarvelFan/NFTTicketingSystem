const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const User = require('../models/User');
const { jwt } = require("twilio");
const expect = chai.expect;

chai.use(chaiHttp);

describe('Seller Module Tests', () => {
    let sellerToken;

    before(async () => {
        // Create test seller
        const seller = await User.create({
            email: 'test@seller.com',
            password: 'password123',
            role: 'seller',
            walletAddress: '0x456...'
        });

        sellerToken = jwt.sign(
            { userId: seller._id, role: seller.role },
            process.env.JWT_SECRET
        );
    });

    describe('POST /api/seller/create-event', () => {
        it('should create a new event', async () => {
            const res = await chai
                .request(app)
                .post('/api/seller/create-event')
                .set('Authorization', `Bearer ${sellerToken}`)
                .send({
                    name: 'New Concert',
                    description: 'Amazing concert',
                    date: new Date(Date.now() + 86400000),
                    venue: 'Concert Hall',
                    totalTickets: 1000,
                    priceETH: 0.1
                });

            expect(res).to.have.status(201);
            expect(res.body).to.have.property('name');
            expect(res.body).to.have.property('totalTickets');
        });
    });
});
