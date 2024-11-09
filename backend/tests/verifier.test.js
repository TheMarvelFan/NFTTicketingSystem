const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const User = require('../models/User');
const Ticket = require('../models/Ticket');
const QRService = require('../utils/qrService');
const { jwt } = require("twilio");
const expect = chai.expect;

chai.use(chaiHttp);

describe('Verifier Module Tests', () => {
    let verifierToken;
    let testTicket;
    let testQRData;

    before(async () => {
        // Create test verifier
        const verifier = await User.create({
            email: 'test@verifier.com',
            password: 'password123',
            role: 'verifier'
        });

        verifierToken = jwt.sign(
            { userId: verifier._id, role: verifier.role },
            process.env.JWT_SECRET
        );

        // Generate test QR data
        testQRData = await QRService.generateQR({
            eventId: 'testEventId',
            buyerId: 'testBuyerId',
            timestamp: Date.now()
        });

        // Create test ticket
        testTicket = await Ticket.create({
            event: 'testEventId',
            owner: 'testBuyerId',
            qrCode: testQRData.uniqueString,
            isUsed: false
        });
    });

    describe('POST /api/verifier/scan-ticket', () => {
        it('should successfully scan a valid ticket and send OTP', async () => {
            const res = await chai
                .request(app)
                .post('/api/verifier/scan-ticket')
                .set('Authorization', `Bearer ${verifierToken}`)
                .send({
                    qrData: {
                        uniqueString: testQRData.uniqueString
                    }
                });

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message', 'OTP sent for verification');
        });

        it('should reject an already used ticket', async () => {
            // First mark the ticket as used
            testTicket.isUsed = true;
            await testTicket.save();

            const res = await chai
                .request(app)
                .post('/api/verifier/scan-ticket')
                .set('Authorization', `Bearer ${verifierToken}`)
                .send({
                    qrData: {
                        uniqueString: testQRData.uniqueString
                    }
                });

            expect(res).to.have.status(400);
            expect(res.body).to.have.property('message', 'Ticket already used');
        });
    });

    describe('POST /api/verifier/verify-otp', () => {
        it('should verify valid OTP and mark ticket as used', async () => {
            // Reset ticket status and set test OTP
            testTicket.isUsed = false;
            testTicket.tempOTP = '123456';
            testTicket.otpExpiry = Date.now() + 300000; // 5 minutes from now
            await testTicket.save();

            const res = await chai
                .request(app)
                .post('/api/verifier/verify-otp')
                .set('Authorization', `Bearer ${verifierToken}`)
                .send({
                    qrData: {
                        uniqueString: testQRData.uniqueString
                    },
                    otp: '123456'
                });

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message', 'Ticket verified successfully');

            // Verify ticket is marked as used
            const updatedTicket = await Ticket.findById(testTicket._id);
            expect(updatedTicket.isUsed).to.be.true;
        });

        it('should reject invalid OTP', async () => {
            const res = await chai
                .request(app)
                .post('/api/verifier/verify-otp')
                .set('Authorization', `Bearer ${verifierToken}`)
                .send({
                    qrData: {
                        uniqueString: testQRData.uniqueString
                    },
                    otp: '999999'
                });

            expect(res).to.have.status(400);
            expect(res.body).to.have.property('message', 'Invalid or expired OTP');
        });
    });
});
