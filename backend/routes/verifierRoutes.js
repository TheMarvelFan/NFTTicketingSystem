const express = require('express');
const router = express.Router();
const verifierController = require('../controllers/verifierController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.use(authMiddleware);
router.use(roleMiddleware(['verifier']));

router.post('/scan-ticket', verifierController.scanTicket);
router.post('/verify-otp', verifierController.verifyOTP);

module.exports = router;
